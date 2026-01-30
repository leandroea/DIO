# 🚀 Desafio de Portfólio - Fluxo ETL com Python

Este projeto faz parte do desafio prático de Ciência de Dados, com o objetivo de **replicar um fluxo ETL (Extração, Transformação e Carregamento)** utilizando Python.  
O foco principal é entender como os dados fluem entre as etapas, mais do que a ferramenta utilizada para obtê-los.

---

## 🎯 Objetivo
- Criar um repositório no GitHub para demonstrar habilidades práticas em Python e Ciência de Dados.
- Implementar um fluxo ETL simples e funcional.
- Mostrar ao mercado que você sabe construir soluções reais e documentadas.

---

## 🔄 Fluxo ETL

1. **Extração (E)**  
   - Obter dados de uma fonte.  
   - Caso a API esteja fora do ar, foram utilizadas alternativas:
     - Lista de usuários fictícios criada diretamente no código Python.  
     - Arquivo CSV com colunas: `Nome`, `Conta`, `Cartão`.

2. **Transformação (T)**  
   - Processar os dados extraídos.  
   - Gerar mensagens personalizadas para cada usuário.  
   - Exemplo: `"Olá João, sua conta 1234 está vinculada ao cartão 5678."`

3. **Carregamento (L)**  
   - Salvar os dados transformados em um novo arquivo CSV.  
   - Esse arquivo pode ser utilizado para relatórios ou integração com outros sistemas.

---

## ⚙️ Tecnologias Utilizadas
- **Python 3.x**
- Bibliotecas:
  - `pandas` → manipulação de dados
  - `csv` → leitura e escrita de arquivos
  - `os` → manipulação de diretórios

---
