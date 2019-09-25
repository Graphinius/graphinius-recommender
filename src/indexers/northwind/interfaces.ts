import {IndexConfig} from '../interfaces';

/**
 * declaring available Models
 */
export enum nwModels {
	category = 'category',
	product = 'product',
	customer = 'customer',
	supplier = 'supplier',
	employee = 'employee',
	order = 'order',
}

const nwIdxConfig: IndexConfig = {
	category: {
		string: nwModels.category,
		id: 'id',
		fields: ['name', 'description']
	},
	product: {
		string: nwModels.product,
		id: 'id',
		fields: ['name']
	},
	customer: {
		string: nwModels.customer,
		id: 'id',
		fields: ['name', 'contact', 'ctitle', 'address', 'city', 'region', 'postalCode', 'country', 'phone', 'fax']
	},
	supplier: {
		string: nwModels.supplier,
		id: 'id',
		fields: ['name', 'contact', 'ctitle', 'address', 'city', 'region', 'postalCode', 'country', 'phone', 'fax', 'homePage']
	},
	employee: {
		string: nwModels.employee,
		id: 'id',
		fields: ['lastName', 'firstName', 'title', 'titleOfCourtesy', 'birthDate', 'address', 'city', 'region', 'postalCode', 'country', 'homePhone', 'notes']
	},
	order: {
		string: nwModels.order,
		id: 'id',
		fields: ['orderDate', 'requiredDate', 'shippedDate', 'shipVia', 'freight', 'shipName', 'shipAddress', 'shipCity', 'shipRegion', 'shipPostalCode', 'shipCountry']
	}
};

export {
	nwIdxConfig
}
