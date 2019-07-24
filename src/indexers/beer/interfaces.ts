import { IndexConfig, IndexEntryBody } from '../interfaces';

/**
 * Just for declaring available Models
 * 
 * @todo find more elegant solution (24/07/2019 -> too tired...)
 */
export enum beerModels {
  Brewery     = 'Brewery',
  Beer        = 'Beer',
  Category    = 'Category',
  City        = 'City',
  State       = 'State',
  Country     = 'Country',
  Style       = 'Style'
}

const beerIdxConfig: IndexConfig = {
	Brewery: {
		string: 'Brewery',
    id: 'id',
		fields: ['name', 'address1', 'phone', 'code', 'city', 'state', 'country']
	},
	Beer: {
    string: 'Beer',
    id: 'id',
		fields: ['name', 'abv']
	},
	Category: {
		string: 'Category',
    id: 'id',
		fields: ['category']
	},
	City: {
		string: 'City',
    id: 'id',
		fields: ['city', 'state', 'country']
	},
	State: {
		string: 'State',
    id: 'id',
		fields: ['state']
	},
	Country: {
		string: 'Country',
    id: 'id',
		fields: ['country']
	},
	Style: {
		string: 'Style',
    id: 'id',
		fields: ['style']
	}
};

export {
  beerIdxConfig
}