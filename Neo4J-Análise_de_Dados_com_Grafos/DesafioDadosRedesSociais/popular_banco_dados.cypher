// Constraints
CREATE CONSTRAINT user_id_unique IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE;
CREATE CONSTRAINT post_id_unique IF NOT EXISTS FOR (p:Post) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT comment_id_unique IF NOT EXISTS FOR (c:Comment) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT hashtag_id_unique IF NOT EXISTS FOR (h:Hashtag) REQUIRE h.name IS UNIQUE;
CREATE CONSTRAINT group_id_unique IF NOT EXISTS FOR (g:Group) REQUIRE g.id IS UNIQUE;

// Usuários
CREATE (:User {id:1, name:"Alice"});
CREATE (:User {id:2, name:"Bruno"});
CREATE (:User {id:3, name:"Carla"});
CREATE (:User {id:4, name:"Daniel"});
CREATE (:User {id:5, name:"Eva"});

// Grupos
CREATE (:Group {id:101, name:"Tech Enthusiasts"});
CREATE (:Group {id:102, name:"Movie Fans"});

// Hashtags
CREATE (:Hashtag {name:"#AI"});
CREATE (:Hashtag {name:"#Cinema"});
CREATE (:Hashtag {name:"#Startups"});

// Posts
CREATE (:Post {id:201, content:"Explorando IA em 2026", timestamp:datetime("2026-01-15T10:00:00")});
CREATE (:Post {id:202, content:"Melhores filmes de 2025", timestamp:datetime("2026-01-20T14:00:00")});

// Comentários
CREATE (:Comment {id:301, content:"Muito interessante!", timestamp:datetime("2026-01-15T11:00:00")});
CREATE (:Comment {id:302, content:"Concordo totalmente!", timestamp:datetime("2026-01-20T15:00:00")});

// Relacionamentos
MATCH (u1:User {id:1}), (u2:User {id:2}) CREATE (u1)-[:FOLLOWS]->(u2);
MATCH (u:User {id:1}), (p:Post {id:201}) CREATE (u)-[:POSTED]->(p);
MATCH (u:User {id:2}), (p:Post {id:202}) CREATE (u)-[:POSTED]->(p);
MATCH (u:User {id:3}), (c:Comment {id:301}) CREATE (u)-[:COMMENTED]->(c);
MATCH (u:User {id:4}), (c:Comment {id:302}) CREATE (u)-[:COMMENTED]->(c);
MATCH (u:User {id:5}), (p:Post {id:201}) CREATE (u)-[:LIKED {timestamp:datetime("2026-01-15T12:00:00")}]->(p);
MATCH (u:User {id:3}), (c:Comment {id:302}) CREATE (u)-[:LIKED {timestamp:datetime("2026-01-20T16:00:00")}]->(c);
MATCH (p:Post {id:201}), (h:Hashtag {name:"#AI"}) CREATE (p)-[:TAGGED]->(h);
MATCH (p:Post {id:202}), (h:Hashtag {name:"#Cinema"}) CREATE (p)-[:TAGGED]->(h);
MATCH (u:User {id:1}), (g:Group {id:101}) CREATE (u)-[:MEMBER_OF]->(g);
MATCH (u:User {id:2}), (g:Group {id:102}) CREATE (u)-[:MEMBER_OF]->(g);
