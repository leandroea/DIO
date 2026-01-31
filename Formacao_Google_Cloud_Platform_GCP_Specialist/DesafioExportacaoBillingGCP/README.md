# Orçamentos e Alertas de Faturamento no Google Cloud Platform (GCP)

Este guia explica na prática como configurar **alertas** e **definição de orçamento real** para controlar o uso e os custos dentro da plataforma GCP, além de como funcionam as configurações de Faturamento (Billing).

---

## Índice

- [Visão geral do Cloud Billing](#visão-geral-do-cloud-billing)
- [Conceitos importantes](#conceitos-importantes)
- [Permissões necessárias](#permissões-necessárias)
- [Passo a passo: criar orçamento e alertas](#passo-a-passo-criar-orçamento-e-alertas)
- [Definição de orçamento real (exemplo prático)](#definição-de-orçamento-real-exemplo-prático)
- [Como funcionam os alertas](#como-funcionam-os-alertas)
- [Links oficiais e captura de telas](#links-oficiais-e-captura-de-telas)
- [Referências](#referências)

---

## Visão geral do Cloud Billing

O **Cloud Billing** do GCP permite:

- **Monitorar** todas as cobranças do Google Cloud em um só lugar.
- **Comparar** custos reais com custos planejados por meio de orçamentos.
- **Receber alertas** por e-mail (e opcionalmente por Pub/Sub) quando os gastos se aproximam ou ultrapassam limites definidos.

**Importante:** definir um orçamento **não limita** automaticamente o uso ou o gasto. Ele serve para **monitoramento e notificação**. Para controle mais rígido, é possível usar notificações programáticas (por exemplo, desligar recursos quando um limite é atingido).

---

## Conceitos importantes

| Conceito | Descrição |
|----------|-----------|
| **Orçamento** | Valor de referência (em R$ ou US$) que você define para acompanhar gastos em um período. |
| **Regras de limite (alertas)** | Porcentagens do orçamento (ex.: 50%, 90%, 100%) que disparam notificações quando o gasto real ou previsto é atingido. |
| **Escopo** | O que o orçamento cobre: conta inteira, projetos, pastas, serviços ou rótulos. |
| **Período** | Mensal, trimestral, anual ou intervalo personalizado. |

---

## Permissões necessárias

Para **criar orçamentos na conta de faturamento**:

- Papel na **conta de faturamento**: **Administrador da conta de faturamento** ou **Gerente de custos da conta de faturamento**.

Para **criar orçamentos apenas no nível do projeto** (sem acesso à conta de faturamento):

- Papel no **projeto**: **Proprietário** ou **Editor**.

---

## Passo a passo: criar orçamento e alertas

### 1. Acessar Orçamentos e alertas

**Se você tem acesso à conta de faturamento:**

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. No menu ☰ (navegação), vá em **Faturamento**.
3. No menu lateral, em **Gerenciamento de custos**, clique em **Orçamentos e alertas**.
4. Se aparecer um prompt, **escolha a conta de faturamento** em que deseja definir o orçamento.

**Link direto:** [Orçamentos e alertas](https://console.cloud.google.com/billing/budgets?hl=pt-br)

**Se você tem acesso apenas ao projeto:**

1. No Console, **selecione o projeto** que deseja monitorar.
2. Menu ☰ → **Faturamento**.
3. Se pedir, clique em **Ir para a conta de faturamento vinculada**.
4. No menu **Faturamento**, em **Gerenciamento de custos**, clique em **Orçamentos e alertas**.

---

### 2. Criar um novo orçamento

1. Na página **Orçamentos e alertas**, clique em **Criar orçamento** (botão com ícone +).
2. No campo **Nome**, informe um nome descritivo (ex.: `Orçamento mensal - Produção`).

---

### 3. Definir o escopo do orçamento

Defina **a quem** o orçamento se aplica e o **período**:

- **Intervalo de tempo:** Mensal, Trimestral, Anual ou Personalizado.
- **Escopo (filtros):**
  - **Projetos:** Todos ou projetos específicos.
  - **Serviços:** Todos ou serviços específicos (ex.: Compute Engine, BigQuery).
  - **Rótulos:** (se aplicável) Recursos com uma chave/valor de rótulo.
  - **Economias:** Se deseja incluir descontos e créditos no cálculo do gasto.

Clique em **Próximo**.

---

### 4. Definir o valor do orçamento

- **Valor especificado:** valor fixo (ex.: R$ 500 ou US$ 100) para o período.
- **Gastos do último período:** o orçamento acompanha automaticamente o gasto do período anterior (só para períodos recorrentes).

Informe o **Valor desejado** e clique em **Próximo**.

---

### 5. Definir ações e regras de limite (alertas)

Aqui você configura **quando** serão enviadas as notificações:

- **Porcentagem do orçamento:** ex.: 50%, 90%, 100%.
- **Acionador:** **Real** (gasto acumulado) ou **Previsto** (estimativa até o fim do período).

**Sugestão prática:** manter ou adicionar alertas em **50%**, **90%** e **100%** do orçamento (gasto real).

**Notificações por e-mail:**

- **Enviar alertas aos administradores e usuários de faturamento** (padrão).
- Ou **Alertas para proprietários do projeto** (se o orçamento for de um único projeto).
- Opcional: **Vincular canais de notificação do Cloud Monitoring** para enviar para e-mails específicos.

**Notificações programáticas (opcional):**

- **Conectar um tópico do Pub/Sub** ao orçamento para integrar com Slack, automações ou desligar recursos ao atingir o limite.

Clique em **Concluir** para salvar o orçamento.

**Fluxo resumido do processo:**

![Fluxo: criar orçamento e alertas no GCP](assets/fluxo-orcamento-alertas.png)

*(Coloque o arquivo `fluxo-orcamento-alertas.png` na pasta `assets/` ou capture seus próprios screenshots do Console — veja a seção [Links oficiais e captura de telas](#links-oficiais-e-captura-de-telas).)*

---

### 6. Salvar e acompanhar

Após clicar em **Concluir**, o orçamento aparece na lista **Orçamentos e alertas**. Você verá:

- Nome, período e valor.
- Barra de progresso **Valor dos gastos e do orçamento**.
- Quais alertas já foram acionados.

O primeiro e-mail de alerta pode levar algumas horas. Há também um atraso entre o uso dos recursos e a atualização dos custos no Billing.

---

## Definição de orçamento real (exemplo prático)

Exemplo de configuração para uso real:

| Configuração | Valor sugerido |
|--------------|----------------|
| **Nome** | `Orçamento mensal - Controle de custos` |
| **Período** | Mensal |
| **Escopo** | Todos os projetos da conta (ou apenas os que você quer controlar) |
| **Tipo de orçamento** | Valor especificado |
| **Valor desejado** | Ex.: R$ 200 ou US$ 50 (ajuste ao seu caso) |
| **Alertas (gasto real)** | 50%, 90%, 100% |
| **Destinatários** | Administradores e usuários de faturamento |

**Dica:** defina um valor um pouco abaixo do que você considera “teto” (ex.: 80% do valor máximo aceitável), para que os alertas cheguem antes de atingir o limite real.

---

## Como funcionam os alertas

- **Custo real:** baseado em uso acumulado no período; pode variar até a fatura ser fechada.
- **Custo previsto:** estimativa até o fim do período (mensal/trimestral/anual); não existe para período personalizado.
- Orçamentos mensais consideram custos até **dois dias** do mês seguinte (atraso de relatório).
- **Economias** (créditos, descontos) reduzem o valor considerado no cálculo do alerta, se você tiver optado por incluí-las no escopo.

---

## Links oficiais e captura de telas

### Screenshots gratuitos que se encaixam no projeto

A documentação oficial do Google Cloud disponibiliza **imagens gratuitas** do fluxo de orçamentos e alertas. Você pode usá-las no projeto (documentação sob licença aberta) ou baixar e salvar em `assets/`:

| Descrição | URL direta da imagem |
|-----------|----------------------|
| Diagrama de notificações de alerta de orçamento | [budget-alert-diagram-all.png](https://docs.cloud.google.com/static/billing/docs/images/budget-alert-diagram-all.png) |
| Gráfico de tendência de custo (criar/editar orçamento) | [budget-cost-trend-chart.png](https://docs.cloud.google.com/static/billing/docs/images/budget-cost-trend-chart.png) |
| Regras de limite de alerta (50%, 90%, 100%) | [budget-alert-threshold-rules-ui.png](https://docs.cloud.google.com/static/billing/docs/images/budget-alert-threshold-rules-ui.png) |
| Página "Orçamentos e alertas" (lista) | [budget-list-cbtp.png](https://docs.cloud.google.com/static/billing/docs/images/budget-list-cbtp.png) |

**Como usar:** clique com o botão direito na URL → "Salvar link como..." (ou abra no navegador e salve a imagem) → coloque em `assets/` com um nome como `orcamentos-lista-oficial.png`. Também é possível exibir direto no Markdown usando a URL:

![Diagrama de notificações de alerta de orçamento (fonte: documentação Google Cloud)](https://docs.cloud.google.com/static/billing/docs/images/budget-alert-diagram-all.png)

### Ferramentas gratuitas para capturar sua própria tela

Se quiser fazer **prints do seu Console GCP** (recomendado para documentação própria):

| Ferramenta | Site | Observação |
|------------|------|------------|
| **ShareX** | [getsharex.com](https://getsharex.com/) | Open source, Windows: região, janela, anotações, sem marca d'água. |
| **Greenshot** | [getgreenshot.org](https://getgreenshot.org/) | Open source, leve: captura região/janela, edição básica. |
| **ScreenRec** | [screenrec.com/screenshot-tool](https://screenrec.com/screenshot-tool/) | Atalho Alt+S, 2 GB nuvem grátis, Windows/Mac/Linux. |

No **Windows** você também pode usar **Win + Shift + S** (ferramenta de recorte) para capturar área ou janela sem instalar nada.

### Console e tutorial

1. **Orçamentos e alertas:**  
   [console.cloud.google.com/billing/budgets](https://console.cloud.google.com/billing/budgets?hl=pt-br)

2. **Tutorial guiado (criar orçamento):**  
   [Tutorial – Criar orçamentos (conta de faturamento)](https://console.cloud.google.com/billing/overview?walkthrough_tutorial_id=billing_create_budgets&hl=pt-br)

3. **Telas sugeridas para captura:**  
   Lista de orçamentos → Criar orçamento (nome e escopo) → Valor e regras de alerta → Orçamento criado com barra de progresso.

---

## Referências

- [Criar, editar ou excluir orçamentos e alertas de orçamento (pt-BR)](https://cloud.google.com/billing/docs/how-to/budgets?hl=pt-br)
- [Visão geral do Cloud Billing](https://cloud.google.com/billing/docs/concepts?hl=pt-br)
- [Configurar notificações programáticas (Pub/Sub)](https://cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications?hl=pt-br)
- [Controle de acesso do Cloud Billing](https://cloud.google.com/billing/docs/how-to/billing-access?hl=pt-br)

---

*Documento criado para o desafio de exportação e configuração de Faturamento no GCP – Formação GCP Specialist.*
