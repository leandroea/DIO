terraform {
  required_version = ">= 1.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  # Backend remoto para armazenar o state (opcional - descomente após criar o bucket)
  # backend "gcs" {
  #   bucket = "SEU_BUCKET_TERRAFORM_STATE"
  #   prefix = "terraform/state"
  # }
}
