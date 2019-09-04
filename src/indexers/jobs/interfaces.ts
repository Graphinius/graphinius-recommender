import {IndexConfig} from '../interfaces';

export enum jobsModels {
	person 	= 'person',
	company = 'company',
	country = 'country',
	skill 	= 'skill'
}

const jobsIdxConfig: IndexConfig = {
	company: {
		string: 'company',
		id: 'id',
		fields: ['name', 'desc']
	},
	country: {
		string: 'country',
		id: 'id',
		fields: ['name']
	},
	person: {
		string: 'person',
		id: 'id',
		fields: ['name', 'age']
	},
	skill: {
		string: 'skill',
		id: 'id',
		fields: ['name']
	}
};

export {
	jobsIdxConfig
}
