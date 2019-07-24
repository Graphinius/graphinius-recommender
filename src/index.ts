import * as $G from 'graphinius';

import { IGraph, BaseGraph } from 'graphinius/lib/core/Graph';
import { importGraphFromURL } from './common/importGraph';

import { IndexConfig } from './indexers/interfaces';
import { beerIdxConfig, beerModels } from './indexers/beer/interfaces';
import { meetupIdxConfig, meetupModels } from './indexers/meetup/interfaces';
import { buildIdxJSSearch } from './indexers/buildJSSearch';

const graphName = `meetupGraph`;
// const graphName = `beerGraph`;

const testGraphDir = `../test-data/graphs`;
const graphExt = `json`;
const graphFile = `${testGraphDir}/${graphName}.${graphExt}`;

const SEARCH_TERM = 'neo4j';
// const SEARCH_TERM = 'brau';



(async () => {
  console.log(`Loading ${graphName}...`);
  let tic = +new Date;
  const graph: IGraph = await getOrCreateGraph(graphFile);
  let toc = +new Date;
  console.log(`Importing graph of |V|=${graph.nrNodes()} and |E_dir|=${graph.nrDirEdges()} took ${toc-tic} ms.`);

  const indexes = createJSSearchIndex(graph, meetupIdxConfig);
})();



function createJSSearchIndex(graph: IGraph, idxConfig: IndexConfig) {
  let tic = +new Date;
  const indexes = buildIdxJSSearch(graph, idxConfig);
  let toc = +new Date;
  console.log(`Building Indexes in JS-SEARCH took ${toc-tic} ms.`)

  
  tic = +new Date;
  // let searchRes = indexes[beerModels.Brewery].search(SEARCH_TERM);
  let searchRes = indexes[meetupModels.Group].search(SEARCH_TERM);
  toc = +new Date;
  console.log(`Executing search query in JS-SEARCH took ${toc-tic} ms.`)

  console.log(`JS-SEARCH search on '${SEARCH_TERM}' returned ${Object.keys(searchRes).length} results.`);
  
  console.log(searchRes);
  

  /**
   * @todo abstract out into test case
   */
  indexes[meetupModels.Group].addDocuments([{
    id              : Number.MAX_VALUE,
    name            : "Bernies Meetup",
    description     : 'You dont wanna know.... but: neo4JJJJ!!',
    organiserName   : 'Bernie'
  }]);

  searchRes = indexes[meetupModels.Group].search(SEARCH_TERM);
  console.log(searchRes);


  /**
   * @todo abstract out into test case
   */
  // indexes[beerModels.Brewery].addDocuments([{
  //   id              : Number.MAX_VALUE,
  //   name            : "Berndicio's Brauhaus extra schtoak",
  //   address1        : 'Glacisstrasse 21, 8010 Graz',
  //   phone           : 123456,
  //   code            : 8010,
  //   city            : 'Grats',
  //   state           : 'Shire Mark',
  //   country         : 'Her-stare-ike'
  // }]);

  // searchRes = indexes[beerModels.Brewery].search(SEARCH_TERM);
  // console.log(searchRes);

  return indexes;
}


async function getOrCreateGraph(graphName: string) {
  let graph = await importGraphFromURL(graphFile);
  /* HACKETY HACK */
  window.$G = $G.default;
  window.graph = graph;

  return graph;
}



// import { similarGroupsRec } from './meetup/simpleGroupRecs';
// import { initDB, GRAPH_DB_NAME, STORE_NAME } from './common/idb';
// import { IDBPDatabase, IDBPObjectStore } from 'idb';


// let db : IDBPDatabase;
// let store   : IDBPObjectStore<unknown, ["graphs"], "graphs">;


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


/**
 * IDB (IndexedDB) helpers
 */
// async function getGraphFromIDB() {
//   const tx = db.transaction(STORE_NAME);
//   const store = tx.objectStore(STORE_NAME);
//   const graph: IGraph = await store.get(graphName);
//   await tx.done;
//   return graph;
// }


// async function addGraphToIDB(graph: IGraph) {
//   const tx = db.transaction(STORE_NAME, 'readwrite');
//   const store = tx.objectStore(STORE_NAME);
//   await store.add(graph, graphName).catch(e => console.log(e));
//   await tx.done;
//   return graph;
// }


// db = await initDB();  
// console.log(`IDB graph DB store initialized:`);
// console.log(db);


// const indexesLunr = createLunrIndex(graph);
// const indexesFuse = createFuseIndex(graph);
// const indexesJSSearch = createJSSearchIndex(graph);

// function createLunrIndex(graph: IGraph) {
//   let tic = +new Date;
//   const indexes = buildIndexesLunr(graph);
//   let toc = +new Date;
//   console.log(`Building Indexes in LUNR took ${toc-tic} ms.`)

//   let searchRes = indexes.groupIdx.search(SEARCH_TERM);
//   console.log(`LUNR search on '${SEARCH_TERM}' returned ${Object.keys(searchRes).length} results.`);

//   console.log(searchRes);

//   searchRes.forEach(res => {
//     let node = graph.getNodeById(res.ref);
//     console.log(node.getFeatures());
//   });

//   return indexes;
// }


// function createFuseIndex(graph: IGraph) {
//   let tic = +new Date;
//   const indexes = buildIndexesFuse(graph);
//   let toc = +new Date;
//   console.log(`Building Indexes in FUSE took ${toc-tic} ms.`)

//   let searchRes = indexes.groupIdx.search(SEARCH_TERM);
  
//   console.log(`FUSE search on '${SEARCH_TERM}' returned ${Object.keys(searchRes).length} results.`);
  
//   console.log(searchRes);
  
//   searchRes.forEach(res => {
//     if ( res['matches'].length ) {
//       let node = graph.getNodeById(res['item']);
//       console.log(node.getFeatures());
//     }
//   });

//   return indexes;
// }
