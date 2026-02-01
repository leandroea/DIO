// Constraints
CREATE CONSTRAINT user_id_unique IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE;
CREATE CONSTRAINT track_id_unique IF NOT EXISTS FOR (t:Track) REQUIRE t.id IS UNIQUE;
CREATE CONSTRAINT artist_id_unique IF NOT EXISTS FOR (a:Artist) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT genre_id_unique IF NOT EXISTS FOR (g:Genre) REQUIRE g.id IS UNIQUE;

// Usuários
CREATE (:User {id:1, name:"Alice"});
CREATE (:User {id:2, name:"Bruno"});

// Artistas
CREATE (:Artist {id:101, name:"Taylor Swift"});
CREATE (:Artist {id:102, name:"Drake"});
CREATE (:Artist {id:103, name:"Coldplay"});

// Gêneros
CREATE (:Genre {id:201, name:"Pop"});
CREATE (:Genre {id:202, name:"Hip-Hop"});
CREATE (:Genre {id:203, name:"Rock"});

// Músicas
CREATE (:Track {id:301, title:"Shake It Off"});
CREATE (:Track {id:302, title:"God's Plan"});
CREATE (:Track {id:303, title:"Yellow"});

// Relacionamentos
MATCH (t:Track {id:301}), (a:Artist {id:101}) CREATE (t)-[:PERFORMED_BY]->(a);
MATCH (t:Track {id:302}), (a:Artist {id:102}) CREATE (t)-[:PERFORMED_BY]->(a);
MATCH (t:Track {id:303}), (a:Artist {id:103}) CREATE (t)-[:PERFORMED_BY]->(a);

MATCH (t:Track {id:301}), (g:Genre {id:201}) CREATE (t)-[:IN_GENRE]->(g);
MATCH (t:Track {id:302}), (g:Genre {id:202}) CREATE (t)-[:IN_GENRE]->(g);
MATCH (t:Track {id:303}), (g:Genre {id:203}) CREATE (t)-[:IN_GENRE]->(g);

MATCH (u:User {id:1}), (t:Track {id:301}) CREATE (u)-[:LISTENED {times:5}]->(t);
MATCH (u:User {id:1}), (t:Track {id:303}) CREATE (u)-[:LIKED {rating:5}]->(t);
MATCH (u:User {id:1}), (a:Artist {id:103}) CREATE (u)-[:FOLLOWS]->(a);

MATCH (u:User {id:2}), (t:Track {id:302}) CREATE (u)-[:LISTENED {times:3}]->(t);
MATCH (u:User {id:2}), (t:Track {id:301}) CREATE (u)-[:LIKED {rating:4}]->(t);
MATCH (u:User {id:2}), (a:Artist {id:101}) CREATE (u)-[:FOLLOWS]->(a);
