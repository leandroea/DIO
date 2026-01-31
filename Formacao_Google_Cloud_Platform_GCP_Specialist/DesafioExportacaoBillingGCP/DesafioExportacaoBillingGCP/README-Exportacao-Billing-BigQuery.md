# Exportação de Cloud Billing para o BigQuery – Passo a passo

Este guia descreve o **processo completo** para configurar a exportação dos dados de faturamento do Google Cloud (Cloud Billing) para um conjunto de dados no **BigQuery**, permitindo análises detalhadas, relatórios e visualizações (por exemplo, no Looker Studio).

> **Outros guias neste repositório:** para configurar **orçamentos e alertas** de faturamento no GCP, consulte o `README.md` principal (se disponível).

---

## Índice

- [Visão geral](#visão-geral)
- [O que você vai configurar](#o-que-você-vai-configurar)
- [Permissões necessárias](#permissões-necessárias)
- [Passo 1: Selecionar ou criar um projeto](#passo-1-selecionar-ou-criar-um-projeto)
- [Passo 2: Verificar o faturamento no projeto](#passo-2-verificar-o-faturamento-no-projeto)
- [Passo 3: Ativar a API BigQuery Data Transfer Service](#passo-3-ativar-a-api-bigquery-data-transfer-service)
- [Passo 4: Criar um conjunto de dados no BigQuery](#passo-4-criar-um-conjunto-de-dados-no-bigquery)
- [Passo 5: Ativar a exportação do Billing para o BigQuery](#passo-5-ativar-a-exportação-do-billing-para-o-bigquery)
- [Próximos passos e verificação](#próximos-passos-e-verificação)
- [Screenshots e referências](#screenshots-e-referências)

---

## Visão geral

A **exportação do Cloud Billing para o BigQuery** envia automaticamente, ao longo do dia, os dados de uso e custo da sua conta de faturamento para tabelas no BigQuery. Depois disso, você pode:

- Consultar custos por projeto, serviço, SKU, rótulos etc.
- Criar dashboards no Looker Studio (ou outras ferramentas).
- Cruzar dados de preços com dados de uso.
- Fazer análises de FinOps e controle de custos.

**Recomendação:** ative a exportação o mais cedo possível (idealmente ao criar a conta de faturamento), para ter histórico completo. Conjuntos de dados em **local multirregional (EU ou EUA)** podem receber dados retroativos do mês anterior; em região única, os dados começam a partir da data em que você ativou a exportação.

---

## O que você vai configurar

| Tipo de dado | Descrição | Uso típico |
|--------------|-----------|------------|
| **Dados de custo de uso padrão** | Conta, fatura, serviços, SKUs, projetos, rótulos, custo, uso, créditos, moeda | Tendências de custo em alto nível |
| **Dados detalhados de custo de uso** | Tudo do padrão + custo por recurso (VM, disco etc.) | Análise por recurso, FinOps |
| **Dados de preços** | SKUs, preços de lista, metadados geográficos, moeda | Cruzar uso com preços |
| **Metadados de CUD** (opcional) | Compromissos de uso (CUD) | Relatórios de CUD |

Todos podem usar o **mesmo projeto e o mesmo conjunto de dados** do BigQuery; cada tipo gera suas próprias tabelas.

---

## Permissões necessárias

- **Exportação de custo de uso (padrão e detalhado):**
  - **Cloud Billing:** papel **Administrador de custos** ou **Administrador da conta de faturamento** na conta de faturamento.
  - **BigQuery:** papel **Usuário do BigQuery** no projeto que contém o conjunto de dados.

- **Exportação de dados de preços e metadados de CUD:**
  - **Cloud Billing:** papel **Administrador da conta de faturamento**.
  - **BigQuery:** papel **Administrador do BigQuery** no projeto do conjunto de dados.
  - **Projeto:** permissão para atualizar o projeto (ex.: `resourcemanager.projects.update`), se aplicável.

Para criar um novo projeto, você precisa do papel **Criador de projetos** na organização ou pasta.

---

## Passo 1: Selecionar ou criar um projeto

Os dados exportados do Billing ficarão em um **conjunto de dados** do BigQuery, que pertence a um **projeto** do Google Cloud.

**Recomendação:** use um projeto dedicado a FinOps/faturamento (não misture com projetos de aplicação) para centralizar relatórios e acesso.

1. Acesse o [Console do Google Cloud](https://console.cloud.google.com/?hl=pt-br).
2. No seletor de projetos (topo da página), clique no nome do projeto atual.
3. Selecione um projeto existente **ou** clique em **Novo projeto**:
   - Nome: por exemplo `meu-projeto-billing-finops`.
   - Organização/pasta: conforme sua estrutura.
4. Anote o **ID do projeto**; você usará nas etapas seguintes.

**Link direto:** [Seletor de projetos](https://console.cloud.google.com/projectselector2/home/dashboard?hl=pt-br)

---

## Passo 2: Verificar o faturamento no projeto

O projeto que vai receber o conjunto de dados do BigQuery precisa:

- Ter **faturamento ativado**.
- Estar **vinculado à mesma conta de faturamento** da qual você quer exportar os dados.

1. No Console, vá em **Faturamento** (menu ☰ → Faturamento).
2. Se aparecer mais de uma conta, escolha a conta de faturamento correta.
3. Em **Meus projetos**, confira se o projeto que você escolheu está na lista e com faturamento ativo.
4. Se não estiver vinculado: clique no projeto → **Alterar conta de faturamento** e associe à conta desejada.

**Links úteis:**  
[Ver projetos vinculados](https://console.cloud.google.com/billing/linkedaccount?hl=pt-br) | [Confirmar faturamento no projeto](https://cloud.google.com/billing/docs/how-to/modify-project?hl=pt-br#confirm_billing_is_enabled_on_a_project)

---

## Passo 3: Ativar a API BigQuery Data Transfer Service

Necessária **somente** se você for habilitar a exportação de **dados de preços** (e opcionalmente metadados de CUD). Se for apenas custo de uso padrão e detalhado, pode pular para o Passo 4.

1. No Console, abra a página da API **BigQuery Data Transfer Service**:
   - Menu ☰ → **APIs e serviços** → **Biblioteca**, ou acesse o link abaixo.
2. Certifique-se de que o **projeto** no topo da página é o que vai conter o conjunto de dados do Billing.
3. Clique em **Ativar**.

**Link direto:** [API BigQuery Data Transfer Service](https://console.cloud.google.com/apis/api/bigquerydatatransfer.googleapis.com/metrics?hl=pt-br)

---

## Passo 4: Criar um conjunto de dados no BigQuery

O BigQuery armazena os dados em **conjuntos de dados** (datasets). Crie um dataset no mesmo projeto configurado nos passos anteriores.

1. Acesse o **BigQuery** no Console:  
   [Abrir BigQuery](https://console.cloud.google.com/bigquery?hl=pt-br)
2. No topo, no seletor **Meu projeto**, selecione o projeto de FinOps/billing.
3. No painel **Explorer** (lado esquerdo), clique no **ID do projeto** para expandir.
4. Ao lado do ID do projeto, clique nos **três pontinhos** (Ações) → **Criar conjunto de dados**.
5. Preencha:
   - **ID do conjunto de dados:** por exemplo `billing_export` (evite espaços e caracteres especiais).
   - **Local dos dados:** escolha **Multirregião EUA** ou **Multirregião UE** para ter dados retroativos do mês anterior; regiões específicas (ex.: `southamerica-east1`) são suportadas, mas **sem** retroatividade.
   - Deixe **Expiração da tabela** desmarcada (recomendado para billing).
   - Criptografia: use a chave gerenciada pelo Google (CMEK não é suportada para exportação de Billing).
6. Clique em **Criar conjunto de dados**.

**Importante:** depois de criado, o **local do dataset não pode ser alterado**. Escolha com cuidado.

**Screenshot sugerido:**  
Enquanto cria o conjunto de dados, capture a tela (Win + Shift + S ou ferramenta de captura) e salve em `assets/` como `bigquery-criar-dataset.png`. A documentação oficial com imagens da interface está em: [Configurar a exportação de dados do Cloud Billing para o BigQuery](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup?hl=pt-br).

---

## Passo 5: Ativar a exportação do Billing para o BigQuery

Nesta etapa você define **para onde** (projeto + dataset) e **quais tipos de dado** serão exportados.

1. Acesse a página **Exportação de faturamento** no Console:  
   [Exportação de faturamento](https://console.cloud.google.com/billing/export?hl=pt-br)
2. Se for solicitado, **escolha a conta do Cloud Billing** da qual os dados serão exportados.
3. Abra a guia **Exportação para BigQuery** (ou **BigQuery export**).
4. Para cada tipo de dado que deseja exportar, clique em **Editar configurações**:
   - **Exportação padrão de custo de uso** (uso e custo em alto nível).
   - **Exportação detalhada de custo de uso** (custo por recurso).
   - **Exportação de preços** (SKUs, preços de lista – requer API BigQuery Data Transfer ativada).
   - **Metadados de CUD** (se disponível na sua conta).
5. Em cada configuração:
   - **Projeto:** selecione o projeto que contém o dataset criado no Passo 4.
   - **ID do conjunto de dados:** selecione o dataset (ex.: `billing_export`).
   - Se o projeto ainda não tiver a API BigQuery ativa, o Console pode pedir para ativar; clique em **Ativar API do BigQuery** se aparecer.
   - Para exportação de preços, se pedir, ative a **API BigQuery Data Transfer Service** (Passo 3).
6. Clique em **Salvar** em cada tipo de exportação que configurou.

Após salvar, o Google adiciona automaticamente uma **conta de serviço** como proprietária do dataset, para gravar as tabelas de billing. As tabelas são criadas automaticamente; os primeiros dados podem levar **algumas horas** (uso) ou **até 48 horas** (preços).

**Link direto:** [Exportação de faturamento – BigQuery](https://console.cloud.google.com/billing/export?hl=pt-br)

---

## Próximos passos e verificação

- **Frequência dos dados:**  
  - Custo de uso: atualizações ao longo do dia; com dataset multirregional, pode levar até **cinco dias** para o primeiro preenchimento retroativo (mês atual e anterior).  
  - Preços: até **48 horas** para começar a aparecer.

- **Consultar no BigQuery:**  
  No BigQuery Studio/Console, no mesmo projeto e dataset, você verá tabelas como as de uso padrão, uso detalhado e preços. Exemplos de consultas: [Exemplo de consultas para exportação de dados do Cloud Billing](https://cloud.google.com/billing/docs/how-to/bq-examples?hl=pt-br).

- **Visualizar no Looker Studio:**  
  [Visualizar gastos ao longo do tempo com o Looker Studio](https://cloud.google.com/billing/docs/how-to/visualize-data?hl=pt-br).

- **Esquemas das tabelas:**  
  [Noções básicas sobre as tabelas de dados do Cloud Billing no BigQuery](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables?hl=pt-br).

---

## Screenshots e referências

Use screenshots disponíveis na web ou capture as telas do Console para ilustrar o processo:

### Telas sugeridas para captura (no seu Console)

| Tela | URL | Nome sugerido do arquivo |
|------|-----|---------------------------|
| Exportação de faturamento – BigQuery | [billing/export](https://console.cloud.google.com/billing/export?hl=pt-br) | `01-billing-export-bigquery.png` |
| Editar configurações (projeto + dataset) | Na mesma página, ao clicar em "Editar configurações" | `02-billing-export-editar-config.png` |
| BigQuery – dataset criado | [BigQuery](https://console.cloud.google.com/bigquery?hl=pt-br) | `03-bigquery-dataset.png` |
| BigQuery – tabelas de billing após exportação | Mesmo link, após ativar a exportação | `04-bigquery-tabelas-billing.png` |

Salve os arquivos na pasta `assets/` do projeto e referencie no README, por exemplo:  
`![Exportação Billing BigQuery](assets/01-billing-export-bigquery.png)`.

### Documentação oficial (com imagens e detalhes)

- [Configurar a exportação de dados do Cloud Billing para o BigQuery](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup?hl=pt-br) – passo a passo completo com referências visuais.
- [Exportar dados do Cloud Billing para o BigQuery – visão geral](https://cloud.google.com/billing/docs/how-to/export-data-bigquery?hl=pt-br).

### Tutorial interativo no Console

Para um passo a passo guiado dentro do próprio Console (recomendado para quem está fazendo pela primeira vez):  
[Tutorial: Exportação de dados de faturamento para o BigQuery](https://console.cloud.google.com/welcome?walkthrough_tutorial_id=billing_bigquery_export&hl=pt-br).

---

## Resumo do processo executado

| # | Etapa | Onde | Ação |
|---|--------|------|------|
| 1 | Projeto | Console → Seletor de projetos | Criar ou selecionar projeto (ex.: FinOps) |
| 2 | Faturamento | Faturamento → Meus projetos | Garantir que o projeto está vinculado à conta de billing correta |
| 3 | API | APIs e serviços → BigQuery Data Transfer Service | Ativar (se for exportar preços) |
| 4 | Dataset | BigQuery → Explorer → Criar conjunto de dados | Criar dataset (ex.: `billing_export`) em EU ou EUA |
| 5 | Exportação | Faturamento → Exportação de faturamento → BigQuery | Editar configurações: projeto + dataset para cada tipo (uso padrão, detalhado, preços) → Salvar |

Depois de concluir esses passos, a exportação fica ativa e as tabelas no BigQuery passam a ser preenchidas automaticamente com os dados do Cloud Billing.

---

*Documento criado para o desafio de exportação de Billing para BigQuery – Formação GCP Specialist.*
