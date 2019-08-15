import * as $G from 'graphinius';
/* HACKETY HACK */
window.$G = $G.default;

import { IGraph } from 'graphinius/lib/core/base/BaseGraph';
import { TypedGraph } from 'graphinius/lib/core/typed/TypedGraph';
import { importGraph } from './common/importGraph';

import { AppConfig } from './indexers/interfaces';
import { buildIdxJSSearch } from './indexers/buildJSSearch';

import { beerConfig } from './indexers/beer/appConfig';
import { jobsConfig } from './indexers/jobs/appConfig';
import { meetupConfig } from './indexers/meetup/appConfig';



(async () => {
  [jobsConfig].forEach(async config => { // , beerConfig , meetupConfig
    const graph: TypedGraph = await importGraph(config) as TypedGraph;
    const indexes = createJSSearchIndex(graph, config);
    const searchRes = executeSearch(indexes, config, graph);
  });
})();


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
