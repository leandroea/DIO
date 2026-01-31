# Desafio GCP: Deploy de Aplicação em Cloud Run

Este repositório contém uma aplicação containerizada (Flask/Python) pronta para compilação e deploy no **Google Cloud Run**, com configuração explícita de **CPU** e **memória**.

---

## Objetivo do Desafio

- Realizar a **compilação** (build) da imagem Docker da aplicação
- Fazer o **deploy** no Google Cloud Run
- Configurar **parâmetros de CPU e memória** do serviço

---

## Pré-requisitos

1. **Conta no Google Cloud Platform** com billing habilitado
2. **Google Cloud SDK (gcloud)** instalado e autenticado
3. **Docker** (opcional, para testes locais)

### Configuração inicial do gcloud

```bash
# Login na conta Google
gcloud auth login

# Definir o projeto
gcloud config set project SEU_PROJECT_ID

# Habilitar APIs necessárias
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

---

## Estrutura do Projeto

```
.
├── main.py           # Aplicação Flask (endpoints / e /health)
├── requirements.txt  # Dependências Python
├── Dockerfile        # Definição da imagem container
├── .dockerignore     # Arquivos excluídos do build
└── README.md         # Este arquivo
```

---

## Processo de Compilação e Deploy

### 1. Compilação da imagem (Build)

A compilação pode ser feita de duas formas:

#### Opção A: Build no Google Cloud Build (recomendado)

O Cloud Build compila a imagem na nuvem e a publica no **Artifact Registry** (ou Container Registry).

```bash
# Substitua REGION e PROJECT_ID pelos seus valores
# Exemplo: us-central1, meu-projeto-gcp

gcloud builds submit --tag gcr.io/SEU_PROJECT_ID/app-cloud-run .
```

Ou usando **Artifact Registry** (recomendado pelo GCP):

```bash
# Criar repositório (uma vez)
gcloud artifacts repositories create cloud-run-repo \
  --repository-format=docker \
  --location=us-central1

# Build e push da imagem
gcloud builds submit --tag us-central1-docker.pkg.dev/SEU_PROJECT_ID/cloud-run-repo/app-cloud-run .
```

#### Opção B: Build local com Docker

```bash
docker build -t app-cloud-run .
# Para testar localmente:
docker run -p 8080:8080 app-cloud-run
```

---

### 2. Deploy no Cloud Run

Deploy **com configuração de CPU e memória**:

```bash
gcloud run deploy app-cloud-run \
  --image gcr.io/SEU_PROJECT_ID/app-cloud-run \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --cpu 1 \
  --memory 512Mi
```

**Parâmetros importantes:**

| Parâmetro | Descrição | Exemplo |
|-----------|-----------|---------|
| `--cpu` | Número de vCPUs (1 ou 2, 4, 8) | `1` ou `2` |
| `--memory` | Memória por instância | `256Mi`, `512Mi`, `1Gi`, `2Gi`, `4Gi`, `8Gi` |
| `--min-instances` | Mínimo de instâncias (0 = scale to zero) | `0` |
| `--max-instances` | Máximo de instâncias | `10` |
| `--concurrency` | Requisições por instância | `80` |

#### Exemplo com mais recursos (CPU e memória maiores)

```bash
gcloud run deploy app-cloud-run \
  --image gcr.io/SEU_PROJECT_ID/app-cloud-run \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --cpu 2 \
  --memory 1Gi \
  --min-instances 0 \
  --max-instances 5
```

---

### 3. Fluxo completo em um único comando (Build + Deploy)

O Cloud Run pode fazer o build e o deploy em uma única etapa, sem precisar do `gcloud builds submit` separado:

```bash
gcloud run deploy app-cloud-run \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --cpu 1 \
  --memory 512Mi
```

Com `--source .`, o gcloud usa o **Cloud Build** para construir a imagem a partir do `Dockerfile` no diretório atual e faz o deploy automaticamente.

---

## Configuração de CPU e Memória no Cloud Run

- **CPU**: no Cloud Run (gen2) você pode escolher 1, 2, 4 ou 8 vCPUs por instância.
- **Memória**: opções típicas são `256Mi`, `512Mi`, `1Gi`, `2Gi`, `4Gi`, `8Gi`. A memória deve ser compatível com a CPU (o console GCP mostra as combinações válidas).

Para alterar após o deploy:

```bash
gcloud run services update app-cloud-run \
  --region us-central1 \
  --cpu 2 \
  --memory 1Gi
```

---

## Validação

Após o deploy, o gcloud exibe a **URL do serviço**. Teste:

```bash
# Obter a URL do serviço
gcloud run services describe app-cloud-run --region us-central1 --format 'value(status.url)'

# Testar o endpoint raiz
curl https://SUA_URL/

# Testar health check
curl https://SUA_URL/health
```

Resposta esperada em `/`:

```json
{
  "status": "ok",
  "message": "Aplicação rodando no Google Cloud Run",
  "desafio": "GCP - Deploy App Container Cloud Run"
}
```

---

## Resumo do Processo

1. **Configurar projeto GCP** e habilitar APIs (Run, Container Registry/Artifact Registry, Cloud Build).
2. **Compilar** a imagem: `gcloud builds submit --tag gcr.io/PROJECT_ID/app-cloud-run .` ou usar `--source .` no deploy.
3. **Fazer deploy** com `gcloud run deploy`, definindo `--cpu` e `--memory`.
4. **Validar** a aplicação pela URL retornada pelo Cloud Run.

---

## Referências

- [Documentação Cloud Run](https://cloud.google.com/run/docs)
- [Configurar CPU e memória](https://cloud.google.com/run/docs/configuring/cpu)
- [Deploy a container image](https://cloud.google.com/run/docs/deploying)
