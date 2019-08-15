import { AppConfig } from '../interfaces';
import { skillsIdxConfig, skillsModels } from './interfaces';

const testGraphDir = `../test-data/graphs`;
const graphExt = `json`;

const skillsConfig: AppConfig = {
	graphName:  `skills`,
	graphFile: `${testGraphDir}/skills.${graphExt}`,
	searchTerm: `TypeScript`,
	idxConfig: skillsIdxConfig,
	models: skillsModels,
	testSearchModel: skillsModels.Skill
};


export {
	skillsConfig
}
