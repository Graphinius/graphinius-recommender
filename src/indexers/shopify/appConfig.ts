import { AppConfig } from '../interfaces';
import { shopifyIdxConfig, shopifyModels } from './interfaces';

const testGraphDir = `../test-data/graphs`;
const graphs = [
	'hauslondon',
	'mvmtwatches',
	'skinnydip'
];
const graph = graphs[0];
const graphExt = `json`;


const shopifyConfig: AppConfig = {
	graphName: graph,
	graphFile: `${testGraphDir}/${graph}.${graphExt}`,
	searchTerm: `swan`,
	idxConfig: shopifyIdxConfig,
	models: shopifyModels,
	searchModel: shopifyModels.product
};


export {
	shopifyConfig
}
