import * as fs from 'fs';
import * as path from 'path';
import {TypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput, JSONGraph} from 'graphinius/lib/io/input/JSONInput';
import {buildIdxJSSearch} from '../../src/indexers/buildJSSearch';
import {beerIdxConfig, beerModels} from '../../src/indexers/beer/interfaces';
import {beerConfig} from '../../src/indexers/beer/appConfig';

const graphFile = path.join(__dirname, '../../public/test-data/graphs/beer.json');


describe('BEER example index tests', () => {

	let beerGraph: TypedGraph = null;
	let beerIdxs: any = null;
	let json: JSONGraph = null;
	const jsonIn = new JSONInput();


	beforeEach(async () => {
		json = JSON.parse(fs.readFileSync(graphFile).toString());
		beerGraph = jsonIn.readFromJSON(json, new TypedGraph('')) as TypedGraph;
		// console.log(beerGraph.getStats());
		expect(beerGraph.nrNodes()).toBe(577);
		expect(beerGraph.nrDirEdges()).toBe(870);
		expect(beerGraph.nrUndEdges()).toBe(0);

		beerIdxs = buildIdxJSSearch(beerGraph, beerIdxConfig);
		for (let model in beerModels) {
			expect(beerIdxs[model]).toBeDefined;
		}
		expect(beerIdxs[beerModels.brewery]._documents.length).toBe(49);
	});


	it('gets the correct initial search results (IDs)', () => {
		let searchRes = beerIdxs[beerModels.brewery].search(beerConfig.searchTerm);
		expect(searchRes.length).toBe(3);
		expect(searchRes[0].name).toBe('Allguer Brauhaus AG Kempten');
		expect(searchRes[1].name).toBe('Allguer Brauhaus AG Kempten, Brausttte Leuterschach');
		expect(searchRes[2].name).toBe('Arcobrau Grafliches Brauhaus');
	});


	it('adds another document to the index', () => {
		let newDoc = {
			id: Number.MAX_VALUE,
			name: "Berndicio's Brauhaus extra schtoak",
			address1: 'Glacisstrasse 21, 8010 Graz',
			phone: 123456,
			code: 8010,
			city: 'Grats',
			state: 'Shire Mark',
			country: 'Her stare ike'
		};
		beerIdxs[beerModels.brewery].addDocuments([newDoc]);
		let searchRes = beerIdxs[beerModels.brewery].search(beerConfig.searchTerm);
		// console.log(searchRes);
		expect(searchRes).toContain(newDoc);
		// just to be absolutely sure
		let blaDoc = {...newDoc};
		blaDoc.id = 123;
		expect(searchRes).not.toContain(blaDoc);
	});


	describe('typed node neighbor tests for beerGraph', () => {

		it('gets the correct amount of IN & OUT links for some Brauhauses', () => {
			let searchRes = beerIdxs[beerModels.brewery].search(beerConfig.searchTerm);
			expect(searchRes.length).toBe(3);
			const a: TypedNode = beerGraph.getNodeById(searchRes[0].id);
			expect(a.ins('BREWED_AT').size).toBe(3);
			expect(a.outs('LOC_CITY').size).toBe(1);
			const b: TypedNode = beerGraph.getNodeById(searchRes[1].id) as TypedNode;
			expect(b.ins('BREWED_AT').size).toBe(1);
			expect(b.outs('LOC_CITY').size).toBe(1);
			const c: TypedNode = beerGraph.getNodeById(searchRes[2].id) as TypedNode;
			expect(c.ins('BREWED_AT').size).toBe(1);
			expect(c.outs('LOC_CITY').size).toBe(1);
		});

	});

});

