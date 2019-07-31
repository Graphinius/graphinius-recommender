import { AppConfig } from '../interfaces';
import { beerIdxConfig, beerModels } from './interfaces';

const testGraphDir = `../test-data/graphs`;
const graphExt = `json`;

const beerConfig: AppConfig = {
  graphName:  `beerGraph`,
  graphFile: `${testGraphDir}/beerGraph.${graphExt}`,
  searchTerm: `brauhaus`,
  idxConfig: beerIdxConfig,
  models: beerModels,
  testSearchModel: beerModels.Brewery
};


export {
  beerConfig
}
