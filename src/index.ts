import * as $G from 'graphinius';

import { IGraph, BaseGraph } from 'graphinius/lib/core/Graph';
import { importGraphFromURL } from './common/importGraph';
import {  buildIndexes } from './common/meetupIndexes';
import { similarGroupsRec } from './meetup/simpleGroupRecs';
import { initDB, GRAPH_DB_NAME, STORE_NAME } from './common/graphDB';
import { IDBPDatabase, IDBPObjectStore } from 'idb';

const testDataDir = `../test-data`;
const graphExt = `json`;
const graphName = `meetupGraph`;
const meetupFile = `${testDataDir}/${graphName}.${graphExt}`;

let db : IDBPDatabase;
let store   : IDBPObjectStore<unknown, ["graphs"], "graphs">;


(async () => {
  console.log(`Loading Meetup graph...`);
  let tic = +new Date;
  const mug: IGraph = await getOrCreateGraph(meetupFile);
  let toc = +new Date;
  console.log(`Importing graph of |V|=${mug.nrNodes()} and |E_dir|=${mug.nrDirEdges()} took ${toc-tic} ms.`);

  tic = +new Date;
  const indexes = buildIndexes(mug);
  toc = +new Date;
  console.log(`Building Indexes in LUNR took ${toc-tic} ms.`)

  let searchRes = indexes.groupIdx.search('neo4j');
  searchRes.forEach(res => {
    let node = mug.getNodeById(res.ref);
    console.log(node.getFeatures());
  })
})();


async function getOrCreateGraph(graphName: string) {
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

  let graph = await importGraphFromURL(meetupFile);
  /* HACKETY HACK */
  window.$G = $G.default;
  window.graph = graph;

  return graph;
}



async function getGraphFromIDB() {
  const tx = db.transaction(STORE_NAME);
  const store = tx.objectStore(STORE_NAME);
  const graph: IGraph = await store.get(graphName);
  await tx.done;
  return graph;
}


async function addGraphToIDB(graph: IGraph) {
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.add(graph, graphName).catch(e => console.log(e));
  await tx.done;
  return graph;
}



  // db = await initDB();  
  // console.log(`IDB graph DB store initialized:`);
  // console.log(db);