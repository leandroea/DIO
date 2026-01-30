# 🔧 Projeto Conceitual - Oficina Mecânica

Este repositório apresenta o **esquema conceitual** de um sistema de controle e gerenciamento de **ordens de serviço (OS)** em uma oficina mecânica.  
O modelo foi desenvolvido com base em uma narrativa prática, simulando o funcionamento real de uma oficina que atende clientes, realiza serviços e gerencia equipes de mecânicos.

---

## 🎯 Objetivo do Projeto

Criar um **modelo entidade-relacionamento (ER)** que represente de forma clara e funcional os principais elementos envolvidos na operação de uma oficina mecânica, incluindo:

- Cadastro de clientes e veículos
- Emissão e controle de ordens de serviço
- Designação de equipes de mecânicos
- Cálculo de valores com base em mão-de-obra e peças
- Autorização e execução dos serviços

---

## 🧩 Entidades e Atributos

### Cliente
- idCliente (PK)
- Nome
- Telefone
- Endereço

### Veículo
- idVeiculo (PK)
- Placa
- Modelo
- Ano
- idCliente (FK)

### Mecânico
- idMecanico (PK)
- Nome
- Endereço
- Especialidade

### Equipe
- idEquipe (PK)
- Nome da equipe

### Equipe_Mecanico (Relacionamento N:N)
- idEquipe (FK)
- idMecanico (FK)

### Ordem de Serviço (OS)
- idOS (PK)
- Data de emissão
- Valor total
- Status
- Data de conclusão
- Autorizada (boolean)
- idVeiculo (FK)
- idEquipe (FK)

### Serviço
- idServico (PK)
- Descrição
- Valor
- idTabelaMaoDeObra (FK)

### TabelaMaoDeObra
- idTabela (PK)
- Tipo de serviço
- Valor referência

### Peça
- idPeca (PK)
- Descrição
- Valor unitário

### OS_Servico (Relacionamento N:N)
- idOS (FK)
- idServico (FK)
- Quantidade

### OS_Peca (Relacionamento N:N)
- idOS (FK)
- idPeca (FK)
- Quantidade

---

## 🔗 Relacionamentos

- Um **cliente** pode ter vários **veículos**
- Um **veículo** pode gerar várias **ordens de serviço**
- Cada **ordem de serviço** é atribuída a uma **equipe**
- Uma **equipe** é composta por vários **mecânicos**
- Cada **OS** pode conter vários **serviços** e **peças**
- Os **serviços** são precificados com base na **tabela de mão-de-obra**
- O **cliente** autoriza ou não a execução da OS

---

## 📌 Observações

- A narrativa não especifica atributos como CPF/CNPJ, e-mail ou endereço completo, então foram incluídos atributos básicos para fins de modelagem.
- A entidade **Equipe_Mecanico** foi criada para representar a relação N:N entre equipes e mecânicos.
- A autorização do cliente foi modelada como um campo booleano na OS.
- A tabela de mão-de-obra foi separada para permitir flexibilidade na precificação dos serviços.

---

## 🛠️ Ferramenta de Modelagem

O modelo foi desenvolvido utilizando **MySQL Workbench**, com definição clara de **PKs** e **FKs** para garantir integridade referencial.

---