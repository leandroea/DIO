# Sistema Bancário em Python

Este é um exemplo simples de um sistema bancário em Python. O objetivo é implementar três operações essenciais: depósito, saque e extrato.

## Como usar

1. Certifique-se de ter o Python instalado em sua máquina.
2. Clone este repositório para o seu ambiente local.
3. Abra o arquivo `sistema_bancario.py` em um editor de texto.
4. Execute o programa Python.
5. Selecione uma das opções no menu:
   - [d] Depositar
   - [s] Sacar
   - [e] Extrato
   - [q] Sair
6. Siga as instruções no menu para realizar as operações desejadas.
7. O extrato atualizado será exibido após cada operação.

## Limitações

- Este é um exemplo simples e não inclui funcionalidades avançadas de um sistema bancário real.
- O sistema permite apenas um limite de saque de R$ 500,00 por saque e um limite máximo de 3 saques por usuário.
- O sistema não possui autenticação de usuário e não persiste os dados entre sessões.

## Funcionalidades

- Depositar: permite ao usuário depositar um valor no saldo.
- Sacar: permite ao usuário sacar um valor do saldo, desde que o valor seja menor ou igual ao saldo atual e não exceda o limite de saque.
- Extrato: exibe o extrato de movimentações do usuário, incluindo depósitos e saques realizados.
- Sair: encerra o programa.
