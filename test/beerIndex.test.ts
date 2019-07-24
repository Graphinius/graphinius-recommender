import { IGraph } from 'graphinius/lib/core/Graph';
import { importGraph } from '../src/common/importGraph';
import { buildIdxJSSearch } from '../src/indexers/buildJSSearch';

import { beerConfig } from '../src/indexers/beer/appConfig';


describe('Meetup example index tests', () => {

  let beerGraph: IGraph;

  beforeEach(async () => {
    beerGraph = await importGraph(beerConfig);
    console.log(beerGraph.getStats());
  });

});

  
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

