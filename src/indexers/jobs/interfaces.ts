import {IndexConfig} from '../interfaces';

export enum jobsModels {
	Person 	= 'Person',
	Company = 'Company',
	Country = 'Country',
	Skill 	= 'Skill'
}

const jobsIdxConfig: IndexConfig = {
	Company: {
		string: 'Company',
		id: 'id',
		fields: ['name', 'desc']
	},
	Country: {
		string: 'Country',
		id: 'id',
		fields: ['name']
	},
	Person: {
		string: 'Person',
		id: 'id',
		fields: ['name', 'age']
	},
	Skill: {
		string: 'Skill',
		id: 'id',
		fields: ['name']
	}
};

export {
	jobsIdxConfig
}
