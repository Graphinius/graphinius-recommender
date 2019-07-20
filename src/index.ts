import { IGraph, BaseGraph } from 'graphinius/lib/core/Graph';
import { importGraphFromURL } from './helpers/importGraph';
import { similarGroupsRecommender } from './meetup/simpleGroupRecs';
import { GraphStore } from './helpers/graphDB';

const testDataDir = `../public/test-data`;
const graphExt = `json`;
const graphName = `meetupGraph`;
const meetupFile = `${testDataDir}/${graphName}.${graphExt}`;

const meetupGraph = new GraphStore('meetup');

(async () => {

  await getOrCreateGraph(meetupFile);

})();


async function getOrCreateGraph(graphName: string) {
  let mug = await meetupGraph.load();
  console.log('Meetup graph from Dexie DB: ', mug);

  let graph = await importGraphFromURL(meetupFile);

  /* HACKETY HACK */
  window.graph = graph;
  return graph;
}
