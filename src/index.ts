import { IGraph, BaseGraph } from 'graphinius/lib/core/Graph';
import { importGraphFromURL } from './helpers/importGraph';
import { similarGroupsRecommender } from './meetup/simpleGroupRecs';
import { initDB } from './helpers/graphDB';
import { IDBPDatabase } from 'idb';

const testDataDir = `../public/test-data`;
const graphExt = `json`;
const graphName = `meetupGraph`;
const meetupFile = `${testDataDir}/${graphName}.${graphExt}`;

let graphdb : IDBPDatabase;

(async () => {
  graphdb = await initDB();
  console.log(graphdb);

  await getOrCreateGraph(meetupFile);

})();


async function getOrCreateGraph(graphName: string) {

  let graph = await importGraphFromURL(meetupFile);

  /* HACKETY HACK */
  window.graph = graph;
  return graph;
}
