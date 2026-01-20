# ChatGPT Clone — Clone fullstack do ChatGPT 🔧🤖

**Visão geral**

Este projeto é um clone fullstack do ChatGPT que integra um frontend em React (pasta `web`) com um backend Node/Express (pasta `server`) que consome a API da OpenAI (modelo text-davinci-003). Ele permite enviar prompts e receber respostas geradas pelo modelo.

---

## ✨ Recursos

- Envio de prompts do frontend para o backend
- Integração com OpenAI (text-davinci-003)
- Estrutura simples para estudar ou estender

---

## 🧰 Tecnologias

- Backend: Node.js, Express, openai, dotenv, CORS
- Frontend: React, axios

---

## 📁 Estrutura do projeto

- `server/` — Backend Node/Express
  - `src/routes/routes.js` — Rota: `POST /api/prompt`
  - `src/controllers/prompt-controller.js` — Lógica de chamada à OpenAI
  - `src/config/openai.js` — Configuração do cliente OpenAI
  - `src/models/InputPrompt.js` — Modelo simples do payload

- `web/` — Frontend React
  - `src/api/api.js` — Função `makeRequest` que chama `http://localhost:5555/api/prompt`
  - Componentes que fazem a interface de chat

---

## ⚙️ Requisitos

- Node.js (recomendado v16+)
- NPM
- Chave de API da OpenAI (crie em https://platform.openai.com)

---

## 🚀 Como rodar localmente

1. Backend

```bash
cd server
npm install
# Crie um arquivo .env com a variável abaixo
# OPEN_AI_KEY=sk-xxxxxx
# (Opcional) PORT=5555
npm start
```

> O backend expõe `POST /api/prompt` (por padrão na porta `3000`, a menos que configure `PORT`).

2. Frontend

```bash
cd web
npm install
npm start
```

> O frontend por padrão faz requests para `http://localhost:5555/api/prompt`. Se o backend rodar em outra porta (ex.: `3000`), atualize `web/src/api/api.js` e ajuste `URL_API`.

---

## ⚠️ Problemas comuns

- 401/Chave inválida: verifique `OPEN_AI_KEY` no `.env` do backend
- CORS: se frontend e backend estiverem em domínios/portas diferentes, ajuste permissões CORS no `server/src/app.js`
- Erro de Porta: verifique `URL_API` em `web/src/api/api.js`

---

## 💡 Melhorias sugeridas

- Persistência de histórico de conversas
- Autenticação e perfis de usuário
- Streaming de respostas (para UX mais fluida)
- Suporte a conversas multi-turno (contexto)

---
