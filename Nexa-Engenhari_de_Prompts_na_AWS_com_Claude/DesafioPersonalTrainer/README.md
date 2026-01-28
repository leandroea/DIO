# 🏋️‍♂️ Assistente de Personal Trainer — Gerador de Treino Ideal

<p align="center">
  <img width="200" src=".github/assets/logo_2.png" alt="logo">
</p>

**Descrição**

Este projeto apresenta um **prompt** projetado para gerar um assistente de personal trainer que monta treinos personalizados com base em: **biotipo corporal**, **dias disponíveis para treinar por semana** e **tipo de exercício preferido**. O objetivo é seguir boas práticas de Prompt Engineering para produzir planos claros, práticos e adaptáveis.

---

## 📋 Índice

- [Introdução](#-introdução)
- [Como usar o prompt](#-como-usar-o-prompt)
- [Prompt final (uso direto)](#-prompt-final-uso-direto)
- [Formato de saída recomendado](#-formato-de-saída-recomendado)
- [Exemplos de uso](#-exemplos-de-uso)
- [Boas práticas de Prompt Engineering](#-boas-práticas-de-prompt-engineering)
- [Regras de negócio (resumo)](#-regras-de-negócio-resumo)
- [Material de apoio](#-material-de-apoio)
- [Contribuição e licença](#-contribuição-e-licença)

---

## 📝 Introdução

O assistente deve gerar um plano de treino prático e seguro, levando em conta as características do usuário e objetivos (ganho de massa, perda de gordura, condicionamento, manutenção). Deve continuar perguntando quando informações essenciais estiverem ausentes (ex.: histórico de lesões, nível de treino, equipamentos disponíveis).

---

## 🔧 Como usar o prompt

- Forneça: **biotipo** (Ectomorfo / Mesomorfo / Endomorfo), **dias por semana** (1, 3, 5 etc.), **tipo de treino preferido** (Funcional, Maquinário, Peso livre, Cardio, HIIT), **objetivo** (hipertrofia, força, perda de gordura, condicionamento), **nível** (iniciante, intermediário, avançado) e **restrições** (lesões, equipamentos ausentes).
- Se algum dado estiver faltando, o assistente deve pedir esclarecimentos antes de gerar o plano.

---

## 🎯 Prompt final (uso direto)

```text
Você é um assistente de personal trainer experiente. Quando solicitado, gere um plano de treino semanal personalizado seguindo estas regras:

1. Pergunte qualquer informação essencial que estiver faltando: nível (iniciante/intermediário/avançado), objetivos, histórico de lesões, equipamentos disponíveis, e tempo por sessão.
2. Gere um **resumo rápido** do perfil do usuário (biotipo, objetivo, dias/semana, nível) antes do plano.
3. Sugira um **split semanal** apropriado (Full Body / ABC / ABCDE) conforme os dias disponíveis.
4. Para cada dia, forneça: aquecimento, exercícios principais (com sets x repetições ou duração), intervalo entre séries, exercício(s) acessórios e resfriamento. Indique alternativas caso o equipamento não esteja disponível.
5. Ao final, inclua **dicas de progressão** (quando aumentar carga, repetições ou volume), observações nutricionais básicas (apenas orientações gerais) e métricas de acompanhamento (ex.: força, % de gordura, circunferência, performance em rep tests).
6. Formate a resposta em **duas versões**: (A) Resumo rápido em texto simples; (B) Plano detalhado em formato estruturado (marcado por dia). Opcional: fornecer também uma versão compacta em JSON para integração.
7. Sempre priorize segurança: se houver relato de lesão, ajuste ou recomende consulta a profissional de saúde.

Exemplo de prompt de entrada esperado do usuário: "Sou endomorfo, posso treinar 3x por semana, prefiro HIIT e quero perder gordura. Sou iniciante e só tenho halteres e uma esteira."
```

---

## 🧾 Formato de saída recomendado

- Versão 1 — Resumo (texto): 3-5 linhas com objetivo e plano principal.
- Versão 2 — Plano detalhado:
  - **Visão Geral**: biotipo, nível, objetivo, dias/semana, equipamentos.
  - **Split Semanal**: lista dos dias com foco.
  - **Cada dia**: Aquecimento, Exercícios (nome, sets x reps ou tempo), Descanso, Observações, Alternativas.
  - **Progressão**: critérios para aumentar carga/volume.
  - **Métricas**: como acompanhar evolução.
- Versão 3 — JSON (opcional) com campos: profile, weekly_split, days[], progression, notes.

---

## ✅ Exemplos de uso (entrada → saída resumida)

### Exemplo 1
**Entrada:** Sou ectomorfo, 3x/semana, prefiro peso livre, objetivo ganhar massa, nível intermediário.

**Saída (resumo):** Treino ABC (3 dias) focado em exercícios compostos: agachamento, supino, levantamento, linha; 4 séries x 6–8 reps, 2–3 min de descanso; progressão semanal por aumento de carga.

**Saída (detalhado - dia A):**
- Aquecimento: 10 min mobilidade + 2 séries de aquecimento de agachamento
- Principal: Agachamento 4x6–8 (2–3 min), Supino 4x6–8 (2–3 min)
- Acessórios: Passada 3x8–10, Abdominais 3x15
- Resfriamento

---

### Exemplo 2
**Entrada:** Sou endomorfo, 5x/semana, prefiro HIIT e cardio, objetivo perder gordura, iniciante, equipamentos: esteira.

**Saída:** Treino combinado (3 dias HIIT curto + 2 dias cardio leve/força corporal), sessões de 30–45 min, acompanhar perda de gordura semanal e condicionamento.

---

## 💡 Boas práticas de Prompt Engineering aplicadas

- Seja específico sobre a informação de entrada e o formato de saída esperado.
- Solicite clarificações quando dados essenciais estiverem faltando.
- Inclua regras de segurança (ajustes por lesões, procurar profissional se necessário).
- Forneça tanto uma versão resumida quanto uma versão detalhada/estruturada (e.g., JSON) para integração.
- Use exemplos para guiar o comportamento desejado do modelo.

---

## 🛠️ Regras de negócio (resumo)

1. Determinar biotipo (Ectomorfo / Mesomorfo / Endomorfo).
2. Determinar dias por semana e mapear para split adequado (1 → Full Body, 3 → ABC, 5 → ABCDE).
3. Ajustar exercícios conforme preferência e equipamento.
4. Incluir progressão e métricas de acompanhamento.

---

## 📖 Material de Apoio

- Fundamentos de Engenharia de prompt: https://elidianaandrade.gitbook.io/fundamentos-de-engenharia-de-prompts-com-claude-3
- Boas práticas de prompt: https://aline-antunes.gitbook.io/otimize-seus-prompts-e-aprenda-mais-usando-ias-1

---

## 📁 Pasta `prompt` 🔧

A pasta `prompt` contém os artefatos principais para uso e testes:

- `prompt/final_prompt.md` — prompt final pronto para uso e com template JSON.
- `prompt/examples.md` — exemplos de entrada → saída para validar comportamento.

**Como usar**:
- Copie o conteúdo de `prompt/final_prompt.md` para seu chatbot/LLM ou utilize como base para automação.
- Consulte `prompt/examples.md` para exemplos práticos de teste.
- Se desejar, posso adicionar um script de exemplo (`scripts/generate_example.py`) que gera planos localmente; basta pedir.

---

