#!/bin/bash
# Cria um cluster GKE Autopilot
# Uso: ./create-cluster-autopilot.sh PROJECT_ID REGION CLUSTER_NAME

set -e
PROJECT_ID=${1:-$GOOGLE_CLOUD_PROJECT}
REGION=${2:-southamerica-east1}
CLUSTER_NAME=${3:-gke-autopilot-demo}

if [ -z "$PROJECT_ID" ]; then
  echo "Uso: $0 PROJECT_ID [REGION] [CLUSTER_NAME]"
  echo "Ou defina GOOGLE_CLOUD_PROJECT"
  exit 1
fi

echo "Criando cluster GKE Autopilot: $CLUSTER_NAME em $REGION (projeto: $PROJECT_ID)"

gcloud container clusters create-auto "$CLUSTER_NAME" \
  --project="$PROJECT_ID" \
  --region="$REGION"

echo "Obtendo credenciais do cluster..."
gcloud container clusters get-credentials "$CLUSTER_NAME" --region="$REGION" --project="$PROJECT_ID"

echo "Cluster Autopilot $CLUSTER_NAME criado com sucesso."
