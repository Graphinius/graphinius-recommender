import * as $G from 'graphinius';
/* HACKETY HACK */
window.$G = $G.default;

import { IGraph } from 'graphinius/lib/core/Graph';
import { importGraph } from './common/importGraph';

import { AppConfig } from './indexers/interfaces';

import { buildIdxJSSearch } from './indexers/buildJSSearch';
import { beerConfig } from './indexers/beer/appConfig';
import { meetupConfig } from './indexers/meetup/appConfig';



(async () => {
  [beerConfig].forEach(async config => { // , meetupConfig
    const graph = await importGraph(config);
    const indexes = createJSSearchIndex(graph, config);
    const searchRes = executeSearch(indexes, config);
  });
})();


function createJSSearchIndex(graph: IGraph, config: AppConfig) {
  let tic = +new Date;
  const indexes = buildIdxJSSearch(graph, config.idxConfig);
  let toc = +new Date;
  console.log(`Building Indexes in JS-SEARCH took ${toc-tic} ms.`);
  return indexes;
}


function executeSearch(indexes, config: AppConfig) {
  let tic = +new Date;
  const searchRes = indexes[config.testSearchModel].search(config.searchTerm);
  let toc = +new Date;
  console.log(`executing search for '${config.searchTerm}' in JS-SEARCH took ${toc-tic} ms.`);

  console.log(searchRes);

  return searchRes;
}
