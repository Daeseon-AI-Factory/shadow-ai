# iam.tf — the three identities. IAM is where most "why won't it deploy" time goes, so read slowly.
#
# Two of these are assumed by ECS, one by GitHub Actions:
#
#   1. EXECUTION role  — used by the ECS agent to START the task: pull the image, fetch secrets,
#                        write logs. (Setup-time permissions.)
#   2. TASK role       — used by your RUNNING app code: read/write the S3 recordings bucket.
#                        (Runtime permissions. The app's AWS SDK uses this automatically.)
#   3. GitHubActionsDeploy — assumed by CI via OIDC (no stored AWS keys) to push images + deploy.
#
# Splitting execution vs task role is least-privilege: the app can touch S3 but can't, say, read
# every secret; the executor can read secrets but isn't your application code.

# Collect every secret ARN the executor must be allowed to read (required + any optional ones).
locals {
  secret_arns = concat(
    [
      aws_secretsmanager_secret.database_url.arn,
      aws_secretsmanager_secret.database_password.arn,
      aws_secretsmanager_secret.jwt_secret.arn,
    ],
    aws_secretsmanager_secret.gemini_api_key[*].arn,
    aws_secretsmanager_secret.groq_api_key[*].arn,
    aws_secretsmanager_secret.openai_api_key[*].arn,
    aws_secretsmanager_secret.anthropic_api_key[*].arn,
  )
}

# Both ECS roles are assumed by the ECS tasks service principal.
data "aws_iam_policy_document" "ecs_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# --- 1. EXECUTION role ---------------------------------------------------------------------
resource "aws_iam_role" "ecs_execution" {
  name               = "${var.project}-ecs-execution"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume.json
}

# AWS-managed policy that grants the basics: pull from ECR + write to CloudWatch Logs.
resource "aws_iam_role_policy_attachment" "ecs_execution_managed" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Plus: read ONLY our specific secrets (not every secret in the account).
data "aws_iam_policy_document" "ecs_execution_secrets" {
  statement {
    sid       = "ReadAppSecrets"
    actions   = ["secretsmanager:GetSecretValue"]
    resources = local.secret_arns
  }
}
resource "aws_iam_role_policy" "ecs_execution_secrets" {
  name   = "read-app-secrets"
  role   = aws_iam_role.ecs_execution.id
  policy = data.aws_iam_policy_document.ecs_execution_secrets.json
}

# --- 2. TASK role (the running app) --------------------------------------------------------
resource "aws_iam_role" "task" {
  name               = "${var.project}-task"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume.json
}

# The app needs to put/get/delete objects in the recordings bucket, and list it.
data "aws_iam_policy_document" "task_s3" {
  statement {
    sid       = "ObjectAccess"
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = ["${aws_s3_bucket.recordings.arn}/*"]
  }
  statement {
    sid       = "ListBucket"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.recordings.arn]
  }
}
resource "aws_iam_role_policy" "task_s3" {
  name   = "recordings-s3-access"
  role   = aws_iam_role.task.id
  policy = data.aws_iam_policy_document.task_s3.json
}

# --- 3. GitHubActionsDeploy (CI via OIDC) --------------------------------------------------
# OIDC lets GitHub Actions prove "I am a workflow from THIS repo+branch" and assume a role with
# NO long-lived AWS access keys stored in GitHub. This is the modern, keyless way to deploy.
resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  # GitHub's certificate thumbprints. AWS effectively ignores these for this well-known provider,
  # but the argument is still required.
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1", "1c58a3a8518e8759bf075b76b750d4f2df264fcd"]
}

# Trust policy: only a workflow from var.github_repo on var.github_branch may assume this role.
data "aws_iam_policy_document" "github_assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"
    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repo}:ref:refs/heads/${var.github_branch}"]
    }
  }
}

# IMPORTANT: the name is exactly "GitHubActionsDeploy" because the deploy workflow hardcodes
# role/GitHubActionsDeploy. If you rename it, update .github/workflows/deploy.yml too.
resource "aws_iam_role" "github_deploy" {
  name               = "GitHubActionsDeploy"
  assume_role_policy = data.aws_iam_policy_document.github_assume.json
}

data "aws_iam_policy_document" "github_deploy" {
  # Push images to ECR.
  statement {
    sid       = "EcrAuth"
    actions   = ["ecr:GetAuthorizationToken"]
    resources = ["*"] # GetAuthorizationToken can't be scoped to a repo
  }
  statement {
    sid = "EcrPush"
    actions = [
      "ecr:BatchCheckLayerAvailability", "ecr:CompleteLayerUpload", "ecr:InitiateLayerUpload",
      "ecr:PutImage", "ecr:UploadLayerPart", "ecr:BatchGetImage", "ecr:GetDownloadUrlForLayer",
    ]
    resources = [aws_ecr_repository.backend.arn]
  }
  # Register a new task definition revision + roll the service to it.
  statement {
    sid       = "EcsDeploy"
    actions   = ["ecs:RegisterTaskDefinition", "ecs:DescribeTaskDefinition", "ecs:DescribeServices", "ecs:UpdateService"]
    resources = ["*"] # RegisterTaskDefinition doesn't support resource-level scoping
  }
  # A task definition references the execution + task roles, so the deployer must be allowed to
  # "pass" those roles to ECS. Scope it tightly to just those two ARNs.
  statement {
    sid       = "PassEcsRoles"
    actions   = ["iam:PassRole"]
    resources = [aws_iam_role.ecs_execution.arn, aws_iam_role.task.arn]
    condition {
      test     = "StringEquals"
      variable = "iam:PassedToService"
      values   = ["ecs-tasks.amazonaws.com"]
    }
  }
}
resource "aws_iam_role_policy" "github_deploy" {
  name   = "deploy-permissions"
  role   = aws_iam_role.github_deploy.id
  policy = data.aws_iam_policy_document.github_deploy.json
}
