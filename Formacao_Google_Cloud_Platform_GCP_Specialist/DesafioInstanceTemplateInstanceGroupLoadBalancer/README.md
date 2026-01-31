# Desafio GCP: Instance Template, Instance Group e Load Balancer

Este documento descreve o processo de criação de **Instance Template**, **Instance Group** e **Google Cloud Load Balancer** no Google Cloud Platform (GCP), ilustrando uma arquitetura típica para aplicações com alta disponibilidade e balanceamento de carga.

---

## Visão geral da arquitetura

```
                    ┌─────────────────────────────────┐
                    │   Google Cloud Load Balancer    │
                    │   (Frontend: IP público)         │
                    └───────────────┬─────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │   Instance Group (Managed)      │
                    │   (MIG - auto-scaling)          │
                    └───────────────┬─────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            ▼                       ▼                       ▼
    ┌───────────────┐       ┌───────────────┐       ┌───────────────┐
    │   VM 1        │       │   VM 2        │       │   VM N        │
    │ (Template)    │       │ (Template)    │       │ (Template)    │
    └───────────────┘       └───────────────┘       └───────────────┘
```

---

## 1. Instance Template (Modelo de instância)

O **Instance Template** é um modelo reutilizável que define a configuração das VMs (tipo de máquina, imagem de disco, rede, metadados, scripts de inicialização, etc.). Ele não cria VMs por si só; é usado pelo Instance Group para criar instâncias idênticas.

### Por que usar?

- **Consistência**: Todas as VMs do grupo seguem o mesmo padrão.
- **Reutilização**: Um único template pode ser usado por vários Instance Groups.
- **Versionamento**: Alterações exigem um novo template; o grupo pode ser atualizado gradualmente.

### Como criar (gcloud)

```bash
# Definir variáveis
export PROJECT_ID="seu-projeto-id"
export TEMPLATE_NAME="meu-instance-template"
export MACHINE_TYPE="e2-medium"
export IMAGE_FAMILY="debian-12"
export IMAGE_PROJECT="debian-cloud"
export ZONE="us-central1-a"

# Criar o Instance Template
gcloud compute instance-templates create $TEMPLATE_NAME \
  --project=$PROJECT_ID \
  --machine-type=$MACHINE_TYPE \
  --image-family=$IMAGE_FAMILY \
  --image-project=$IMAGE_PROJECT \
  --boot-disk-size=10GB \
  --boot-disk-type=pd-standard \
  --tags=http-server,https-server \
  --metadata=startup-script='#!/bin/bash
    apt-get update && apt-get install -y nginx
    systemctl enable nginx && systemctl start nginx'
```

### Opções comuns

| Parâmetro | Descrição |
|-----------|-----------|
| `--machine-type` | Tipo da VM (ex: e2-medium, n1-standard-1) |
| `--image-family` / `--image-project` | Imagem do SO (Debian, Ubuntu, etc.) |
| `--boot-disk-size` | Tamanho do disco de boot em GB |
| `--tags` | Tags de rede (ex: abrir firewall para http-server) |
| `--metadata` | Metadados ou script de inicialização |
| `--network` / `--subnet` | Rede e sub-rede (VPC) |

---

## 2. Instance Group (Grupo de instâncias)

O **Instance Group** agrupa várias VMs que serão tratadas como um conjunto. Pode ser:

- **Managed Instance Group (MIG)**: Grupo gerenciado; as VMs são criadas a partir de um **Instance Template**, com opção de auto-scaling e auto-healing. **Recomendado para Load Balancer.**
- **Unmanaged Instance Group**: Conjunto de VMs já existentes, gerenciadas manualmente.

Para Load Balancer, usamos um **MIG** criado a partir do template.

### Como criar um MIG (gcloud)

```bash
export MIG_NAME="meu-instance-group"
export TEMPLATE_NAME="meu-instance-template"
export ZONE="us-central1-a"
export BASE_NAME="web-server"

# Criar Managed Instance Group a partir do template
gcloud compute instance-groups managed create $MIG_NAME \
  --project=$PROJECT_ID \
  --base-instance-name=$BASE_NAME \
  --template=$TEMPLATE_NAME \
  --size=3 \
  --zone=$ZONE
```

### Auto-scaling (opcional)

```bash
gcloud compute instance-groups managed set-autoscaling $MIG_NAME \
  --project=$PROJECT_ID \
  --zone=$ZONE \
  --min-num-replicas=2 \
  --max-num-replicas=10 \
  --target-cpu-utilization=0.7 \
  --cool-down-period=90
```

### Health check (recomendado para LB)

O Load Balancer usa um **health check** para saber quais instâncias estão saudáveis. Crie um antes de configurar o LB:

```bash
gcloud compute health-checks create http http-basic-check \
  --project=$PROJECT_ID \
  --port=80 \
  --request-path="/" \
  --check-interval=10s \
  --timeout=5s \
  --unhealthy-threshold=3 \
  --healthy-threshold=2
```

---

## 3. Google Cloud Load Balancer

O **Load Balancer** distribui o tráfego entre as instâncias do Instance Group. No GCP existem vários tipos:

- **HTTP(S) Load Balancing**: Para tráfego HTTP/HTTPS (global).
- **TCP/UDP Load Balancing**: Para tráfego TCP ou UDP (pode ser regional ou global).
- **Internal Load Balancing**: Para tráfego interno à VPC.

Abaixo, o foco é em **HTTP(S) Load Balancing** usando o MIG como backend.

### 3.1 Backend service e Instance Group

O **backend service** associa um (ou mais) Instance Group a um health check e define como o tráfego é distribuído.

```bash
export BACKEND_SERVICE_NAME="meu-backend-service"
export HEALTH_CHECK_NAME="http-basic-check"
export MIG_NAME="meu-instance-group"
export ZONE="us-central1-a"

# Criar o Backend Service
gcloud compute backend-services create $BACKEND_SERVICE_NAME \
  --project=$PROJECT_ID \
  --protocol=HTTP \
  --port-name=http \
  --health-checks=$HEALTH_CHECK_NAME \
  --global

# Adicionar o MIG como backend do Backend Service
gcloud compute backend-services add-backend $BACKEND_SERVICE_NAME \
  --project=$PROJECT_ID \
  --instance-group=$MIG_NAME \
  --instance-group-zone=$ZONE \
  --global
```

### 3.2 URL map (roteamento)

O **URL map** define qual backend service atende cada rota (ex: `/` ou padrão).

```bash
export URL_MAP_NAME="meu-url-map"

gcloud compute url-maps create $URL_MAP_NAME \
  --project=$PROJECT_ID \
  --default-service=$BACKEND_SERVICE_NAME
```

### 3.3 Target HTTP(S) proxy e IP externo

O **target proxy** conecta o URL map ao **forwarding rule**, que usa um endereço IP externo.

```bash
export PROXY_NAME="meu-http-proxy"
export FR_NAME="meu-http-rule"

# Target HTTP proxy
gcloud compute target-http-proxies create $PROXY_NAME \
  --project=$PROJECT_ID \
  --url-map=$URL_MAP_NAME

# Reservar um IP estático global (para HTTP)
gcloud compute addresses create lb-ip \
  --project=$PROJECT_ID \
  --global

# Forwarding rule (associa IP ao proxy)
gcloud compute forwarding-rules create $FR_NAME \
  --project=$PROJECT_ID \
  --global \
  --target-http-proxy=$PROXY_NAME \
  --address=lb-ip \
  --ports=80
```

### Obter o IP do Load Balancer

```bash
gcloud compute addresses describe lb-ip --global --format="get(address)"
```

Acesse `http://<IP>` no navegador; o tráfego será distribuído entre as VMs do MIG.

---

## Resumo do fluxo

| Etapa | Recurso | Função |
|-------|---------|--------|
| 1 | **Instance Template** | Define o “molde” da VM (SO, disco, rede, startup script). |
| 2 | **Managed Instance Group** | Cria e gerencia N VMs a partir do template; opcionalmente com auto-scaling. |
| 3 | **Health Check** | Verifica se as VMs estão respondendo (ex: HTTP na porta 80). |
| 4 | **Backend Service** | Agrupa o MIG + health check e define política de balanceamento. |
| 5 | **URL Map** | Mapeia URLs (ex: padrão) para o backend service. |
| 6 | **Target HTTP Proxy** | Liga o URL map ao Load Balancer. |
| 7 | **Forwarding Rule** | Associa um IP global à porta 80 e ao proxy. |

---

## Ordem recomendada de criação (CLI)

1. Instance Template  
2. Health Check  
3. Managed Instance Group (usando o template)  
4. Backend Service (com health check)  
5. Adicionar o MIG ao Backend Service  
6. URL Map (default service = backend service)  
7. Target HTTP Proxy (usando URL map)  
8. Reservar IP global  
9. Forwarding Rule (IP + proxy, porta 80)

---

## Firewall

Para o Load Balancer alcançar as VMs na porta 80, é necessário permitir tráfego dos ranges de IP do GCP usado pelo health check e pelo forwarding:

```bash
# Permitir tráfego HTTP do Load Balancer e health checks
gcloud compute firewall-rules create allow-lb-and-health-check \
  --project=$PROJECT_ID \
  --network=default \
  --allow=tcp:80 \
  --source-ranges=35.191.0.0/16,130.211.0.0/22 \
  --target-tags=http-server
```

As VMs do template devem ter a tag `http-server` (ou a tag que você usar em `--target-tags`).

---

## Conclusão

Com **Instance Template**, **Instance Group (MIG)** e **Load Balancer** você obtém:

- **Alta disponibilidade**: várias VMs atrás de um único IP.
- **Escalabilidade**: MIG com auto-scaling conforme demanda.
- **Consistência**: todas as VMs criadas a partir do mesmo template.
- **Resiliência**: health check e remoção de instâncias não saudáveis.

Este README descreve o processo completo no GCP; os comandos podem ser adaptados ao seu projeto, região/zona e nomes de recursos.
