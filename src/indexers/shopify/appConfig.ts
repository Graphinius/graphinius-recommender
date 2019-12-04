import { AppConfig } from '../interfaces';
import { shopifyIdxConfig, shopifyModels } from './interfaces';

const testGraphDir = `../test-data/graphs`;
const graphs = [
	'hauslondon',
	'www.mvmtwatches',
	'skinnydiplondon'
];
const graph = graphs[1];
const graphExt = `json`;


const shopifyConfig: AppConfig = {
	graphName: graph,
	graphFile: `${testGraphDir}/${graph}.com.${graphExt}`,
	searchTerm: `caramel`,
	idxConfig: shopifyIdxConfig,
	models: shopifyModels,
	searchModel: shopifyModels.product
};


export {
	shopifyConfig
}
