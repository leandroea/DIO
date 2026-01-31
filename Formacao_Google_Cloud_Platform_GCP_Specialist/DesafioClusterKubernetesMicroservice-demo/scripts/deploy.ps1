# Deploy dos microsserviços no GKE
# Uso: .\deploy.ps1 -ImageBase "southamerica-east1-docker.pkg.dev/PROJECT_ID/microservices-demo"

param(
    [Parameter(Mandatory=$true)]
    [string]$ImageBase,
    [string]$Namespace = "microservices-demo"
)

$ErrorActionPreference = "Stop"
$K8sDir = Join-Path $PSScriptRoot ".." "k8s"

# Criar namespace
kubectl apply -f (Join-Path $K8sDir "namespace.yaml")

# Aplicar deployments com substituição da imagem
$apiManifest = Get-Content (Join-Path $K8sDir "api-deployment.yaml") -Raw
$apiManifest = $apiManifest -replace "image: api:latest", "image: ${ImageBase}/api:latest"
$apiManifest | kubectl apply -n $Namespace -f -

$usersManifest = Get-Content (Join-Path $K8sDir "users-deployment.yaml") -Raw
$usersManifest = $usersManifest -replace "image: users:latest", "image: ${ImageBase}/users:latest"
$usersManifest | kubectl apply -n $Namespace -f -

# Ajustar namespace nos recursos (os YAML atuais não têm namespace; aplicamos com -n)
# Os manifests aplicados acima já foram com -n $Namespace

Write-Host "Deploy concluído. Verifique: kubectl get pods -n $Namespace"
