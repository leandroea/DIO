variable "project_id" {
  description = "ID do projeto GCP"
  type        = string
}

variable "region" {
  description = "Região padrão dos recursos GCP"
  type        = string
  default     = "southamerica-east1"
}

variable "environment" {
  description = "Ambiente (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "bucket_name_prefix" {
  description = "Prefixo para nome do bucket de storage"
  type        = string
  default     = "iac-pipeline"
}
