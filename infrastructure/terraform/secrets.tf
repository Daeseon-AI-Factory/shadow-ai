# secrets.tf — Secrets Manager entries the running app reads at startup.
#
# WHY Secrets Manager (not plain env vars in the task definition): the task definition is visible
# to anyone with read access to ECS, and it ends up in TF state / git history. Secrets Manager
# keeps the VALUE out of those; the task definition only references an ARN, and ECS injects the
# real value into the container at launch (see ecs.tf `secrets` block).
#
# Each secret here is two resources: the secret (a named container) + a version (the actual value).

# The JWT signing key. Generated, never seen by a human. 64 chars is plenty for HS256.
resource "random_password" "jwt" {
  length  = 64
  special = false # keep it alphanumeric so it's safe in any header/env context
}

locals {
  # The JDBC URL the app expects in DATABASE_URL, built from the RDS instance's real hostname.
  database_url = "jdbc:postgresql://${aws_db_instance.main.address}:${aws_db_instance.main.port}/${var.db_name}"
}

# --- Required secrets ----------------------------------------------------------------------
resource "aws_secretsmanager_secret" "database_url" {
  name = "${var.project}/database-url"
}
resource "aws_secretsmanager_secret_version" "database_url" {
  secret_id     = aws_secretsmanager_secret.database_url.id
  secret_string = local.database_url
}

resource "aws_secretsmanager_secret" "database_password" {
  name = "${var.project}/database-password"
}
resource "aws_secretsmanager_secret_version" "database_password" {
  secret_id     = aws_secretsmanager_secret.database_password.id
  secret_string = random_password.db.result
}

resource "aws_secretsmanager_secret" "jwt_secret" {
  name = "${var.project}/jwt-secret"
}
resource "aws_secretsmanager_secret_version" "jwt_secret" {
  secret_id     = aws_secretsmanager_secret.jwt_secret.id
  secret_string = random_password.jwt.result
}

# --- Optional secrets (only created when you actually provide a value) ----------------------
# `count` is the Terraform idiom for "make this resource 0 or 1 times". The task definition
# (ecs.tf) likewise only wires these into the container when they exist. The AI keys are all
# optional: with none set, AI analysis just returns 503 and the rest of the app runs fine.
resource "aws_secretsmanager_secret" "gemini_api_key" {
  count = var.gemini_api_key != "" ? 1 : 0
  name  = "${var.project}/gemini-api-key"
}
resource "aws_secretsmanager_secret_version" "gemini_api_key" {
  count         = var.gemini_api_key != "" ? 1 : 0
  secret_id     = aws_secretsmanager_secret.gemini_api_key[0].id
  secret_string = var.gemini_api_key
}

resource "aws_secretsmanager_secret" "groq_api_key" {
  count = var.groq_api_key != "" ? 1 : 0
  name  = "${var.project}/groq-api-key"
}
resource "aws_secretsmanager_secret_version" "groq_api_key" {
  count         = var.groq_api_key != "" ? 1 : 0
  secret_id     = aws_secretsmanager_secret.groq_api_key[0].id
  secret_string = var.groq_api_key
}

resource "aws_secretsmanager_secret" "openai_api_key" {
  count = var.openai_api_key != "" ? 1 : 0
  name  = "${var.project}/openai-api-key"
}
resource "aws_secretsmanager_secret_version" "openai_api_key" {
  count         = var.openai_api_key != "" ? 1 : 0
  secret_id     = aws_secretsmanager_secret.openai_api_key[0].id
  secret_string = var.openai_api_key
}

# `count` is the Terraform idiom for "make this resource 0 or 1 times". The task definition
# (ecs.tf) likewise only wires these into the container when they exist.
resource "aws_secretsmanager_secret" "anthropic_api_key" {
  count = var.anthropic_api_key != "" ? 1 : 0
  name  = "${var.project}/anthropic-api-key"
}
resource "aws_secretsmanager_secret_version" "anthropic_api_key" {
  count         = var.anthropic_api_key != "" ? 1 : 0
  secret_id     = aws_secretsmanager_secret.anthropic_api_key[0].id
  secret_string = var.anthropic_api_key
}
