# ecs.tf — the cluster, the task definition (the "recipe" for a container), and the service
# (which keeps N copies of that recipe running and registered with the ALB).

# Where container logs go. `awslogs` driver streams stdout/stderr here; this is how you read what
# the app printed when it misbehaves.
resource "aws_cloudwatch_log_group" "backend" {
  name              = "/ecs/${var.project}"
  retention_in_days = 14
}

resource "aws_ecs_cluster" "main" {
  name = "${var.project}-cluster"
  setting {
    name  = "containerInsights"
    value = "enabled" # extra CPU/memory metrics; small cost, worth it while learning
  }
}

# Build the container's env + secrets in locals so the jsonencode below stays readable.
locals {
  container_environment = [
    { name = "SPRING_PROFILES_ACTIVE", value = "prod" },
    { name = "RECORDING_STORAGE", value = "s3" },
    { name = "RECORDING_S3_BUCKET", value = aws_s3_bucket.recordings.bucket },
    { name = "AWS_REGION", value = var.aws_region },
    { name = "DATABASE_USERNAME", value = var.db_username },
    { name = "AI_PROVIDER", value = var.ai_provider },
    # Trust X-Forwarded-For only from inside the VPC (the ALB), so the per-IP rate limiter sees
    # the real client IP and can't be spoofed by a header from the public internet.
    { name = "RATE_LIMIT_TRUSTED_PROXIES", value = var.vpc_cidr },
    { name = "CORS_ALLOWED_ORIGINS", value = var.cors_allowed_origins },
  ]

  # Secrets injected from Secrets Manager (value is fetched by the execution role at launch).
  base_secrets = [
    { name = "DATABASE_URL", valueFrom = aws_secretsmanager_secret.database_url.arn },
    { name = "DATABASE_PASSWORD", valueFrom = aws_secretsmanager_secret.database_password.arn },
    { name = "JWT_SECRET", valueFrom = aws_secretsmanager_secret.jwt_secret.arn },
  ]
  optional_secrets = concat(
    [for s in aws_secretsmanager_secret.gemini_api_key : { name = "GEMINI_API_KEY", valueFrom = s.arn }],
    [for s in aws_secretsmanager_secret.groq_api_key : { name = "GROQ_API_KEY", valueFrom = s.arn }],
    [for s in aws_secretsmanager_secret.openai_api_key : { name = "OPENAI_API_KEY", valueFrom = s.arn }],
    [for s in aws_secretsmanager_secret.anthropic_api_key : { name = "ANTHROPIC_API_KEY", valueFrom = s.arn }],
  )
  container_secrets = concat(local.base_secrets, local.optional_secrets)
}

resource "aws_ecs_task_definition" "backend" {
  family                   = var.project
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc" # each task gets its own ENI/IP — required for Fargate
  cpu                      = var.container_cpu
  memory                   = var.container_memory

  execution_role_arn = aws_iam_role.ecs_execution.arn # pulls image + reads secrets + writes logs
  task_role_arn      = aws_iam_role.task.arn          # the app's own AWS permissions (S3)

  container_definitions = jsonencode([
    {
      name      = "backend" # must match the load_balancer.container_name in the service + deploy.yml
      image     = "${aws_ecr_repository.backend.repository_url}:${var.image_tag}"
      essential = true
      portMappings = [
        { containerPort = var.container_port, protocol = "tcp" }
      ]
      environment = local.container_environment
      secrets     = local.container_secrets
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.backend.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "backend"
        }
      }
    },
    {
      # Legacy task-level POToken provider. The backend image now also starts a container-local
      # provider on 4417 because the caption path must not depend on Fargate sidecar localhost
      # behavior. Keep this non-essential sidecar as a harmless fallback until the task definition is
      # cleaned up in Terraform.
      name      = "pot-provider"
      image     = "brainicism/bgutil-ytdlp-pot-provider:1.3.1" # pinned to match the yt-dlp plugin (no :latest)
      essential = false
      portMappings = [
        { containerPort = 4416, protocol = "tcp" }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.backend.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "pot-provider"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "backend" {
  name            = "${var.project}-backend"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  # Run in PUBLIC subnets with a public IP so the task can pull from ECR + read Secrets without a
  # NAT gateway. The fargate-sg still blocks all inbound except 8080-from-ALB, so it's not exposed.
  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.fargate.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend.arn
    container_name   = "backend"
    container_port   = var.container_port
  }

  # Spring Boot takes ~30-60s to boot; don't let the ALB kill the task as "unhealthy" before then.
  health_check_grace_period_seconds = 120

  # Don't create the service until the HTTPS listener exists (the LB must be ready to register it).
  depends_on = [aws_lb_listener.http]

  # IMPORTANT — who owns deploys: Terraform creates the service ONCE. After that, the GitHub
  # Actions workflow registers new task-definition revisions and updates the service on each push.
  # If Terraform also managed `task_definition`, every `terraform apply` would fight CI and roll
  # the service back to the old image. So we tell Terraform to ignore changes to these fields:
  # CI owns the running image + scale; Terraform owns the surrounding infrastructure.
  lifecycle {
    ignore_changes = [task_definition, desired_count]
  }
}
