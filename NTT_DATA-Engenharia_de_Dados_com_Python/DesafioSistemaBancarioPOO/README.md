# 🏦 Sistema Bancário em Python (POO)

## 📌 Descrição
Este projeto implementa um **sistema bancário orientado a objetos** em Python, inspirado em um diagrama UML de classes.  
O sistema permite criar usuários, contas correntes e realizar transações (depósitos e saques), mantendo um histórico de movimentações.

---

## 🚀 Funcionalidades
- **Criar Usuário**: cadastra pessoas físicas com nome, CPF, data de nascimento e endereço.
- **Criar Conta Corrente**: vincula uma conta a um usuário existente, com agência fixa e número sequencial.
- **Depositar**: adiciona valores ao saldo da conta e registra no histórico.
- **Sacar**: permite retirar valores do saldo, respeitando limite de saque e quantidade máxima de saques.
- **Extrato**: exibe todas as movimentações realizadas e o saldo atual.
- **Listar Contas**: mostra todas as contas abertas no sistema.
- **Sair**: encerra o programa.

---

## 🧱 Estrutura de Classes

### `PessoaFisica` (herda de `Cliente`)
- Atributos: `nome`, `cpf`, `data_nascimento`, `endereco`
- Métodos herdados: `adicionar_conta`, `realizar_transacao`

### `Cliente`
- Atributos: `endereco`, `contas`
- Métodos:
  - `adicionar_conta(conta)`
  - `realizar_transacao(conta, transacao)`

### `Conta`
- Atributos: `saldo`, `numero`, `agencia`, `cliente`, `historico`
- Métodos:
  - `depositar(valor)`
  - `sacar(valor)`
  - `exibir_extrato()`

### `ContaCorrente` (herda de `Conta`)
- Atributos adicionais: `limite`, `limite_saques`, `saques_realizados`
- Método sobrescrito: `sacar(valor)` (com regras de limite e quantidade de saques)

### `Historico`
- Atributos: `transacoes`
- Métodos: `adicionar_transacao(transacao)`

### `Transacao` (interface)
- Método: `registrar(conta)`

### `Deposito` e `Saque` (implementam `Transacao`)
- Atributo: `valor`
- Método: `registrar(conta)` (executa operação e registra no histórico)

---