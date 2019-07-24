import { AppConfig } from '../interfaces';
import { meetupIdxConfig, meetupModels } from './interfaces';

const testGraphDir = `../test-data/graphs`;
const graphExt = `json`;

const meetupConfig: AppConfig = {
  graphName:  `meetupGraph`,
  graphFile: `${testGraphDir}/meetupGraph.${graphExt}`,
  searchTerm: `neo4j`,
  idxConfig: meetupIdxConfig,
  models: meetupModels,
  testSearchModel: meetupModels.Group
};

export {
  meetupConfig
}
