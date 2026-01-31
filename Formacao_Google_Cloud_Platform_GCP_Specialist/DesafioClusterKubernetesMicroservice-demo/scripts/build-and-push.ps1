# Build e push das imagens para Artifact Registry (GCP)
# Uso: .\build-and-push.ps1 -ProjectId SEU_PROJECT_ID -Region southamerica-east1

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectId,
    [string]$Region = "southamerica-east1",
    [string]$Repository = "microservices-demo"
)

$ErrorActionPreference = "Stop"
$ImageBase = "$Region-docker.pkg.dev/$ProjectId/$Repository"

# Criar repositório se não existir
Write-Host "Configurando Artifact Registry..."
gcloud artifacts repositories create $Repository `
    --repository-format=docker `
    --location=$Region `
    --project=$ProjectId `
    2>$null

# Docker auth
gcloud auth configure-docker "$Region-docker.pkg.dev" --quiet

# Build e push API
Write-Host "Building api..."
docker build -t "${ImageBase}/api:latest" ./services/api
docker push "${ImageBase}/api:latest"

# Build e push Users
Write-Host "Building users..."
docker build -t "${ImageBase}/users:latest" ./services/users
docker push "${ImageBase}/users:latest"

Write-Host "Imagens enviadas. Use IMAGE_BASE=$ImageBase ao aplicar os manifests (kubectl)."
