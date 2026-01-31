# Desafio: Cloud Shell e Git no Google Cloud Platform

Guia passo a passo para utilizar o **Google Cloud Shell** integrado ao **Git** (Cloud Source Repositories ou repositórios externos) no Google Cloud Platform (GCP).

---

## Pré-requisitos

- Conta no [Google Cloud Platform](https://cloud.google.com/)
- Projeto GCP criado (ou use o projeto padrão)
- Navegador web atualizado

---

## Parte 1: Acessar o Cloud Shell

### Passo 1.1 — Abrir o Console do GCP

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Faça login com sua conta Google
3. Selecione ou crie um projeto no seletor de projetos (canto superior esquerdo)

### Passo 1.2 — Iniciar o Cloud Shell

1. No canto superior direito do Console, clique no ícone **>_** (terminal)
2. Ou use o atalho: **Ctrl + `** (backtick)
3. Aguarde o provisionamento do ambiente (pode levar alguns segundos na primeira vez)
4. O Cloud Shell abre na parte inferior da tela com um terminal Linux (Debian)

### Passo 1.3 — Verificar o ambiente

No terminal do Cloud Shell, execute:

```bash
# Verificar versão do gcloud
gcloud --version

# Verificar projeto ativo
gcloud config get-value project

# Verificar se o Git está instalado
git --version
```

---

## Parte 2: Configurar autenticação Git no Cloud Shell

### Passo 2.1 — Configurar identidade Git (obrigatório para commits)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

Use o mesmo e-mail associado à sua conta Google Cloud.

### Passo 2.2 — Autenticação com Cloud Source Repositories (se usar repositórios do GCP)

```bash
# Configurar credenciais do Git para o projeto
gcloud auth list
gcloud config set project SEU_PROJECT_ID
```

Ao fazer o primeiro `git clone` ou `git push` para um repositório em **Source Repositories**, o gcloud pedirá autorização; use sua conta Google.

---

## Parte 3: Trabalhar com repositórios Git

### Opção A — Cloud Source Repositories (repositório no GCP)

#### Passo 3.A.1 — Criar repositório no Console

1. No menu do Console: **Source Repositories** (ou busque por "Source Repositories")
2. Clique em **+ Conectar repositório**
3. Escolha **Criar novo repositório**
4. Nome: ex. `meu-desafio-cloud-shell`
5. Anote a URL do repositório (ex.: `https://source.developers.google.com/p/PROJECT_ID/r/meu-desafio-cloud-shell`)

#### Passo 3.A.2 — Clonar no Cloud Shell

```bash
# Substitua pela URL do seu repositório
git clone https://source.developers.google.com/p/SEU_PROJECT_ID/r/meu-desafio-cloud-shell
cd meu-desafio-cloud-shell
```

#### Passo 3.A.3 — Criar arquivos e fazer commit

```bash
# Criar um arquivo de exemplo
echo "# Meu projeto no GCP" > README.md

# Ver status
git status

# Adicionar e commitar
git add README.md
git commit -m "Adiciona README inicial"

# Enviar para o repositório remoto
git push origin main
```

Se a branch for `master`, use `git push origin master`.

---

### Opção B — GitHub / GitLab (repositório externo)

#### Passo 3.B.1 — Clonar repositório existente

```bash
# HTTPS (pede usuário/senha ou token)
git clone https://github.com/usuario/repositorio.git
cd repositorio

# Ou SSH (se tiver chave configurada no Cloud Shell)
# git clone git@github.com:usuario/repositorio.git
```

#### Passo 3.B.2 — Gerar e usar token de acesso (GitHub)

1. No GitHub: **Settings → Developer settings → Personal access tokens**
2. Crie um token com permissão `repo`
3. No Cloud Shell, ao fazer `git push`, use o token como senha quando solicitado

---

## Parte 4: Fluxo de trabalho típico no Cloud Shell

### Passo 4.1 — Navegar e criar arquivos

```bash
# Listar diretórios
ls -la

# Criar diretório
mkdir scripts
cd scripts

# Criar arquivo
nano script.sh
# ou
echo '#!/bin/bash' > script.sh
```

### Passo 4.2 — Ciclo Git completo

```bash
# 1. Ver alterações
git status
git diff

# 2. Adicionar arquivos
git add .                    # todos os arquivos
# ou
git add arquivo.txt          # arquivo específico

# 3. Commit
git commit -m "Descrição clara da alteração"

# 4. Atualizar do remoto (se trabalhar em equipe)
git pull origin main

# 5. Enviar alterações
git push origin main
```

### Passo 4.3 — Branches (opcional)

```bash
# Criar e mudar para nova branch
git checkout -b feature-nova

# Trabalhar, commitar e enviar
git add .
git commit -m "Nova funcionalidade"
git push origin feature-nova
```

---

## Parte 5: Comandos úteis do gcloud no Cloud Shell

```bash
# Listar projetos
gcloud projects list

# Definir projeto ativo
gcloud config set project PROJECT_ID

# Listar regiões
gcloud compute regions list

# Ver configuração atual
gcloud config list
```

---

## Resumo do fluxo do desafio

| # | Ação | Comando / Local |
|---|------|------------------|
| 1 | Abrir Cloud Shell | Console GCP → ícone terminal |
| 2 | Configurar Git | `git config --global user.name` e `user.email` |
| 3 | Clonar ou criar repositório | `git clone URL` ou criar no Source Repositories |
| 4 | Editar arquivos | Editor no Console ou `nano`/`vim` no terminal |
| 5 | Commit e push | `git add`, `git commit`, `git push` |

---

## Dicas importantes

- **Persistência**: Arquivos no diretório `$HOME` do Cloud Shell são mantidos entre sessões; o ambiente é efêmero, então sempre use Git para código importante.
- **Limites**: Cloud Shell tem limite de uso; para cargas pesadas, use uma VM ou outro ambiente.
- **Segurança**: Não commite credenciais ou chaves no repositório; use Secret Manager ou variáveis de ambiente.

---

## Referências

- [Documentação do Cloud Shell](https://cloud.google.com/shell/docs)
- [Cloud Source Repositories](https://cloud.google.com/source-repositories/docs)
- [gcloud CLI](https://cloud.google.com/sdk/gcloud)

---

*Guia criado para o desafio de utilização do Cloud Shell e Git no Google Cloud Platform.*
