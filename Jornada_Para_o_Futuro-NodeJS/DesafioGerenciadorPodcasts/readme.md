# Podcast Manager

## Descrição

O Podcast Manager é uma aplicação inspirada no estilo da Netflix, que permite centralizar diferentes episódios de podcasts separados por categoria. Este projeto visa facilitar o acesso e a organização de episódios de podcasts em formato de vídeo, proporcionando uma experiência de navegação intuitiva e agradável para os usuários.

## Funcionalidades

- **Listar os episódios de podcasts em sessões de categorias:** Os episódios são organizados em categorias como saúde, bodybuilder, mentalidade e humor, permitindo aos usuários explorar facilmente os conteúdos disponíveis.
- **Filtrar episódios por nome de podcast:** Os usuários podem realizar buscas específicas por nome de podcast, facilitando o acesso aos episódios desejados.
- **Tratamento de erros centralizado:** Respostas de erro consistentes e estruturadas para todos os cenários de erro.

## Implementação

### Listar os episódios de podcasts em sessões de categorias

- **Endpoint:** `GET /api/list`
- **Descrição:** Retorna uma lista de episódios de podcasts organizados por categorias.
- **Exemplo de resposta:**

```json
[
  {
    "podcastName": "flow",
    "episode": "CBUM - Flow #319",
    "videoId": "pQSuQmUfS30",
    "categories": ["saúde", "esporte", "bodybuilder"]
  },
  {
    "podcastName": "flow",
    "episode": "RUBENS BARRICHELLO - Flow #339",
    "videoId": "4KDGTdiOV4I",
    "categories": ["esporte", "corrida"]
  }
]
```

### Filtrar episódios por nome de podcast

- **Endpoint:** `GET /api/podcasts?p={nome}`
- **Descrição:** Retorna uma lista de episódios de podcast com base no nome do podcast fornecido.
- **Exemplo de requisição:** `GET /api/podcasts?p=flow`
- **Exemplo de resposta bem-sucedida:**

```json
[
  {
    "podcastName": "flow",
    "episode": "CBUM - Flow #319",
    "videoId": "pQSuQmUfS30",
    "categories": ["saúde", "esporte", "bodybuilder"]
  }
]
```

## Tratamento de Erros

A API implementa um sistema de tratamento de erros centralizado que retorna respostas consistentes para todos os tipos de erro.

### Formato de Resposta de Erro

```json
{
  "statusCode": 400,
  "error": "Error",
  "message": "Descrição do erro",
  "timestamp": "2026-03-28T00:00:00.000Z"
}
```

### Códigos de Erro

| Código | Tipo | Descrição |
|--------|------|-----------|
| 400 | InvalidInputError | Parâmetro de consulta ausente ou inválido |
| 404 | PodcastNotFoundError | Podcast não encontrado |
| 500 | InternalServerError | Erro interno do servidor |
| 500 | FileReadError | Falha ao ler o arquivo de dados |

### Exemplos de Erro

**Erro 400 - Input Inválido:**
```bash
curl -s "http://localhost:3333/api/podcasts"
```
Resposta:
```json
{
  "statusCode": 400,
  "error": "Error",
  "message": "Podcast name query parameter 'p' is required",
  "timestamp": "2026-03-28T00:38:53.191Z"
}
```

**Erro 404 - Podcast Não Encontrado:**
```bash
curl -s "http://localhost:3333/api/podcasts?p=nonexistent"
```
Resposta:
```json
{
  "statusCode": 404,
  "error": "Error",
  "message": "Podcast with name 'nonexistent' not found",
  "timestamp": "2026-03-28T00:39:03.523Z"
}
```

## Tecnologias Utilizadas

- **[TypeScript](https://www.typescriptlang.org/):** Linguagem de programação utilizada para o desenvolvimento do projeto.
- **[Tsup](https://github.com/egoist/tsup):** Ferramenta de construção e empacotamento para projetos TypeScript.
- **[Tsx](https://github.com/egoist/tsx):** Compilador TypeScript que suporta a construção de projetos.
- **[Node.js](https://nodejs.org/):** Ambiente de execução JavaScript que permite executar código JavaScript do lado do servidor.
- **[@types/node](https://www.npmjs.com/package/@types/node):** Pacote de definições de tipos para Node.js para auxiliar no desenvolvimento com TypeScript.

## Como Utilizar

1. Clone este repositório.
2. Instale as dependências usando `npm install`.
3. Inicie o servidor executando `npm run start:dev`.
4. Acesse os endpoints fornecidos para listar os episódios de podcasts ou filtrá-los por nome de podcast.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas ou enviar solicitações de recebimento (pull requests) para melhorar este projeto.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
