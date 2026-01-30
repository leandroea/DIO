# 🛒 Projeto Conceitual de E-commerce - Modelagem de Dados

Este repositório contém o **esquema conceitual** de um sistema de e-commerce, desenvolvido como parte de um desafio prático de modelagem de dados.  
O objetivo é representar as entidades e relacionamentos essenciais para o funcionamento de uma plataforma de comércio eletrônico, com foco em boas práticas de organização e refinamento do modelo.

---

## 🎯 Objetivo do Projeto

Modelar um cenário reduzido de e-commerce utilizando o modelo **Entidade-Relacionamento (ER)**, com os seguintes requisitos adicionais:

- Diferenciar **Cliente Pessoa Física (PF)** e **Pessoa Jurídica (PJ)**, garantindo que uma conta seja de apenas um tipo.
- Permitir o cadastro de **múltiplas formas de pagamento** por cliente.
- Incluir a entidade **Entrega**, com atributos de **status** e **código de rastreio**.

---

## 🧩 Entidades Principais

- **Cliente**
  - idCliente
  - Nome
  - Tipo (PF ou PJ)
  - CPF ou CNPJ (dependente do tipo)
  - Endereço

- **Pedido**
  - idPedido
  - Data
  - Status
  - Frete
  - idCliente (FK)

- **Produto**
  - idProduto
  - Categoria
  - Descrição
  - Valor

- **Pagamento**
  - idPagamento
  - Tipo (Cartão, Pix, Boleto, etc.)
  - idCliente (FK)

- **Entrega**
  - idEntrega
  - Status (Em trânsito, Entregue, Cancelado, etc.)
  - Código de rastreio
  - idPedido (FK)

- **ItemPedido**
  - idItem
  - idPedido (FK)
  - idProduto (FK)
  - Quantidade

---

## 🔗 Relacionamentos

- Um **cliente** pode realizar vários **pedidos**.
- Um **pedido** pode conter vários **produtos** (via entidade ItemPedido).
- Um **cliente** pode ter **várias formas de pagamento**.
- Cada **pedido** possui uma **entrega** associada.
- Cada **entrega** possui um **status** e **código de rastreio**.

---

## 🛠️ Ferramenta de Modelagem

O modelo foi desenvolvido utilizando **MySQL Workbench**, com especificação clara de **PKs (chaves primárias)** e **FKs (chaves estrangeiras)** para garantir integridade referencial.

---
