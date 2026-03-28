# ⚽ API Champions League

Uma API RESTful construída com Node.js, Express e TypeScript para gerenciar dados de jogadores e clubes da Champions League.

![TypeScript](https://img.shields.io/badge/TypeScript-5.4.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express](https://img.shields.io/badge/Express-4.19.1-black)

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Recursos](#recursos)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Primeiros Passos](#primeiros-passos)
- [Endpoints da API](#endpoints-da-api)
- [Modelos](#modelos)
- [Scripts Disponíveis](#scripts-disponíveis)

## 📖 Visão Geral

Esta API fornece uma solução completa para gerenciar dados de jogadores de futebol e clubes da UEFA Champions League. Ela segue um padrão de arquitetura em camadas com separação de responsabilidades entre controladores, serviços e repositórios.

## ✨ Recursos

- **Gerenciamento de Jogadores**
  - Listar todos os jogadores com estatísticas detalhadas
  - Obter jogador por ID
  - Criar novo jogador
  - Atualizar estatísticas do jogador
  - Excluir jogador

- **Gerenciamento de Clubes**
  - Listar todos os clubes da Champions League
  - Obter informações do clube

- **Acompanhamento de Estatísticas**
  - Rating geral
  - Velocidade, Chute, Passe
  - Drible, Defesa, Físico

## 🛠️ Tecnologias

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| Node.js | ^20.x | Ambiente de execução |
| Express | ^4.19.1 | Framework web |
| TypeScript | ^5.4.3 | Linguagem |
| CORS | ^2.8.5 | Compartilhamento de recursos entre origens |
| tsx | ^4.7.1 | Executor TypeScript |
| tsup | ^8.0.2 | Empacotador TypeScript |

## 📂 Estrutura do Projeto

```
src/
├── app.ts                 # Fabrica da aplicação Express
├── server.ts              # Ponto de entrada do servidor
├── routes.ts              # Definições das rotas da API
├── controllers/           # Manipuladores de requisições
│   ├── clubs-controller.ts
│   └── players-controller.ts
├── services/              # Lógica de negócio
│   ├── clubs-service.ts
│   └── players-service.ts
├── repositories/          # Camada de acesso a dados
│   ├── clubs-repository.ts
│   └── players-repository.ts
├── models/                # Modelos e interfaces de dados
│   ├── club-model.ts
│   ├── player-model.ts
│   ├── statistics-model.ts
│   └── http-response-model.ts
├── data/                  # Dados estáticos
│   └── clubs.json
└── utils/                 # Funções utilitárias
    └── http-helper.ts
```

## 🚀 Primeiros Passos

### Pré-requisitos

- Node.js (v20 ou superior)
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# ou com yarn
yarn install
```

### Configuração

Crie um arquivo `.env` no diretório raiz:

```env
PORT=3333
```

### Executando o Projeto

```bash
# Desenvolvimento com hot reload
npm run start:dev

# Modo watch
npm run start:watch

# Build para produção
npm run start:dist
```

O servidor estará disponível em `http://localhost:3333`

## 🔌 Endpoints da API

### Jogadores

| Método | Endpoint | Descrição |
|--------|----------|------------|
| GET | `/api/players` | Obter todos os jogadores |
| GET | `/api/players/:id` | Obter jogador por ID |
| POST | `/api/players` | Criar novo jogador |
| PATCH | `/api/players/:id` | Atualizar estatísticas do jogador |
| DELETE | `/api/players/:id` | Excluir jogador |

### Clubes

| Método | Endpoint | Descrição |
|--------|----------|------------|
| GET | `/api/clubs` | Obter todos os clubes da Champions League |

## 📊 Modelos

### Jogador

```typescript
{
  id: number;
  name: string;
  club: string;
  nationality: string;
  position: string;
  statistics: {
    Overall: number;
    Pace: number;
    Shooting: number;
    Passing: number;
    Dribbling: number;
    Defending: number;
    Physical: number;
  };
}
```

### Clube

```typescript
{
  id: number;
  name: string;
}
```

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|------------|
| `npm run start:dev` | Iniciar servidor em modo desenvolvimento |
| `npm run start:watch` | Iniciar em modo watch |
| `npm run dist` | Build para produção |
| `npm run start:dist` | Executar build de produção |

## 🔐 Configuração CORS Padrão

A API está configurada com CORS habilitado para origens específicas:
- `http://leandroea.sistem.com`
- `http://gov.br`

> **Nota**: Atualize a configuração de CORS em `src/app.ts` conforme suas necessidades.

## 📄 Licença

Licença ISC

---

Feito com ❤️ para os entusiastas da Champions League
