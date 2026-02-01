# 🎶 Desafio DIO: Criando um Algoritmo de Recomendação de Músicas com Base em Grafos

Este projeto tem como objetivo desenvolver um sistema de recomendação de músicas utilizando **Neo4j** e **modelagem em grafos**.  
A proposta é representar usuários, músicas, artistas e gêneros como nós em um grafo, e as interações (escutar, curtir, seguir) como relacionamentos com propriedades.  
A partir disso, consultas Cypher podem gerar recomendações personalizadas.

---

## 🧠 Modelo de Grafo

### Entidades (Nós)
- `User`: representa o usuário da plataforma.
- `Track`: representa uma música.
- `Artist`: representa o artista que criou a música.
- `Genre`: representa o gênero musical.

### Relacionamentos (Arestas)
- `LISTENED`: conecta `User` → `Track` (propriedade `times`).
- `LIKED`: conecta `User` → `Track` (propriedade `rating`).
- `FOLLOWS`: conecta `User` → `Artist`.
- `PERFORMED_BY`: conecta `Track` → `Artist`.
- `IN_GENRE`: conecta `Track` → `Genre`.

---

## 📸 Diagrama do Grafo

![Music Recommendation Graph](https://copilot.microsoft.com/th/id/BCO.c6779ea7-1205-4353-a1e6-362dfb310d8b.png)

---

## 🗂️ Estrutura do Projeto

- `graph_model.png`: diagrama visual do grafo.
- `music_graph.cypher`: script Cypher com:
  - Criação de constraints de unicidade.
  - Inserção de usuários, músicas, artistas e gêneros.
  - Criação dos relacionamentos entre os nós.

---

## 🚀 Como Executar

1. Instale o Neo4j Desktop ou acesse [Neo4j Aura](https://neo4j.com/cloud/aura/).
2. Crie um novo banco de dados.
3. Copie o conteúdo do arquivo `music_graph.cypher` e execute no console Cypher.
4. Visualize o grafo e explore as conexões usando consultas como:

```cypher
// Recomendar músicas do mesmo gênero que o usuário curtiu
MATCH (u:User {id:1})-[:LIKED]->(t:Track)-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(rec:Track)
WHERE NOT (u)-[:LISTENED]->(rec)
RETURN rec.title AS RecommendedTrack, g.name AS Genre;

// Recomendar músicas de artistas seguidos
MATCH (u:User {id:1})-[:FOLLOWS]->(a:Artist)<-[:PERFORMED_BY]-(t:Track)
WHERE NOT (u)-[:LISTENED]->(t)
RETURN t.title AS RecommendedTrack, a.name AS Artist;

// Recomendar músicas que usuários semelhantes curtiram
MATCH (u1:User {id:1})-[:LIKED]->(t:Track)<-[:LIKED]-(u2:User)-[:LIKED]->(rec:Track)
WHERE NOT (u1)-[:LISTENED]->(rec)
RETURN DISTINCT rec.title AS RecommendedTrack;
```


## 📚 Aprendizados

    Modelagem de grafos aplicada ao domínio musical.

    Uso de Cypher para criação e consulta de dados.

    Representação de interações com propriedades.

    Construção de algoritmos de recomendação baseados em conexões.

## 🛠️ Tecnologias

    Neo4j

    Cypher Query Language
