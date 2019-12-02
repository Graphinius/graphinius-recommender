import { IndexConfig, IndexEntryBody } from '../interfaces';

/**
 * Just for declaring available Models
 *
 * @todo find more elegant solution (24/07/2019 -> too tired...)
 */
export enum shopifyModels {
	tag 					= 'tag',
	vendor 				= 'vendor',
	product				= 'product',
	product_type 	= 'product_type'
}


const shopifyIdxConfig: IndexConfig = {
	tag: {
		string: 'tag',
		id: 'id',
		fields: ['name']
	},
	vendor: {
		string: 'vendor',
		id: 'id',
		fields: ['label']
	},
	product_type: {
		string: 'product_type',
		id: 'id',
		fields: ['label']
	},
	product: {
		string: 'product',
		id: 'id',
		fields: ['label', 'body_sanitized']
	}
};

export {
	shopifyIdxConfig
}