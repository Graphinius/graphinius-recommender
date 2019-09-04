import { AppConfig } from '../interfaces';
import { meetupIdxConfig, meetupModels } from './interfaces';

const testGraphDir = `../test-data/graphs`;
const graphExt = `json`;

const meetupConfig: AppConfig = {
  graphName:  `meetup`,
  graphFile: `${testGraphDir}/meetup.${graphExt}`,
  searchTerm: `neo4j`,
  idxConfig: meetupIdxConfig,
  models: meetupModels,
  searchModel: meetupModels.group
};

export {
  meetupConfig
}
