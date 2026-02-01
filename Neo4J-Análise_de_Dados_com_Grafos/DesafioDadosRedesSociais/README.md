# 📱 Desafio DIO: Rede Social com Banco de Dados em Grafos

Este projeto apresenta um protótipo funcional de uma rede social modelada com **Neo4j**, capaz de responder perguntas complexas sobre **engajamento**, **popularidade de conteúdo** e **comunidades de interesse**.

---

## 🧠 Modelo de Grafo

### Entidades (Nós)
- `User`: usuários da rede.
- `Post`: publicações feitas.
- `Comment`: comentários em posts.
- `Hashtag`: tópicos associados.
- `Group`: comunidades temáticas.

### Relacionamentos
- `FOLLOWS`: usuários que seguem outros.
- `POSTED`: usuários que publicaram posts.
- `COMMENTED`: usuários que comentaram.
- `LIKED`: usuários que curtiram posts ou comentários (com `timestamp`).
- `TAGGED`: posts com hashtags.
- `MEMBER_OF`: usuários que participam de grupos.

---

## 🚀 Como Executar

1. Instale o Neo4j Desktop ou acesse [Neo4j Aura](https://neo4j.com/cloud/aura/).
2. Crie um novo banco de dados.
3. Execute o script `social_graph.cypher` no console Cypher.
4. Explore o grafo com consultas como:

```cypher
// Quem são os usuários mais ativos?
MATCH (u:User)-[:POSTED]->(p:Post)
RETURN u.name, COUNT(p) AS posts ORDER BY posts DESC;

// Quais hashtags estão mais associadas?
MATCH (p:Post)-[:TAGGED]->(h:Hashtag)
RETURN h.name, COUNT(p) AS freq ORDER BY freq DESC;

// Quem curtiu o mesmo conteúdo?
MATCH (u1:User)-[:LIKED]->(p:Post)<-[:LIKED]-(u2:User)
WHERE u1 <> u2
RETURN u1.name, u2.name, p.content;
```

## 🛠️ Tecnologias

    Neo4j

    Cypher Query Language