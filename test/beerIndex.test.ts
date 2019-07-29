import * as path from 'path';
import { IGraph } from 'graphinius/lib/core/Graph';
import { JSONInput} from 'graphinius/lib/io/input/JSONInput';
import { buildIdxJSSearch } from '../src/indexers/buildJSSearch';

import { beerIdxConfig, beerModels } from '../src/indexers/beer/interfaces';
import { beerConfig } from '../src/indexers/beer/appConfig';

// console.log(beerModels);

const graphFile = path.join(__dirname, '../public/test-data/graphs/beerGraph.json');


describe('Meetup example index tests', () => {

  let beerGraph: IGraph = null;
  let beerIdxs: any = null;
  const jsonIn = new JSONInput();

  beforeEach(async () => {
    beerGraph = jsonIn.readFromJSONFile(graphFile);
    // console.log(beerGraph.getStats());
    expect(beerGraph.nrNodes()).toBe(577);
    expect(beerGraph.nrDirEdges()).toBe(870);
    expect(beerGraph.nrUndEdges()).toBe(0);

    beerIdxs = buildIdxJSSearch(beerGraph, beerIdxConfig);
    for ( let model in beerModels ) {
      expect(beerIdxs[model]).toBeDefined;
    }
    expect(beerIdxs[beerModels.Brewery]._documents.length).toBe(49);
  });


  it('gets the correct initial search results', () => {
    let searchRes = beerIdxs[beerModels.Brewery].search(beerConfig.searchTerm);
    expect(searchRes.length).toBe(3);
    expect(searchRes[0].id).toBe(581267);
    expect(searchRes[1].id).toBe(581268);
    expect(searchRes[2].id).toBe(581289);
  });


  it('adds another document to the index', () => {
    let newDoc = {
      id              : Number.MAX_VALUE,
      name            : "Berndicio's Brauhaus extra schtoak",
      address1        : 'Glacisstrasse 21, 8010 Graz',
      phone           : 123456,
      code            : 8010,
      city            : 'Grats',
      state           : 'Shire Mark',
      country         : 'Her-stare-ike'
    };
    beerIdxs[beerModels.Brewery].addDocuments([newDoc]);
    let searchRes = beerIdxs[beerModels.Brewery].search(beerConfig.searchTerm);
    // console.log(searchRes);
    expect(searchRes).toContain(newDoc);
    // just to be absolutely sure
    let blaDoc = {...newDoc};
    blaDoc.id = 123;
    expect(searchRes).not.toContain(blaDoc);
  });

});

