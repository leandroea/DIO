#!/bin/bash
# Cria um cluster GKE Standard
# Uso: ./create-cluster-standard.sh PROJECT_ID REGION CLUSTER_NAME

set -e
PROJECT_ID=${1:-$GOOGLE_CLOUD_PROJECT}
REGION=${2:-southamerica-east1}
CLUSTER_NAME=${3:-gke-demo-cluster}

if [ -z "$PROJECT_ID" ]; then
  echo "Uso: $0 PROJECT_ID [REGION] [CLUSTER_NAME]"
  echo "Ou defina GOOGLE_CLOUD_PROJECT"
  exit 1
fi

echo "Criando cluster GKE Standard: $CLUSTER_NAME em $REGION (projeto: $PROJECT_ID)"

gcloud container clusters create "$CLUSTER_NAME" \
  --project="$PROJECT_ID" \
  --region="$REGION" \
  --num-nodes=2 \
  --machine-type=e2-medium \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=4 \
  --enable-autorepair \
  --enable-autoupgrade \
  --release-channel=regular

echo "Obtendo credenciais do cluster..."
gcloud container clusters get-credentials "$CLUSTER_NAME" --region="$REGION" --project="$PROJECT_ID"

echo "Cluster $CLUSTER_NAME criado com sucesso."
