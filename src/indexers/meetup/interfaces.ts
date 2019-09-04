import { IndexConfig } from '../interfaces';

/**
 * Just for declaring available Models
 * 
 * @todo find more elegant solution (24/07/2019 -> too tired...)
 */
export enum meetupModels {
  group        = 'group',
  topic        = 'topic',
  member       = 'member',
  event        = 'event'
}

const meetupIdxConfig: IndexConfig = {
	group: {
    string: 'group',
    id: 'id',
		fields: ['name', 'description', 'organiserName']
	},
	topic: {
		string: 'topic',
    id: 'id',
		fields: ['name', 'urlkey']
	},
	member: {
		string: 'member',
    id: 'id',
		fields: ['name']
	},
	event: {
		string: 'event',
    id: 'id',
		fields: ['name', 'description']
	}
};

export {
  meetupIdxConfig
}
