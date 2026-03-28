# 🏎️ Minimal API Formula 1

Uma Minimal API desenvolvido em Node.js com Fastify para gerenciar times e pilotos de Fórmula 1.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

### Dependências de Produção

- **Fastify** - Framework web rápido e de baixo overhead
- **@fastify/cors** - Plugin Fastify para habilitar CORS

### Dependências de Desenvolvimento

- **TypeScript** - Superset JavaScript com tipagem estática
- **tsx** - Permite executar TypeScript diretamente no Node.js
- **tsup** - Empacotador TypeScript sem configuração (powered by esbuild)
- **@types/node** - Definições de tipos para Node.js

## 📄 Arquivos de Configuração

- `.gitignore` - Ignora pastas como node_modules
- `.env` - Variáveis de ambiente (configuração da porta do servidor)
- `tsconfig.json` - Opções de configuração do compilador TypeScript

## ⚡ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dist` | Compila arquivos TypeScript para JavaScript no diretório dist |
| `npm run start:dev` | Executa o servidor em modo desenvolvimento com variáveis do .env |
| `npm run start:watch` | Executa o servidor em modo desenvolvimento com reload automático |
| `npm run start:dist` | Compila o projeto e executa a versão compilada do diretório dist |

## 📋 Endpoints da API

A API executa na porta **3333** por padrão (configurável no arquivo `.env`).

### Times

- **`GET /teams`** - Retorna todos os times de Fórmula 1

**Resposta:**
```json
{
  "teams": [
    { "id": 1, "name": "McLaren", "base": "Woking, United Kingdom" },
    { "id": 2, "name": "Mercedes", "base": "Brackley, United Kingdom" },
    ...
  ]
}
```

### Pilotos

- **`GET /drivers`** - Retorna todos os pilotos

**Resposta:**
```json
{
  "drivers": [
    { "id": 1, "name": "Max Verstappen", "team": "Red Bull Racing" },
    { "id": 2, "name": "Lewis Hamilton", "team": "Ferrari" },
    { "id": 3, "name": "Lando Norris", "team": "McLaren" }
  ]
}
```

- **`GET /drivers/:id`** - Retorna um piloto específico pelo ID

**Parâmetros:**
- `id` - ID do piloto (número)

**Resposta (200):**
```json
{
  "driver": { "id": 1, "name": "Max Verstappen", "team": "Red Bull Racing" }
}
```

**Resposta (404):**
```json
{
  "message": "Driver Not Found"
}
```

## 👨‍💻 Como Usar

Para clonar e executar este projeto, você precisará ter instalado:
- [Git](https://git-scm.com)
- [Node.js v20+](https://nodejs.org/en/)
- [NPM v10+](https://nodejs.org/en/)

A partir da linha de comando:

```bash
# Clone este repositório
$ git clone https://github.com/felipeAguiarCode/node-blue-boilerplate

# Entre no diretório do projeto
$ cd DesafioCriandoMinimalAPIFormula1

# Instale as dependências
$ npm install

# Execute o servidor em modo desenvolvimento
$ npm run start:dev
```

O servidor estará disponível em: `http://localhost:3333`

## 🎯 Estrutura do Projeto

```
├── src/
│   └── server.ts       # Código principal da API
├── .env                # Variáveis de ambiente
├── .gitignore          # Arquivos ignorados pelo Git
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração do TypeScript
└── README.md           # Documentação do projeto
