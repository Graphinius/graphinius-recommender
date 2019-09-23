import * as $G from 'graphinius';
/* HACKETY HACK */
window.$G = $G.default;

import { IGraph } from 'graphinius/lib/core/base/BaseGraph';
import { TypedGraph } from 'graphinius/lib/core/typed/TypedGraph';
import { ComputeGraph } from 'graphinius/lib/core/compute/ComputeGraph';
import { importGraph } from './common/importGraph';

import { AppConfig } from './indexers/interfaces';
import { buildIdxJSSearch } from './indexers/buildJSSearch';

import { beerConfig } from './indexers/beer/appConfig';
import { jobsConfig } from './indexers/jobs/appConfig';
import { meetupConfig } from './indexers/meetup/appConfig';

import * as $comSim from 'graphinius/lib/similarities/SimilarityCommons';
import * as $setSim from 'graphinius/lib/similarities/SetSimilarities';
import * as $scoSim from 'graphinius/lib/similarities/ScoreSimilarities';

/* HACKETY HACK */
window.comSim = $comSim;
window.setSim = $setSim;
window.scoSim = $scoSim;


/**
 * @description sharedPrefSimilarity between Person-Skills & Company->Skills
 comSim.viaSharedPrefs(g, setSim.simFuncs.jaccard, {
    t1: 'Person',
    t2: 'Company',
    d1: 'outs',
    d2: 'outs',
    e1: 'HAS_SKILL',
    e2: 'LOOKS_FOR_SKILL'
  });
*/


(() => {
  [jobsConfig].forEach(async config => { // jobsConfig , beerConfig , meetupConfig
    const graph: TypedGraph = await importGraph(config) as TypedGraph;
    const indexes = createJSSearchIndex(graph, config);
    const searchRes = executeSearch(indexes, config, graph);
    await transitivity_cc(graph);
  });
})();


async function transitivity_cc(g) {
  const cg = new ComputeGraph(g, window.tf);
  // console.log(`TF backend is: ${window.tf.getBackend()}`); // -> undefined !?
  let tic = +new Date;
  await cg.transitivity();
  let toc = +new Date;
  console.log(`Transitivity took ${toc-tic} ms.`);
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
