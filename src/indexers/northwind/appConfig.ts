import { AppConfig } from '../interfaces';
import { nwModels, nwIdxConfig } from './interfaces';

const testGraphDir = `../test-data/graphs`;
const graphExt = `json`;

const northwindConfig: AppConfig = {
	graphName:  `northwind`,
	graphFile: `${testGraphDir}/northwind.${graphExt}`,
	searchTerm: `apple`,
	idxConfig: nwIdxConfig,
	models: nwIdxConfig,
	searchModel: nwModels.product
};

export {
	northwindConfig
}
