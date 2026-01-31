# Desafio GKE - Cluster Kubernetes e Deploy de Microsserviços (DIO)

Este repositório contém o material para o desafio de **Google Kubernetes Engine (GKE)** da formação GCP Specialist: criação de um cluster (Standard ou Autopilot) e deploy de microsserviços.

---

## Visão geral

- **Objetivo:** Criar um cluster GKE (Standard ou Autopilot) e realizar o deploy dos microsserviços.
- **Microsserviços:** API e Users (aplicações Flask em Python).
- **Artefatos:** Código dos serviços, Dockerfiles, manifests Kubernetes e scripts de provisionamento.

---

## Pré-requisitos

1. **Conta Google Cloud** e projeto ativo.
2. **gcloud CLI** instalado e configurado:
   ```bash
   gcloud init
   gcloud auth application-default login
   ```
3. **Docker** instalado (para build das imagens).
4. **kubectl** (instalado via `gcloud components install kubectl` ou separadamente).

---

## Processo passo a passo

### 1. Configurar projeto e APIs

```bash
# Definir projeto
export PROJECT_ID=SEU_PROJECT_ID
gcloud config set project $PROJECT_ID

# Habilitar APIs necessárias
gcloud services enable container.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### 2. Criar o cluster GKE

Escolha **uma** das opções: **Standard** ou **Autopilot**.

#### Opção A – Cluster GKE Standard

Maior controle sobre nós, tamanho e configuração.

```bash
# Usando o script (Linux/macOS)
chmod +x scripts/create-cluster-standard.sh
./scripts/create-cluster-standard.sh $PROJECT_ID southamerica-east1 gke-demo-cluster

# Ou manualmente
gcloud container clusters create gke-demo-cluster \
  --project=$PROJECT_ID \
  --region=southamerica-east1 \
  --num-nodes=2 \
  --machine-type=e2-medium \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=4 \
  --enable-autorepair \
  --enable-autoupgrade \
  --release-channel=regular
```

#### Opção B – Cluster GKE Autopilot

Gerenciamento de nós e escalabilidade feitos pelo Google.

```bash
# Usando o script (Linux/macOS)
chmod +x scripts/create-cluster-autopilot.sh
./scripts/create-cluster-autopilot.sh $PROJECT_ID southamerica-east1 gke-autopilot-demo

# Ou manualmente
gcloud container clusters create-auto gke-autopilot-demo \
  --project=$PROJECT_ID \
  --region=southamerica-east1
```

#### Obter credenciais do cluster

```bash
gcloud container clusters get-credentials NOME_DO_CLUSTER --region=REGION --project=$PROJECT_ID
```

Exemplo: `gcloud container clusters get-credentials gke-demo-cluster --region=southamerica-east1 --project=$PROJECT_ID`

### 3. Build e push das imagens (Artifact Registry)

Crie o repositório e envie as imagens Docker:

```bash
# Criar repositório no Artifact Registry
gcloud artifacts repositories create microservices-demo \
  --repository-format=docker \
  --location=southamerica-east1 \
  --project=$PROJECT_ID

# Autenticar Docker no Artifact Registry
gcloud auth configure-docker southamerica-east1-docker.pkg.dev --quiet
```

**Windows (PowerShell):**

```powershell
cd DesafioClusterKubernetesMicroservice-demo
.\scripts\build-and-push.ps1 -ProjectId $env:PROJECT_ID -Region southamerica-east1
```

**Linux/macOS (substitua PROJECT_ID e REGION):**

```bash
IMAGE_BASE=southamerica-east1-docker.pkg.dev/PROJECT_ID/microservices-demo

docker build -t $IMAGE_BASE/api:latest ./services/api
docker push $IMAGE_BASE/api:latest

docker build -t $IMAGE_BASE/users:latest ./services/users
docker push $IMAGE_BASE/users:latest
```

### 4. Deploy no GKE

**Criar namespace e aplicar manifests:**

```bash
# Namespace
kubectl apply -f k8s/namespace.yaml

# Ajustar o valor de IMAGE_BASE conforme seu projeto e região
export IMAGE_BASE=southamerica-east1-docker.pkg.dev/PROJECT_ID/microservices-demo
export NS=microservices-demo

# API (substituir imagem no manifest)
sed "s|image: api:latest|image: $IMAGE_BASE/api:latest|g" k8s/api-deployment.yaml | kubectl apply -n $NS -f -

# Users
sed "s|image: users:latest|image: $IMAGE_BASE/users:latest|g" k8s/users-deployment.yaml | kubectl apply -n $NS -f -
```

**Windows (PowerShell):**

```powershell
$ImageBase = "southamerica-east1-docker.pkg.dev/SEU_PROJECT_ID/microservices-demo"
.\scripts\deploy.ps1 -ImageBase $ImageBase -Namespace microservices-demo
```

### 5. Verificar o deploy

```bash
kubectl get pods -n microservices-demo
kubectl get svc -n microservices-demo
kubectl get deployments -n microservices-demo
```

Testar dentro do cluster (port-forward):

```bash
# Terminal 1 – API
kubectl port-forward -n microservices-demo svc/api 8080:80

# Em outro terminal: curl http://localhost:8080

# Terminal 2 – Users
kubectl port-forward -n microservices-demo svc/users 8081:80

# curl http://localhost:8081
```

---

## Estrutura do repositório

```
DesafioClusterKubernetesMicroservice-demo/
├── README.md                 # Este arquivo
├── services/
│   ├── api/                  # Microsserviço API
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── users/                # Microsserviço Users
│       ├── app.py
│       ├── requirements.txt
│       └── Dockerfile
├── k8s/
│   ├── namespace.yaml
│   ├── api-deployment.yaml   # Deployment + Service da API
│   ├── users-deployment.yaml # Deployment + Service de Users
│   └── ingress.yaml          # Exemplo opcional de Ingress
└── scripts/
    ├── create-cluster-standard.sh
    ├── create-cluster-autopilot.sh
    ├── build-and-push.ps1
    └── deploy.ps1
```

---

## GKE Standard vs Autopilot

| Aspecto            | Standard                    | Autopilot                         |
|--------------------|-----------------------------|-----------------------------------|
| Nós                | Você define tipo e quantidade | Gerenciados pelo Google          |
| Custo              | Pago pelos nós reservados   | Pago por uso de pod (CPU/memória) |
| Controle           | Alto (tuning de nós)        | Menor (foco em aplicação)         |
| Uso recomendado    | Cargas previsíveis, compliance | Desenvolvimento, cargas variáveis |

---

## Limpeza (opcional)

```bash
# Deletar recursos do namespace
kubectl delete namespace microservices-demo

# Deletar o cluster
gcloud container clusters delete NOME_DO_CLUSTER --region=REGION --project=$PROJECT_ID --quiet
```

---

## Referências

- [GKE – Documentação](https://cloud.google.com/kubernetes-engine/docs)
- [GKE Autopilot](https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview)
- [Artifact Registry](https://cloud.google.com/artifact-registry/docs)

---

*Desafio GKE – Formação Google Cloud Platform Specialist (DIO).*
