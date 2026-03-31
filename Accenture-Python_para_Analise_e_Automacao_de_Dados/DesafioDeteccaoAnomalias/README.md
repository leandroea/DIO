# Detecção de Fraudes em Transações Bancárias

![Python](https://img.shields.io/badge/Python-3.13-blue)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.8.0-orange)
![XGBoost](https://img.shields.io/badge/XGBoost-3.2.0-green)
![SHAP](https://img.shields.io/badge/SHAP-0.51.0-red)

## 📋 Descrição do Projeto

Este projeto faz parte do desafio proposto pelo **Bootcamp DIO - Accenture Python para Análise e Automação de Dados**. O objetivo é desenvolver um modelo de machine learning para detecção de fraudes em transações bancárias utilizando o dataset de cartão de crédito do Kaggle.

## 🎯 Objetivos

- Construir um modelo de classificação para identificar transações fraudulentas
- Tratar o problema de desbalanceamento de classes (fraudes são ~0.17% do total)
- Aplicar técnicas de Feature Engineering para melhorar a performance do modelo
- Avaliar o modelo utilizando métricas apropriadas para dados desbalanceados
- Interpretar os resultados utilizando explicabilidade de modelo (SHAP)

## 📊 Dataset

O dataset utilizado contém transações de cartão de crédito do Kaggle:

- **URL**: `https://storage.googleapis.com/download.tensorflow.org/data/creditcard.csv`
- **Total de transações**: ~284.807
- **Features**: 30 variáveis (Time, V1-V28, Amount, Class)
- **Variável alvo**: `Class` (0 = transação normal, 1 = fraude)

## 🔧 Tecnologias e Bibliotecas

```python
# Principais bibliotecas utilizadas
pandas          # Manipulação de dados
numpy            # Operações matemáticas
scikit-learn     # Machine Learning
XGBoost          # Gradient Boosting
imbalanced-learn # Balanceamento de dados (SMOTE)
SHAP             # Explicabilidade de modelo
matplotlib       # Visualização de dados
```

## 📈 Metodologia

### 1. Análise Exploratória
- Verificação do desbalanceamento das classes
- Distribuição das variáveis

### 2. Feature Engineering
- **Amount_log**: Transformação logarítmica do valor da transação
- **Amount_scaled**: Normalização com StandardScaler

### 3. Divisão dos Dados
- Train/Test split com estratificação (70/30)
- Random state = 42 para reprodutibilidade

### 4. Modelos Utilizados
- **Logistic Regression**: Modelo baseline
- **XGBoost**: Gradient Boosting com ajuste para desbalanceamento

### 5. Técnicas de Balanceamento
- **Undersampling**: Redução da classe majoritária
- **Oversampling (SMOTE)**: Geração de dados sintéticos para classe minoritária

### 6. Métricas de Avaliação
- **Precision**: Proporção de verdadeiros positivos entre positivos previstos
- **Recall** (mais importante): Capacidade de detectar todas as fraudes
- **F1-score**: Média harmônica entre Precision e Recall
- **AUC-ROC**: Área sob a curva ROC
- **Precision-Recall Curve**: Visualização do tradeoff

## 📝 Estrutura do Notebook

O notebook está organizado nas seguintes secciones:

1. **Introdução** - Título e descrição do projeto
2. **Análise do Problema** - Verificação do desbalanceamento
3. **Feature Engineering** - Transformações de variáveis
4. **Modelos** - Treinamento e avaliação
5. **Métricas** - ROC Curve, Precision-Recall Curve
6. **Balanceamento** - Undersampling e Oversampling (SMOTE)
7. **XGBoost** - Modelo otimizado
8. **SHAP** - Explicabilidade do modelo

## 🚀 Como Executar

1. Clone o repositório
2. Execute o Jupyter Notebook: `jupyter notebook`
3. Execute as células em ordem sequencial

## 📊 Resultados

### Logistic Regression (dados desbalanceados)
- **Recall (Fraude)**: 0.67
- **Precision (Fraude)**: 0.85
- **F1-score (Fraude)**: 0.75
- **AUC-ROC**: 0.927

## 📌 Observações Importantes

⚠️ **Atenção ao Desbalanceamento**: Em problemas de fraude, a acurácia pode ser enganosa. Um modelo que simplesmente prevê "não fraude" para tudo terá ~99.8% de acurácia, mas não detectará nenhuma fraude. Por isso, métricas como Recall e F1-score são mais importantes.
