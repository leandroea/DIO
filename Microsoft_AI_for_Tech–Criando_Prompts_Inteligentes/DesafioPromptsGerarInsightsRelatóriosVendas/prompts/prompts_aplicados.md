# Prompts Aplicados na Análise de Vendas

Este documento reúne os **prompts** utilizados com ferramentas de IA (ex.: ChatGPT, Copilot, Azure OpenAI) para analisar o relatório de vendas e gerar insights. Os prompts foram estruturados com **contexto**, **papel** e **instruções claras** para obter respostas úteis para a tomada de decisão.

---

## 1. Visão geral e resumo executivo

**Objetivo:** Obter um resumo executivo dos dados de vendas.

**Prompt:**

```
Você é um analista de negócios especializado em vendas. Analise o relatório de vendas abaixo (dados em CSV) e forneça:

1. Valor total de vendas no período
2. Número total de transações
3. Os 3 produtos com maior faturamento
4. As 2 regiões com melhor desempenho em valor
5. Comparação entre vendas Loja x Online (valor e %)

Mantenha a resposta objetiva, com números e percentuais quando aplicável. Use formato de bullet points para facilitar a leitura.

[Dados do relatório - colar ou anexar o CSV]
```

---

## 2. Padrões e tendências

**Objetivo:** Identificar padrões e possíveis tendências nos dados.

**Prompt:**

```
Atue como um analista de dados de vendas. Com base no relatório de vendas fornecido:

1. Identifique padrões de venda por dia da semana (se possível) ou ao longo do mês
2. Indique se há concentração de vendas em determinados vendedores ou regiões
3. Sugira 2 a 3 possíveis tendências ou comportamentos que merecem atenção da gestão
4. Aponte 1 risco e 1 oportunidade com base nos números

Seja específico, citando exemplos dos dados quando relevante. Formato: seções numeradas e parágrafos curtos.

[Relatório de vendas]
```

---

## 3. Desempenho por vendedor e região

**Objetivo:** Avaliar desempenho por vendedor e por região para reconhecimento e ações.

**Prompt:**

```
Você é um gerente de vendas analisando resultados. Com o relatório de vendas em anexo:

1. Rankeie os vendedores por valor total vendido (do maior para o menor)
2. Para cada região, informe: valor total, quantidade de transações e produto mais vendido em valor
3. Indique qual vendedor teve melhor desempenho por região (se aplicável)
4. Dê 2 recomendações práticas: uma para melhorar resultados na região/canal mais fraco e outra para replicar o sucesso do melhor desempenho

Use tabelas ou listas quando facilitar a compreensão. Resposta em português.

[Dados do relatório]
```

---

## 4. Insights estratégicos para decisão

**Objetivo:** Gerar conclusões e ações recomendadas para a liderança.

**Prompt:**

```
Contexto: Relatório de vendas de janeiro/2025 com colunas Data, Vendedor, Região, Produto, Quantidade, Valor_Unitário, Valor_Total e Canal (Loja/Online).

Papel: Você é um consultor de negócios focado em vendas e estratégia.

Tarefa: Analise os dados fornecidos e produza um documento de insights estratégicos com:

- **Resumo em 3 linhas:** principais números e conclusão geral
- **Top 3 insights:** descobertas mais relevantes para o negócio
- **Top 3 ações recomendadas:** medidas concretas (o que fazer, para quem, com base em quê)
- **Métrica a acompanhar:** sugestão de 1 KPI para os próximos meses

Mantenha linguagem executiva: clara, direta e acionável. Não invente dados; baseie-se apenas no relatório.

[Colar ou anexar o relatório]
```

---

## 5. Análise de produto e canal

**Objetivo:** Entender desempenho por produto e por canal de venda.

**Prompt:**

```
Analise o relatório de vendas e responda de forma estruturada:

1. Por produto: valor total vendido, quantidade de unidades e participação % no faturamento total
2. Por canal (Loja vs Online): valor total, número de transações e ticket médio
3. Há algum produto que vende mais em um canal específico? Se sim, qual e por quê pode fazer sentido?
4. Uma recomendação de mix de produtos ou canal com base nos dados

Formato: seções com títulos e listas. Dados em reais (R$) quando for valor.

[Relatório]
```

---

## Boas práticas utilizadas

- **Contexto:** Informar que são dados de vendas e o que contém (colunas, período).
- **Papel:** Definir o papel da IA (analista, gerente, consultor) para alinhar o tom da resposta.
- **Instruções claras:** Pedidos numerados e objetivos (resumo, ranking, recomendações).
- **Formato:** Solicitar bullet points, tabelas ou seções para facilitar o uso dos insights.
- **Limite:** Pedir que a IA se baseie apenas nos dados fornecidos, sem inventar números.

Esses prompts podem ser reutilizados e adaptados para outros períodos ou conjuntos de dados trocando apenas o conteúdo do relatório.
