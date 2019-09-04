import { AppConfig } from '../interfaces';
import { jobsIdxConfig, jobsModels } from './interfaces';

const testGraphDir = `../test-data/graphs`;
const graphExt = `json`;

const jobsConfig: AppConfig = {
	graphName:  `jobs`,
	graphFile: `${testGraphDir}/jobs.${graphExt}`,
	searchTerm: `TypeScript`,
	idxConfig: jobsIdxConfig,
	models: jobsModels,
	searchModel: jobsModels.skill
};


export {
	jobsConfig
}
