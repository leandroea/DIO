// =======================
// CONSTRAINTS
// =======================
CREATE CONSTRAINT user_id_unique IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE;
CREATE CONSTRAINT movie_id_unique IF NOT EXISTS FOR (m:Movie) REQUIRE m.id IS UNIQUE;
CREATE CONSTRAINT series_id_unique IF NOT EXISTS FOR (s:Series) REQUIRE s.id IS UNIQUE;
CREATE CONSTRAINT genre_id_unique IF NOT EXISTS FOR (g:Genre) REQUIRE g.id IS UNIQUE;
CREATE CONSTRAINT actor_id_unique IF NOT EXISTS FOR (a:Actor) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT director_id_unique IF NOT EXISTS FOR (d:Director) REQUIRE d.id IS UNIQUE;

// =======================
// NODES
// =======================

// Usuários
CREATE (:User {id:1, name:"Alice"});
CREATE (:User {id:2, name:"Bruno"});
CREATE (:User {id:3, name:"Carla"});
CREATE (:User {id:4, name:"Daniel"});
CREATE (:User {id:5, name:"Eva"});
CREATE (:User {id:6, name:"Felipe"});
CREATE (:User {id:7, name:"Gabriela"});
CREATE (:User {id:8, name:"Henrique"});
CREATE (:User {id:9, name:"Isabela"});
CREATE (:User {id:10, name:"João"});

// Filmes
CREATE (:Movie {id:101, title:"Inception", year:2010});
CREATE (:Movie {id:102, title:"The Matrix", year:1999});
CREATE (:Movie {id:103, title:"Interstellar", year:2014});
CREATE (:Movie {id:104, title:"The Dark Knight", year:2008});
CREATE (:Movie {id:105, title:"Pulp Fiction", year:1994});

// Séries
CREATE (:Series {id:201, title:"Breaking Bad", year:2008});
CREATE (:Series {id:202, title:"Game of Thrones", year:2011});
CREATE (:Series {id:203, title:"Stranger Things", year:2016});
CREATE (:Series {id:204, title:"The Crown", year:2016});
CREATE (:Series {id:205, title:"The Office", year:2005});

// Gêneros
CREATE (:Genre {id:301, name:"Sci-Fi"});
CREATE (:Genre {id:302, name:"Drama"});
CREATE (:Genre {id:303, name:"Action"});
CREATE (:Genre {id:304, name:"Comedy"});
CREATE (:Genre {id:305, name:"Crime"});

// Atores
CREATE (:Actor {id:401, name:"Leonardo DiCaprio"});
CREATE (:Actor {id:402, name:"Keanu Reeves"});
CREATE (:Actor {id:403, name:"Matthew McConaughey"});
CREATE (:Actor {id:404, name:"Bryan Cranston"});
CREATE (:Actor {id:405, name:"Millie Bobby Brown"});

// Diretores
CREATE (:Director {id:501, name:"Christopher Nolan"});
CREATE (:Director {id:502, name:"Quentin Tarantino"});
CREATE (:Director {id:503, name:"Vince Gilligan"});
CREATE (:Director {id:504, name:"David Benioff"});
CREATE (:Director {id:505, name:"Greg Daniels"});

// =======================
// RELACIONAMENTOS
// =======================

// WATCHED com rating
MATCH (u:User {id:1}), (m:Movie {id:101}) CREATE (u)-[:WATCHED {rating:5}]->(m);
MATCH (u:User {id:2}), (m:Movie {id:102}) CREATE (u)-[:WATCHED {rating:4}]->(m);
MATCH (u:User {id:3}), (s:Series {id:201}) CREATE (u)-[:WATCHED {rating:5}]->(s);
MATCH (u:User {id:4}), (s:Series {id:202}) CREATE (u)-[:WATCHED {rating:3}]->(s);
MATCH (u:User {id:5}), (m:Movie {id:103}) CREATE (u)-[:WATCHED {rating:5}]->(m);
MATCH (u:User {id:6}), (s:Series {id:203}) CREATE (u)-[:WATCHED {rating:4}]->(s);
MATCH (u:User {id:7}), (m:Movie {id:104}) CREATE (u)-[:WATCHED {rating:5}]->(m);
MATCH (u:User {id:8}), (s:Series {id:204}) CREATE (u)-[:WATCHED {rating:4}]->(s);
MATCH (u:User {id:9}), (m:Movie {id:105}) CREATE (u)-[:WATCHED {rating:5}]->(m);
MATCH (u:User {id:10}), (s:Series {id:205}) CREATE (u)-[:WATCHED {rating:5}]->(s);

// ACTED_IN
MATCH (a:Actor {id:401}), (m:Movie {id:101}) CREATE (a)-[:ACTED_IN]->(m);
MATCH (a:Actor {id:402}), (m:Movie {id:102}) CREATE (a)-[:ACTED_IN]->(m);
MATCH (a:Actor {id:403}), (m:Movie {id:103}) CREATE (a)-[:ACTED_IN]->(m);
MATCH (a:Actor {id:404}), (s:Series {id:201}) CREATE (a)-[:ACTED_IN]->(s);
MATCH (a:Actor {id:405}), (s:Series {id:203}) CREATE (a)-[:ACTED_IN]->(s);

// DIRECTED
MATCH (d:Director {id:501}), (m:Movie {id:101}) CREATE (d)-[:DIRECTED]->(m);
MATCH (d:Director {id:501}), (m:Movie {id:103}) CREATE (d)-[:DIRECTED]->(m);
MATCH (d:Director {id:502}), (m:Movie {id:105}) CREATE (d)-[:DIRECTED]->(m);
MATCH (d:Director {id:503}), (s:Series {id:201}) CREATE (d)-[:DIRECTED]->(s);
MATCH (d:Director {id:504}), (s:Series {id:202}) CREATE (d)-[:DIRECTED]->(s);
MATCH (d:Director {id:505}), (s:Series {id:205}) CREATE (d)-[:DIRECTED]->(s);

// IN_GENRE
MATCH (m:Movie {id:101}), (g:Genre {id:301}) CREATE (m)-[:IN_GENRE]->(g);
MATCH (m:Movie {id:102}), (g:Genre {id:301}) CREATE (m)-[:IN_GENRE]->(g);
MATCH (m:Movie {id:103}), (g:Genre {id:301}) CREATE (m)-[:IN_GENRE]->(g);
MATCH (m:Movie {id:104}), (g:Genre {id:303}) CREATE (m)-[:IN_GENRE]->(g);
MATCH (m:Movie {id:105}), (g:Genre {id:305}) CREATE (m)-[:IN_GENRE]->(g);

MATCH (s:Series {id:201}), (g:Genre {id:302}) CREATE (s)-[:IN_GENRE]->(g);
MATCH (s:Series {id:202}), (g:Genre {id:302}) CREATE (s)-[:IN_GENRE]->(g);
MATCH (s:Series {id:203}), (g:Genre {id:301}) CREATE (s)-[:IN_GENRE]->(g);
MATCH (s:Series {id:204}), (g:Genre {id:302}) CREATE (s)-[:IN_GENRE]->(g);
MATCH (s:Series {id:205}), (g:Genre {id:304}) CREATE (s)-[:IN_GENRE]->(g);
