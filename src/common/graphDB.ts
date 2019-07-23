import { openDB, deleteDB, wrap, unwrap } from 'idb';

export const GRAPH_DB_NAME = 'graphdb';
export const STORE_NAME = 'graphs';


async function initDB() {

  const db = await openDB(GRAPH_DB_NAME, 1, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const graphStore = db.createObjectStore(STORE_NAME, {keyPath: 'name'})
    },
    blocked() {
      console.log('IDB blocked...');
    },
    blocking() {
      console.log('IDB blocking...');
    }
  });

  // const store = db.transaction(STORE_NAME).objectStore(STORE_NAME)
  // return store;
  return db;
}


export {
  initDB
}

