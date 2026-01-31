# Provider Google Cloud
provider "google" {
  project = var.project_id
  region  = var.region
}

# Bucket de Storage como exemplo de recurso provisionado via IaC
resource "google_storage_bucket" "iac_bucket" {
  name     = "${var.bucket_name_prefix}-${var.project_id}-${var.environment}"
  location = var.region
  project  = var.project_id

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type = "Delete"
    }
  }

  labels = {
    environment = var.environment
    managed-by  = "terraform"
    pipeline    = "cloud-build"
  }
}
