import { IndexConfig, IndexEntryBody } from '../interfaces';

/**
 * Just for declaring available Models
 * 
 * @todo find more elegant solution (24/07/2019 -> too tired...)
 */
export enum beerModels {
  brewery     = 'brewery',
  beer        = 'beer',
  category    = 'category',
  city        = 'city',
  state       = 'state',
  country     = 'country',
  style       = 'style'
}

const beerIdxConfig: IndexConfig = {
	brewery: {
		string: 'brewery',
    id: 'id',
		fields: ['name', 'address1', 'phone', 'code', 'city', 'state', 'country']
	},
	beer: {
    string: 'beer',
    id: 'id',
		fields: ['name', 'abv']
	},
	category: {
		string: 'category',
    id: 'id',
		fields: ['category']
	},
	city: {
		string: 'city',
    id: 'id',
		fields: ['city', 'state', 'country']
	},
	state: {
		string: 'state',
    id: 'id',
		fields: ['state']
	},
	country: {
		string: 'country',
    id: 'id',
		fields: ['country']
	},
	style: {
		string: 'style',
    id: 'id',
		fields: ['style']
	}
};

export {
  beerIdxConfig
}