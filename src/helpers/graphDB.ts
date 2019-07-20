import { openDB, deleteDB, wrap, unwrap } from 'idb';

const GRAPH_DB_NAME = 'graphdb';

async function initDB() {
  const db = await openDB(GRAPH_DB_NAME, 1);

  return db;
}


export {
  initDB
}
