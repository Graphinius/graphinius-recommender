



const neo4jMovieGraphInput = `
  MERGE (fahrenheit451:Book {title:'Fahrenheit 451'})
  MERGE (dune:Book {title:'Dune'})
  MERGE (hungerGames:Book {title:'The Hunger Games'})
  MERGE (nineteen84:Book {title:'1984'})
  MERGE (gatsby:Book {title:'The Great Gatsby'})

  MERGE (scienceFiction:Genre {name: "Science Fiction"})
  MERGE (fantasy:Genre {name: "Fantasy"})
  MERGE (dystopia:Genre {name: "Dystopia"})
  MERGE (classics:Genre {name: "Classics"})

  MERGE (fahrenheit451)-[:HAS_GENRE]->(dystopia)
  MERGE (fahrenheit451)-[:HAS_GENRE]->(scienceFiction)
  MERGE (fahrenheit451)-[:HAS_GENRE]->(fantasy)
  MERGE (fahrenheit451)-[:HAS_GENRE]->(classics)

  MERGE (hungerGames)-[:HAS_GENRE]->(scienceFiction)
  MERGE (hungerGames)-[:HAS_GENRE]->(fantasy)
  MERGE (hungerGames)-[:HAS_GENRE]->(romance)

  MERGE (nineteen84)-[:HAS_GENRE]->(scienceFiction)
  MERGE (nineteen84)-[:HAS_GENRE]->(dystopia)
  MERGE (nineteen84)-[:HAS_GENRE]->(classics)

  MERGE (dune)-[:HAS_GENRE]->(scienceFiction)
  MERGE (dune)-[:HAS_GENRE]->(fantasy)
  MERGE (dune)-[:HAS_GENRE]->(classics)

  MERGE (gatsby)-[:HAS_GENRE]->(classics)
`