# 🛒 Projeto Lógico de Banco de Dados - E-commerce

## 📌 Descrição
Este projeto foi desenvolvido como parte do desafio da **DIO (Digital Innovation One)** no módulo de **Modelagem de Banco de Dados**.  
O objetivo é replicar a modelagem lógica de um banco de dados para um cenário de e-commerce, aplicando refinamentos e criando um script SQL para geração do esquema, inserção de dados e consultas complexas.

---

## 🎯 Objetivos do Desafio
- Criar o **projeto lógico** do banco de dados para o cenário de e-commerce.
- Definir **chaves primárias e estrangeiras**, além das constraints necessárias.
- Mapear corretamente os relacionamentos presentes no modelo EER.
- Refinar o modelo conceitual com os seguintes pontos:
  - Cliente PJ e PF – uma conta pode ser **Pessoa Física (PF)** ou **Pessoa Jurídica (PJ)**, mas não ambas.
  - Pagamento – cada cliente pode ter **mais de uma forma de pagamento** cadastrada.
  - Entrega – deve possuir **status** e **código de rastreio**.

---

## 🗂️ Estrutura do Projeto
- `script.sql` → Script SQL para criação do esquema lógico do banco de dados.
- `insert.sql` → Inserção de dados para testes.
- `queries.sql` → Consultas SQL com diferentes cláusulas.
- `README.md` → Explicação do projeto e contexto.

---

## 📊 Consultas SQL Implementadas
As queries desenvolvidas contemplam os seguintes tópicos:

- **SELECT Statement** → Recuperações simples de dados.
- **WHERE Statement** → Filtros aplicados às consultas.
- **Expressões derivadas** → Criação de atributos calculados.
- **ORDER BY** → Ordenação dos resultados.
- **HAVING Statement** → Condições aplicadas a grupos de dados.
- **JOINs** → Junções entre tabelas para análises mais complexas.

---

## ❓ Exemplos de Perguntas Respondidas pelas Queries
- Quantos pedidos foram feitos por cada cliente?
- Algum vendedor também é fornecedor?
- Relação de produtos, fornecedores e estoques.
- Relação de nomes dos fornecedores e nomes dos produtos.

---

## 🛠️ Tecnologias Utilizadas
- **MySQL** (ou outro SGBD relacional compatível)
- Modelagem EER (Enhanced Entity-Relationship)
- SQL (DDL e DML)

---
