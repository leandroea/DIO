# 📽️ Desafio DIO: Modelagem de Dados em Grafos com Neo4j

Este projeto tem como objetivo modelar e implementar um grafo de conhecimento para um serviço de streaming utilizando o banco de dados orientado a grafos **Neo4j**. A proposta é representar as relações entre usuários, filmes, séries, gêneros, atores e diretores de forma eficiente e navegável.

---

## 🧠 Modelo de Grafo

O grafo é composto pelas seguintes **entidades (nós)**:

- `User`: representa o usuário da plataforma.
- `Movie`: representa um filme disponível no serviço.
- `Series`: representa uma série disponível no serviço.
- `Genre`: representa o gênero de um conteúdo.
- `Actor`: representa um ator que participou de filmes ou séries.
- `Director`: representa o diretor responsável por filmes ou séries.

### 🔗 Relacionamentos

- `WATCHED`: conecta `User` a `Movie` ou `Series`, com a propriedade `rating`.
- `ACTED_IN`: conecta `Actor` a `Movie` ou `Series`.
- `DIRECTED`: conecta `Director` a `Movie` ou `Series`.
- `IN_GENRE`: conecta `Movie` ou `Series` a `Genre`.

---

## 🗂️ Estrutura do Projeto

- `graph_model.png`: diagrama visual do grafo.
- `streaming_graph.cypher`: script Cypher com:
  - Criação de constraints de unicidade.
  - Inserção de 10 usuários.
  - Inserção de 10 filmes/séries.
  - Inserção de gêneros, atores e diretores.
  - Criação dos relacionamentos entre os nós.

---

## 🚀 Como Executar

1. Instale o Neo4j Desktop ou acesse [Neo4j Aura](https://neo4j.com/cloud/aura/).
2. Crie um novo banco de dados.
3. Copie o conteúdo do arquivo `streaming_graph.cypher` e execute no console Cypher.
4. Visualize o grafo e explore as conexões usando consultas como:

```cypher
// Filmes assistidos por um usuário
MATCH (u:User {name:"Alice"})-[:WATCHED]->(m) RETURN m;

// Atores que atuaram em filmes de ficção científica
MATCH (a:Actor)-[:ACTED_IN]->(m:Movie)-[:IN_GENRE]->(g:Genre {name:"Sci-Fi"}) RETURN a.name, m.title;
```

## 📚 Aprendizados

    Modelagem de grafos para domínios reais.

    Uso de Cypher para criação e consulta de dados.

    Representação de relacionamentos complexos com propriedades.

    Visualização de dados conectados com Neo4j.

## 🛠️ Tecnologias

    Neo4j

    Cypher Query Language

