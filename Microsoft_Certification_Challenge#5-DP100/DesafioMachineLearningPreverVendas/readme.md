# Gelato Mágico — Análise de Sentenças 🧊🍦

## 🎯 Objetivo
Completar os itens 2 e 3 do projeto: adicionar uma pasta `inputs` com sentenças e criar este `readme.md` com *prints*, processo e insights obtidos após a **análise da IA** nas sentenças.

---

## 🔧 O que foi adicionado
- **`inputs/sentences.txt`** — arquivo com 10 sentenças sobre vendas, temperatura e comportamento dos clientes.
- **`analyze_inputs.py`** — script simples para reproduzir a análise (contagem de palavras, palavras-chave e sentimento aproximado).

---

## 🧪 Processo (resumo)
1. Criei um conjunto de sentenças representando dados qualitativos do negócio (ver `inputs/sentences.txt`).
2. Executei uma análise automática (usando `analyze_inputs.py`) para extrair palavras-chave, frequência e sinalizações de sentimento.
3. Compilei **insights** e recomendações práticos baseados na análise.

---

## 📋 Prints / Saída de exemplo (executando `python analyze_inputs.py`)

```
Análise de Sentenças - Gelato Mágico
Total de sentenças: 10
Top 5 palavras: sorvetes(5), calor(4), vendas(4), clientes(3), praia(2)
Sentimento geral: Positivo (7 positivas, 1 neutra, 2 negativas)
Principais insights:
 - Alta correlação: dias quentes → aumento de vendas
 - Risco: dias chuvosos → estoque parado e desperdício
 - Oportunidade: promoções/marketing em dias quentes e eventos
Recomendações: ajustar produção em função da previsão de temperatura; aumentar estoque de sabores populares em feriados/finas de semana.
```

---

## 💡 Insights obtidos pela IA
- **Correlação direta** entre temperatura alta e aumento de vendas; recomenda-se modelagem preditiva (regressão) usando temperatura como variável principal.
- **Ações comerciais**: campanhas direcionadas em dias quentes, promoções para turistas, e presença em eventos locais.
- **Operacional**: planejar estoque e produção com base em previsões para reduzir desperdício.

---
