import { IGraph, BaseGraph } from 'graphinius/lib/core/Graph';
import { importGraphFromURL } from './helpers/importGraph';
import { similarGroupsRecommender } from './meetup/simpleGroupRecs';

const testDataDir = `../public/test-data`;
const graphExt = `json`;
const graphName = `meetupGraph`;
const meetupFile = `${testDataDir}/${graphName}.${graphExt}`;


(async () => {

  await getOrCreateGraph(meetupFile);

})();


async function getOrCreateGraph(graphName: string) {
  // let graph = window.localStorage.getItem(graphName) as IGraph;
  // if ( !graph ) {
  //   graph = await importGraphFromURL(meetupFile);
  //   console.log(mug.getStats());
  // }

  let graph = await importGraphFromURL(meetupFile);

  /* HACKETY HACK */
  window.graph = graph;
  return graph;
}
