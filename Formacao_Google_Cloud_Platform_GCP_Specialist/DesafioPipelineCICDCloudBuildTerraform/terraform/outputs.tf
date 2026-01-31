output "bucket_name" {
  description = "Nome do bucket criado"
  value       = google_storage_bucket.iac_bucket.name
}

output "bucket_self_link" {
  description = "Self link do bucket"
  value       = google_storage_bucket.iac_bucket.self_link
}

output "region" {
  description = "Região dos recursos"
  value       = var.region
}
