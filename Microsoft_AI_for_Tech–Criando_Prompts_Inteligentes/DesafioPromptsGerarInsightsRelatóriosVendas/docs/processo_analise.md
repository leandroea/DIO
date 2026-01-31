# Processo de Análise: Dados de Vendas → Insights com IA

Este documento descreve a **metodologia** e o **fluxo de trabalho** utilizados para transformar dados de vendas em insights com o uso de prompts e ferramentas de IA, de forma reproduzível e documentada.

---

## Fluxo de trabalho

```
[Planilhas de Vendas] → [Preparação dos Dados] → [Escolha do Prompt] → [IA] → [Insights] → [Documentação]
```

1. **Planilhas de vendas:** Dados em CSV ou Excel (Data, Vendedor, Região, Produto, Quantidade, Valor, Canal, etc.).
2. **Preparação:** Garantir que as colunas estejam claras, sem caracteres estranhos e com formato consistente (datas, números).
3. **Escolha do prompt:** Selecionar o prompt adequado ao objetivo (resumo executivo, padrões, desempenho, ações estratégicas).
4. **Uso da IA:** Colar o prompt + dados (ou anexar o arquivo) na ferramenta escolhida (ChatGPT, Copilot, Azure OpenAI, etc.).
5. **Insights:** Coletar a resposta da IA, revisar e conferir números críticos na planilha.
6. **Documentação:** Registrar os insights em um arquivo (ex.: `insights/insights_obtidos.md`) e versionar no repositório.

---

## Boas práticas

### Ao preparar os dados

- Use cabeçalhos claros (ex.: Valor_Total, não “VlrTot”).
- Mantenha datas em um único formato (ex.: AAAA-MM-DD).
- Evite células mescladas ou fórmulas complexas ao exportar para CSV; prefira valores calculados já preenchidos.

### Ao escrever prompts

- **Contexto:** Diga o que são os dados (relatório de vendas, período, colunas principais).
- **Papel:** Atribua um papel à IA (analista, gerente, consultor) para alinhar o tipo de resposta.
- **Instrução:** Seja específico (ex.: “liste os 3 produtos com maior faturamento” em vez de “analise os produtos”).
- **Formato:** Peça listas, tabelas ou seções numeradas para facilitar o uso dos resultados.
- **Limite:** Peça para a IA não inventar dados e basear-se apenas no que foi fornecido.

### Ao usar os insights

- **Validação:** Confira totais e percentuais na planilha ou em uma ferramenta de BI antes de tomar decisões.
- **Repetição:** Use os mesmos prompts em novos períodos para manter padrão e comparar evolução.
- **Versionamento:** Mantenha no Git as versões dos dados, prompts e insights por período (ex.: por mês ou trimestre).

---

## Ferramentas utilizadas

| Etapa           | Ferramenta sugerida                          |
|-----------------|----------------------------------------------|
| Dados           | Excel, Google Sheets, exportação CSV        |
| Análise com IA  | ChatGPT, Microsoft Copilot, Azure OpenAI    |
| Documentação    | Markdown (README, insights, prompts)         |
| Versionamento   | Git / GitHub                                 |

---

## Próximos passos possíveis

- Automatizar a geração de resumos com APIs (ex.: Azure OpenAI + script que lê o CSV e envia o prompt).
- Integrar com Power BI ou Excel para dashboards que complementem os insights em texto.
- Criar um “template” de relatório mensal que inclua: dados do mês + respostas dos prompts + ações definidas.

Este processo pode ser adaptado para outros tipos de relatório (estoque, atendimento, marketing) alterando apenas os dados e os objetivos dos prompts.
