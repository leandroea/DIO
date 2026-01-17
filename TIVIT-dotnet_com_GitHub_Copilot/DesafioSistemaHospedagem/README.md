# 🏨 Sistema de Hospedagem - Projeto de LAB

## 📌 Descrição
Este projeto foi desenvolvido como parte do **LAB da DIO (Digital Innovation One)** no módulo de fundamentos do .NET.  
O objetivo é construir um sistema de hospedagem para gerenciar reservas em um hotel.  

O sistema utiliza três classes principais:
- **Pessoa** → Representa o hóspede.
- **Suíte** → Representa a acomodação escolhida.
- **Reserva** → Faz o relacionamento entre hóspedes e suíte, calculando quantidade de hóspedes e valor da diária.

O programa deve aplicar corretamente as regras de negócio, incluindo:
- Cálculo da quantidade de hóspedes.
- Cálculo do valor da diária.
- Concessão de **10% de desconto** para reservas com período superior a 10 dias.

---

## 🎯 Objetivos do Desafio
- Implementar um sistema simples de hospedagem em **.NET**.
- Aplicar conceitos de **POO** (classes, métodos, encapsulamento).
- Utilizar boas práticas de versionamento com **Git e GitHub**.
- Criar um repositório próprio para compor o portfólio.

---

## 🛠️ Pré-requisitos
- Conhecimentos de **Lógica de Programação** e **POO**.
- Conhecimentos básicos em:
  - **.NET**
  - **Git**
  - **GitHub**
- Computador com sistema operacional de sua preferência (**Windows, Linux ou Mac OS**).
- IDE de desenvolvimento (ex.: **Visual Studio** ou **Visual Studio Code**).

---

## 🧭 Como funciona o projeto
- O projeto é um aplicativo de console em **C# (.NET)** que simula um sistema simples de hospedagem.
- As classes principais ficam em `Models/`:
  - **Pessoa** — representa um hóspede (*Nome*, *Idade*).
  - **Suite** — representa a suíte (*Tipo*, *Capacidade*, *ValorDiaria*).
  - **Reserva** — faz o relacionamento entre hóspedes e suíte, valida a capacidade, retorna a quantidade de hóspedes, o valor da diária e calcula o valor total da reserva (aplica **10% de desconto** quando a reserva tem mais de 10 dias).
- Regras importantes implementadas:
  - Não é possível cadastrar mais hóspedes do que a capacidade da suíte (lança exceção).
  - Desconto de 10% válido apenas quando `DiasReservados > 10`.

## ▶️ Como executar
1. Restaurar dependências e compilar:

```bash
dotnet build
```

2. Executar o programa de exemplo:

```bash
dotnet run --project .
```

- O `Program.cs` já contém um exemplo que cria uma suíte, dois hóspedes e uma reserva de 11 dias para demonstrar o desconto e a validação de capacidade.

## 📄 Exemplo de saída esperada
- `Quantidade de hóspedes: 2`
- `Valor da diária: 150,00 €` (ou outra cultura dependendo do sistema)
- `Valor total da reserva: 1.485,00 €` (com desconto aplicado para 11 dias)
- `Erro ao cadastrar hóspedes: Número de hóspedes maior que a capacidade da suíte.` (quando tentar exceder a capacidade)

## 🗂️ Estrutura do projeto
- `DesafioSistemaHospedagem.csproj` — arquivo do projeto
- `Program.cs` — ponto de entrada e exemplo de uso
- `Models/`
  - `Pessoa.cs`
  - `Suite.cs`
  - `Reserva.cs`

---

## 🛠️ Próximos passos sugeridos
- Adicionar testes unitários (xUnit) para validar cálculo do desconto e regras de capacidade.
- Implementar uma interface de console interativa (entrada do usuário) para criar suítes, hóspedes e reservas em tempo de execução.
- Extender the model with persistence (banco de dados ou arquivo) para salvar reservas.

---

