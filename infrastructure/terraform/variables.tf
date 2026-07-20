# variables.tf — every input the configuration accepts. Values come from terraform.tfvars
# (see terraform.tfvars.example) or the CLI. Secrets are marked `sensitive = true` so Terraform
# won't print them in plan/apply output.

variable "project" {
  description = "Name prefix for all resources. Keep it short + DNS-safe."
  type        = string
  default     = "tubeshadow"
}

variable "aws_region" {
  description = "AWS region. ca-central-1 = Canada (Central), close to a Toronto user."
  type        = string
  default     = "ca-central-1"
}

# --- Networking ----------------------------------------------------------------------------
variable "vpc_cidr" {
  description = "The private IP range for the whole VPC. /16 = 65k addresses, plenty."
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "Two public subnets (one per AZ) for the ALB + the Fargate tasks."
  type        = list(string)
  default     = ["10.0.0.0/24", "10.0.1.0/24"]
}

variable "private_subnet_cidrs" {
  description = "Two private subnets (one per AZ) for RDS. No route to the internet."
  type        = list(string)
  default     = ["10.0.10.0/24", "10.0.11.0/24"]
}

# --- Database ------------------------------------------------------------------------------
variable "db_name" {
  description = "The initial database name created inside the RDS instance."
  type        = string
  default     = "tubeshadow"
}

variable "db_username" {
  description = "RDS master username."
  type        = string
  default     = "tubeshadow_admin"
}

variable "db_instance_class" {
  description = "RDS size. db.t4g.micro = ARM, ~2 vCPU burst / 1 GB, the cheapest sensible option."
  type        = string
  default     = "db.t4g.micro"
}

variable "db_allocated_storage" {
  description = "RDS disk in GB (gp3)."
  type        = number
  default     = 20
}

# --- Container / ECS -----------------------------------------------------------------------
variable "container_cpu" {
  description = "Fargate task CPU units. 512 = 0.5 vCPU."
  type        = number
  default     = 512
}

variable "container_memory" {
  description = "Fargate task memory in MB (shared by the backend + pot-provider sidecar). 512 CPU -> 1024-4096 MB."
  type        = number
  default     = 2048
}

variable "container_port" {
  description = "Port the Spring Boot app listens on inside the container."
  type        = number
  default     = 8080
}

variable "desired_count" {
  description = "How many copies of the task to run. 1 for cost; 2+ for real HA."
  type        = number
  default     = 1
}

variable "image_tag" {
  description = "ECR image tag the task definition points at. CI/CD pushes :latest (and a SHA tag)."
  type        = string
  default     = "latest"
}

# --- App config (non-secret) ---------------------------------------------------------------
variable "api_domain" {
  description = "Public hostname for the backend API. DNS for this lives in Cloudflare."
  type        = string
  default     = "api.mimi.daeseon.ai"
}

variable "enable_https" {
  description = <<-EOT
    Two-phase TLS. ACM can't issue the cert until its DNS-validation record exists in Cloudflare,
    and AWS refuses to attach an un-issued cert to a listener. So:
      false (phase 1): HTTP :80 forwards straight to the app (test over http://<alb-dns>). No HTTPS.
      true  (phase 2): after you add the Cloudflare records and the cert ISSUES, flip this and
                       re-apply → creates the HTTPS :443 listener and makes :80 redirect to it.
  EOT
  type        = bool
  default     = false
}

variable "cors_allowed_origins" {
  description = "Comma-separated origins the backend accepts (the web app + Vercel previews)."
  type        = string
  default     = "https://mimi.daeseon.ai,https://*.vercel.app"
}

variable "ai_provider" {
  description = "Which LLM the analysis pipeline uses. 'gemini' (free tier) or 'claude'."
  type        = string
  default     = "gemini"
}

# --- CI/CD (GitHub OIDC) -------------------------------------------------------------------
variable "github_repo" {
  description = "owner/name of the repo allowed to deploy via OIDC (no static AWS keys)."
  type        = string
  default     = "Daeseon-AI-Factory/shadow-ai"
}

variable "github_branch" {
  description = "Only this branch may assume the deploy role."
  type        = string
  default     = "main"
}

# --- Secrets (NEVER commit real values; put them in terraform.tfvars, which is gitignored) --
variable "gemini_api_key" {
  description = "Google Gemini API key (the default, free AI provider). Empty = AI analysis is off (app still runs); add it later and re-apply."
  type        = string
  sensitive   = true
  default     = ""
}

variable "groq_api_key" {
  description = "Groq API key (free tier) — hosts Whisper for the interview mic's speech-to-text. Empty = transcription off; add it later and re-apply."
  type        = string
  sensitive   = true
  default     = ""
}

variable "openai_api_key" {
  description = "OpenAI API key. Optional fallback in the AI provider order (gemini -> openai -> claude)."
  type        = string
  sensitive   = true
  default     = ""
}

variable "anthropic_api_key" {
  description = "Anthropic Claude API key. Optional — only needed if ai_provider = 'claude'."
  type        = string
  sensitive   = true
  default     = ""
}

