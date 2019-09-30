import * as $G from 'graphinius';
console.log('Graphinius: ', $G);
/* HACKETY HACK */
window.$G = $G.default;

import { IGraph } from 'graphinius/lib/core/base/BaseGraph';
import { TypedGraph } from 'graphinius/lib/core/typed/TypedGraph';
import { ComputeGraph } from 'graphinius/lib/core/compute/ComputeGraph';
import { BFS } from 'graphinius/lib/search/BFS';
import { DFS } from 'graphinius/lib/search/DFS';
import { PFS } from 'graphinius/lib/search/PFS';
import { Pagerank } from 'graphinius/lib/centralities/Pagerank';
import { importGraph } from './common/importGraph';
import {TheExpanse} from '../src/recommender/TheExpanse';

import { AppConfig } from './indexers/interfaces';
import { buildIdxJSSearch } from './indexers/buildJSSearch';

import { beerConfig } from './indexers/beer/appConfig';
import { jobsConfig } from './indexers/jobs/appConfig';
import { meetupConfig } from './indexers/meetup/appConfig';
import { northwindConfig } from './indexers/northwind/appConfig';

import * as $comSim from 'graphinius/lib/similarities/SimilarityCommons';
import * as $setSim from 'graphinius/lib/similarities/SetSimilarities';
import * as $scoSim from 'graphinius/lib/similarities/ScoreSimilarities';


/* HACKETY HACK */
window.comSim = $comSim;
window.setSim = $setSim;
window.scoSim = $scoSim;


(() => {
  [jobsConfig].forEach(async config => { // jobsConfig , northwindConfig , beerConfig , meetupConfig
    const graph: TypedGraph = await importGraph(config) as TypedGraph;
    window.ex = new TheExpanse(graph);
    const indexes = createJSSearchIndex(graph, config);
    const searchRes = executeSearch(indexes, config, graph);
    testBDPFS(graph);
    testPagerank(graph);
    await testTransitivityCc(graph);
  });
})();


function testBDPFS(g: IGraph) {
  let tic, toc;
  [BFS, DFS, PFS].forEach(traversal => {
    tic = +new Date;
    traversal(g, g.getRandomNode());
    toc = +new Date;
    console.log(`${traversal.name} on ${g.label} graph took ${toc-tic} ms.`);
  });
}


function testPagerank(g: IGraph) {
  const PR = new Pagerank(g, {normalize: true, epsilon: 1e-6});
  const tic = +new Date;
  PR.computePR();
  const toc = +new Date;
  console.log(`Pagerank on ${g.label} graph took ${toc-tic} ms.`);
}


async function testTransitivityCc(g) {
  let tic, toc;
  const cg = new ComputeGraph(g, window.tf);
  // console.log(`TF backend is: ${window.tf.getBackend()}`); // -> undefined !?

  tic = +new Date;
  await cg.clustCoef(true);
  toc = +new Date;
  console.log(`Clustering coefficient on ${g.label} graph took ${toc-tic} ms.`);

  tic = +new Date;
  await cg.transitivity(true);
  toc = +new Date;
  console.log(`Transitivity on ${g.label} graph took ${toc-tic} ms.`);
}


function createJSSearchIndex(graph: IGraph, config: AppConfig) {
  let tic = +new Date;
  const indexes = buildIdxJSSearch(graph, config.idxConfig);
  let toc = +new Date;
  console.log(`Building Indexes in JS-SEARCH took ${toc-tic} ms.`);
  return indexes;
}


function executeSearch(indexes, config: AppConfig, graph: TypedGraph) {
  let tic = +new Date;
  const searchRes = indexes[config.searchModel].search(config.searchTerm);
  let toc = +new Date;
  console.log(`executing search for '${config.searchTerm}' in JS-SEARCH took ${toc-tic} ms.`);

  console.log(searchRes);

  searchRes.forEach(res => {
    console.log(graph.getNodeById(res.id));
  });

  return searchRes;
}
