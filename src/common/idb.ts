import { IGraph } from 'graphinius';
import { AppConfig } from '../indexers/interfaces';
import { openDB, deleteDB, wrap, unwrap } from 'idb';

export const GRAPH_DB_NAME = 'graphdb';
export const STORE_NAME = 'graphs';

let db      : IDBDatabase;
// let store   : IDBPObjectStore<unknown, ["graphs"], "graphs">;


async function initDB() {

  return await openDB(GRAPH_DB_NAME, 1, {
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

}


async function getGraphFromIDB(config: AppConfig) {
  const tx = db.transaction(STORE_NAME);
  const store = tx.objectStore(STORE_NAME);
  const graph: IGraph = await store.get(config.graphName).result;
  // await tx.done;
  return graph;
}


async function addGraphToIDB(graph: IGraph, config: AppConfig) {
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.add(graph, config.graphName);
  // await tx.done;
  return graph;
}


export {
  initDB
}


// let graph: IGraph = await getGraphFromIDB();
// console.log('Graph vom IDB:', graph);

// if ( graph ) {
//   console.log(`RETRIEVED Meetup graph from IDB`);
// }
// else {
//   graph = await importGraphFromURL(meetupFile);
//   console.log(`CREATED Meetup graph from JSON`);
//   // await addGraphToIDB(graph);
// }


// db = await initDB();  
// console.log(`IDB graph DB store initialized:`);
// console.log(db);
