# Desafio GCP – Deploy no App Engine com Autoscaling

Este repositório contém uma aplicação de exemplo para deploy no **Google App Engine**, com **customização de tipos de instância** e **configuração de autoscaling**, conforme o desafio da Formação GCP Specialist.

---

## Objetivos do desafio

- Realizar o deploy de uma aplicação no Google App Engine  
- Customizar parâmetros de **tipos de instância** (`instance_class`)  
- Configurar **autoscaling** (mínimo/máximo de instâncias, CPU, latência, etc.)

---

## Estrutura do projeto

```
DesafioDeployAppEngine/
├── main.py           # Aplicação Flask (rotas e health check)
├── requirements.txt  # Dependências Python (Flask, Gunicorn)
├── app.yaml          # Configuração do App Engine (runtime, instance_class, autoscaling)
└── README.md         # Este arquivo
```

---

## Configuração no `app.yaml`

### 1. Tipo de instância (`instance_class`)

Define a máquina (CPU e memória) de cada instância. Para **automatic scaling** as opções são:

| Classe   | Memória | CPU     | Uso típico        |
|----------|---------|--------|-------------------|
| **F1**   | 256 MB  | 600 MHz| Padrão, baixo custo |
| **F2**   | 512 MB  | 1.2 GHz| Balanceado *(usado neste projeto)* |
| **F4**   | 1 GB    | 2.4 GHz| Maior carga       |
| **F4_1G**| 1 GB    | -      | Mais memória      |

No `app.yaml` está definido:

```yaml
instance_class: F2
```

Para mudar (ex.: mais capacidade ou mais economia), altere para `F1`, `F4` ou `F4_1G` e faça um novo deploy.

### 2. Autoscaling (`automatic_scaling`)

O App Engine escala o número de instâncias com base em métricas. No `app.yaml` estão configurados:

| Parâmetro                      | Valor        | Descrição resumida |
|--------------------------------|-------------|---------------------|
| `min_instances`                | 0           | Pode escalar a zero (reduz custo sem tráfego). |
| `max_instances`                | 10          | Limite máximo de instâncias. |
| `target_cpu_utilization`      | 0.65        | Nova instância quando CPU ~65%. |
| `target_throughput_utilization`| 0.65        | Escala também por throughput. |
| `max_concurrent_requests`     | 50          | Requisições simultâneas por instância (F2 permite mais que 10). |
| `min_pending_latency`         | 30ms        | Tempo mínimo na fila antes de considerar nova instância. |
| `max_pending_latency`         | automatic   | Até ~10s na fila; após isso tende a criar nova instância. |
| `min_idle_instances`          | automatic   | App Engine gerencia instâncias ociosas. |
| `max_idle_instances`          | automatic   | Idem. |

- **min_instances = 0**: útil para ambientes de teste ou baixo tráfego; para produção com latência baixa, pode usar `min_instances: 1` ou mais.  
- **max_instances**: ajuste conforme orçamento e pico de carga.  
- **target_cpu_utilization**: valores menores (ex.: 0.5) escalam mais cedo; maiores (ex.: 0.8) reduzem custo e podem aumentar latência em picos.

---

## Pré-requisitos

1. **Conta no Google Cloud** com projeto criado.  
2. **Google Cloud SDK (gcloud)** instalado e configurado.  
3. **Python 3.12** (ou compatível) no ambiente local para testes.

### Instalação do gcloud (resumo)

- Windows: [Instalador](https://cloud.google.com/sdk/docs/install) ou `winget install Google.CloudSDK`  
- Ou use Cloud Shell no Console GCP (já vem com `gcloud`).

### Configuração inicial

```bash
# Login
gcloud auth login

# Definir projeto
gcloud config set project SEU_PROJECT_ID

# Habilitar App Engine (se ainda não estiver)
gcloud app create
```

Se o App Engine já existir no projeto, `gcloud app create` pode retornar que o app já existe; nesse caso pode seguir em frente.

---

## Processo de deploy

### 1. Clonar / acessar o projeto

```bash
cd DesafioDeployAppEngine
```

### 2. (Opcional) Testar localmente

```bash
# Criar ambiente virtual
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate   # Linux/macOS

# Instalar dependências
pip install -r requirements.txt

# Rodar na porta 8080 (padrão do App Engine)
python main.py
```

Acesse: `http://localhost:8080` e `http://localhost:8080/health`.

### 3. Deploy no App Engine

```bash
gcloud app deploy
```

- Confirme a região se solicitado.  
- Aceite as alterações de configuração quando perguntado.  
- Aguarde o fim do deploy (pode levar alguns minutos).

### 4. Abrir a aplicação

```bash
gcloud app browse
```

Ou acesse no navegador:

- `https://SEU_PROJECT_ID.REGION_ID.r.appspot.com`

Exemplos de rotas:

- `/` – mensagem e status  
- `/health` – health check  
- `/api/info` – informações do ambiente (serviço, versão, etc.)

---

## Alterando instância e autoscaling

1. Edite o arquivo **`app.yaml`**:
   - Troque `instance_class` (ex.: de `F2` para `F4`).
   - Ajuste `min_instances`, `max_instances`, `target_cpu_utilization`, etc., dentro de `automatic_scaling`.
2. Faça um novo deploy:

   ```bash
   gcloud app deploy
   ```

3. O App Engine cria uma nova **versão**; o tráfego passa a ir para ela conforme o roteamento configurado (por padrão 100% na última versão).

---

## Comandos úteis

| Comando                    | Descrição |
|---------------------------|-----------|
| `gcloud app deploy`       | Deploy da aplicação (usa `app.yaml` no diretório atual). |
| `gcloud app browse`       | Abre a URL do app no navegador. |
| `gcloud app versions list`| Lista versões do serviço default. |
| `gcloud app instances list` | Lista instâncias em execução. |
| `gcloud app logs tail -s default` | Acompanha logs em tempo real. |

---

## Custos e boas práticas

- **min_instances: 0** ajuda a não pagar por instâncias quando não há tráfego.  
- **max_instances** limita o custo em picos de acesso.  
- **F1** é o mais barato; **F2/F4** aumentam custo por instância, mas podem reduzir o número de instâncias necessárias.  
- Monitore no Console: **App Engine > Dashboard** e **App Engine > Instances** para ajustar `min_instances`, `max_instances` e `target_cpu_utilization` conforme uso real.

---

## Referências

- [App Engine – app.yaml (referência)](https://cloud.google.com/appengine/docs/standard/reference/app-yaml)  
- [Como as instâncias são gerenciadas (escalas)](https://cloud.google.com/appengine/docs/standard/how-instances-are-managed)  
- [Configuração com app.yaml (Python 3)](https://cloud.google.com/appengine/docs/standard/python3/configuring-your-app-with-app-yaml)  
- [Deploy no App Engine](https://cloud.google.com/appengine/docs/standard/testing-and-deploying-your-app)

---

## Resumo do processo (checklist)

1. [ ] Ter projeto GCP e `gcloud` configurado  
2. [ ] Ajustar `app.yaml` (opcional): `instance_class` e `automatic_scaling`  
3. [ ] Executar `gcloud app deploy`  
4. [ ] Validar em `gcloud app browse` ou na URL do projeto  
5. [ ] Monitorar instâncias e custos no Console GCP  

Com isso, o desafio de **deploy no App Engine com customização de tipos de instância e autoscaling** está atendido e documentado neste README.
