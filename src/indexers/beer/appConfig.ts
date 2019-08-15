import { AppConfig } from '../interfaces';
import { beerIdxConfig, beerModels } from './interfaces';

const testGraphDir = `../test-data/graphs`;
const graphExt = `json`;

const beerConfig: AppConfig = {
  graphName:  `beer`,
  graphFile: `${testGraphDir}/beer.${graphExt}`,
  searchTerm: `brauhaus`,
  idxConfig: beerIdxConfig,
  models: beerModels,
  searchModel: beerModels.Brewery
};


export {
  beerConfig
}
