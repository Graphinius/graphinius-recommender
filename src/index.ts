import * as $G from 'graphinius';
window.$G = $G.default;

import { IGraph, BaseGraph } from 'graphinius/lib/core/Graph';
import { importGraphFromURL } from './helpers/importGraph';
import { similarGroupsRec } from './meetup/simpleGroupRecs';
import { initDB } from './helpers/graphDB';
import { IDBPDatabase } from 'idb';


const testDataDir = `../test-data`;
const graphExt = `json`;
const graphName = `meetupGraph`;
const meetupFile = `${testDataDir}/${graphName}.${graphExt}`;

let graphdb : IDBPDatabase;


(async () => {
  
  graphdb = await initDB();
  console.log(`IDB graph DB initialized:`);
  console.log(graphdb);

  await getOrCreateGraph(meetupFile);
  console.log(`Imported Meetup graph`);
})();


async function getOrCreateGraph(graphName: string) {

  let graph = await importGraphFromURL(meetupFile);

  /* HACKETY HACK */
  window.graph = graph;
  return graph;
}

