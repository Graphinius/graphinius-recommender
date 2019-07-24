import { IndexConfig } from '../interfaces';

/**
 * Just for declaring available Models
 * 
 * @todo find more elegant solution (24/07/2019 -> too tired...)
 */
export enum meetupModels {
  Group        = 'Group',
  Topic        = 'Topic',
  Member       = 'Member',
  Event        = 'Event'
}

const meetupIdxConfig: IndexConfig = {
	Group: {
    string: 'Group',
    id: 'id',
		fields: ['name', 'description', 'organiserName']
	},
	Topic: {
		string: 'Topic',
    id: 'id',
		fields: ['name', 'urlkey']
	},
	Member: {
		string: 'Member',
    id: 'id',
		fields: ['name']
	},
	Event: {
		string: 'Event',
    id: 'id',
		fields: ['name', 'description']
	}
};

export {
  meetupIdxConfig
}
