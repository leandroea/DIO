# Desafio: Personalizar Dashboard e Modificar Idioma no Google Cloud Platform

Este guia apresenta um passo a passo para **personalizar o dashboard** e **alterar o idioma** no Google Cloud Platform (GCP), conforme o desafio da formação GCP Specialist.

---

## Pré-requisitos

- Conta Google com acesso ao [Google Cloud Console](https://console.cloud.google.com/)
- Projeto GCP criado (opcional para alterar idioma; necessário para dashboards de monitoramento)

---

## Parte 1: Modificar o idioma do Console

O idioma do Google Cloud Console é definido nas **Preferências do usuário** e vale para toda a interface.

### Passo 1: Abrir o Console do GCP

1. Acesse [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Faça login com sua conta Google, se necessário
3. Selecione o projeto desejado no seletor de projetos (topo da página)

### Passo 2: Abrir as Preferências

1. No **canto superior direito**, clique no ícone de **menu** (três pontos verticais **⋮**), à esquerda da sua foto de perfil
2. No menu que abrir, clique em **Preferências** (ou **Preferences**)

### Passo 3: Alterar idioma e região

1. No painel lateral esquerdo, clique em **Idioma e região** (ou **Language & Region**)
2. No campo **Idioma**, escolha o idioma desejado no menu suspenso (ex.: Português, English, Español)
3. (Opcional) Ajuste:
   - **Formato de data**
   - **Formato de hora**
   - **Formato de números**
4. Clique no botão azul **Salvar** (ou **Save**)

### Passo 4: Confirmar a alteração

- A página do Console será recarregada no idioma escolhido
- A preferência fica associada à sua conta Google e vale em outros serviços Google Cloud

---

## Parte 2: Personalizar o Dashboard

No GCP existem duas frentes principais de personalização de “dashboard”:

1. **Página inicial do Console** – cards e atalhos
2. **Dashboards do Cloud Monitoring** – métricas, gráficos e alertas

### A) Personalizar a página inicial do Console

#### Passo 1: Acessar a página inicial

1. No menu de navegação (☰), clique em **Página inicial** ou acesse a URL do seu projeto
2. Na página inicial você verá cards como “Começar”, “Atividade recente”, “Recursos” etc.

#### Passo 2: Reorganizar e interagir com os cards

1. **Mover cards**: arraste e solte os blocos para mudar a ordem
2. **Expandir/Recolher**: use o ícone de seta no canto do card para expandir ou recolher
3. **Fechar cards**: em alguns cards há opção de fechar (X) para deixar a tela mais enxuta
4. Os atalhos e a lista de recursos recentes ajudam a ter uma “home” mais personalizada para o seu uso

---

### B) Criar e personalizar dashboards no Cloud Monitoring

Os dashboards do **Cloud Monitoring** são onde você monta telas com gráficos, tabelas e métricas dos seus recursos.

#### Passo 1: Abrir o Cloud Monitoring

1. No menu ☰, vá em **Observabilidade** (ou **Operations**) → **Monitoring** (Monitoramento)
2. Ou acesse: [https://console.cloud.google.com/monitoring](https://console.cloud.google.com/monitoring)
3. Certifique-se de que o projeto correto está selecionado

#### Passo 2: Criar um novo dashboard

1. No menu lateral, clique em **Dashboards** (ou **Painéis**)
2. Clique em **Criar painel** (ou **Create Dashboard**)
3. Dê um nome ao painel (ex.: “Meu Dashboard de Produção”) e clique em **Criar painel**

#### Passo 3: Adicionar widgets ao dashboard

1. Clique em **Adicionar widget** (ou **Add widget**)
2. Escolha o tipo:
   - **Gráfico de linhas** – séries temporais (CPU, rede, etc.)
   - **Gráfico de barras** – comparações
   - **Medidor (Gauge)** – valor atual (ex.: uso de disco)
   - **Scorecard** – um número principal (ex.: total de requisições)
   - **Tabela** – dados em colunas
   - **Logs** – entradas de log
   - **Texto** – títulos ou anotações
3. Configure a **métrica** (ex.: `compute.googleapis.com/instance/cpu/utilization`)
4. Ajuste filtros, agrupamentos e período
5. Clique em **Aplicar** para salvar o widget no painel

#### Passo 4: Organizar o layout

1. **Redimensionar**: arraste as bordas dos widgets para mudar o tamanho
2. **Reposicionar**: arraste o widget para outra posição no grid
3. **Editar**: clique no lápis (editar) no canto do widget para alterar métrica ou opções
4. **Remover**: use a opção de excluir no menu do widget

#### Passo 5: Salvar o dashboard

1. Clique em **Salvar** no topo da página
2. O dashboard ficará listado em **Dashboards** e poderá ser reaberto a qualquer momento

---

### C) Dashboards no contexto dos serviços (in-context)

Vários serviços do GCP têm **dashboards customizáveis** direto na página do serviço (a partir de 2024), por exemplo:

- **GKE** (Kubernetes Engine)
- **Compute Engine**
- **Cloud Run**
- **Cloud Functions**
- **Cloud Storage**
- **Dataproc**
- **Dataflow**

#### Como usar

1. Abra o serviço desejado (ex.: Compute Engine → Instâncias de VM)
2. Procure por uma seção de **Métricas**, **Monitoramento** ou **Dashboard** na própria página
3. Use as opções para **adicionar/remover gráficos**, **alterar métricas** e **criar alertas** sem sair do contexto do serviço

---

## Resumo rápido

| Objetivo                    | Onde fazer                                      | Ação principal                                      |
|----------------------------|--------------------------------------------------|-----------------------------------------------------|
| **Mudar idioma**           | Menu ⋮ → Preferências → Idioma e região         | Escolher idioma e formatos → Salvar                 |
| **Reorganizar a home**     | Página inicial do Console                       | Arrastar e expandir/recolher/fechar cards           |
| **Dashboard de métricas**  | Observabilidade → Monitoring → Dashboards       | Criar painel → Adicionar widgets → Salvar           |
| **Dashboard no serviço**   | Página do serviço (ex.: Compute, GKE, Cloud Run) | Usar a área de métricas/dashboard do próprio serviço |

---

## Referências

- [Google Cloud Console – Preferências (idioma e região)](https://console.cloud.google.com/)
- [Documentação: Criar e gerenciar dashboards (Cloud Monitoring)](https://cloud.google.com/monitoring/charts/dashboards)
- [Documentação: Gerenciar widgets](https://cloud.google.com/monitoring/charts/manage-widgets)
- [Blog: Dashboards customizáveis no contexto dos serviços](https://cloud.google.com/blog/products/management-tools/introducing-customizable-observability-dashboards)

---

**Formação:** Google Cloud Platform – GCP Specialist  
**Desafio:** Personalizar Dashboard e Modificar Idioma
