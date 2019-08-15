import {IndexConfig} from '../interfaces';

export enum skillsModels {
	Person 	= 'Person',
	Company = 'Company',
	Country = 'Country',
	Skill 	= 'Skill'
}

const skillsIdxConfig: IndexConfig = {
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
	skillsIdxConfig
}