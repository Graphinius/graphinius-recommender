import * as fs from 'fs';
import * as path from 'path';
import {TypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput, JSONGraph} from 'graphinius/lib/io/input/JSONInput';
import {buildIdxJSSearch} from '../../src/indexers/buildJSSearch';
import {jobsIdxConfig, jobsModels} from '../../src/indexers/jobs/interfaces';
import {jobsConfig} from '../../src/indexers/jobs/appConfig';

const
	graphFile = path.join(__dirname, '../../public/test-data/graphs/jobs.json'),
	NR_NODES = 305,
	NR_EDGES_DIR = 7628,
	NR_EDGES_UND = 0;


describe('jobs example tests - ', () => {

	let jobsGraph: TypedGraph = null;
	let jobsIdxs: any = null;
	let json: JSONGraph = null;
	const jsonIn = new JSONInput();


	beforeAll(() => {
		json = JSON.parse(fs.readFileSync(graphFile).toString());
		jobsGraph = jsonIn.readFromJSON(json, new TypedGraph('')) as TypedGraph;
		// jobsGraph = jsonIn.readFromJSONFile(graphFile, new TypedGraph('')) as TypedGraph;
		jobsIdxs = buildIdxJSSearch(jobsGraph, jobsIdxConfig);
	});


	beforeEach(async () => {
		// jobsGraph = jsonIn.readFromJSONFile(graphFile, new TypedGraph('')) as TypedGraph;
		expect(jobsGraph.nrNodes()).toBe(NR_NODES);
		expect(jobsGraph.nrDirEdges()).toBe(NR_EDGES_DIR);
		expect(jobsGraph.nrUndEdges()).toBe(NR_EDGES_UND);
	});


	it('should have built the right index', () => {
		for (let model in jobsModels) {
			expect(jobsIdxs[model]).toBeDefined;
		}
		expect(jobsIdxs[jobsModels.Company]._documents.length).toBe(50);
		expect(jobsIdxs[jobsModels.Country]._documents.length).toBe(25);
		expect(jobsIdxs[jobsModels.Person]._documents.length).toBe(200);
		expect(jobsIdxs[jobsModels.Skill]._documents.length).toBe(30);
	});


	it('gets the correct initial search results (IDs)', () => {
		let searchRes = jobsIdxs[jobsModels.Skill].search(jobsConfig.searchTerm);
		expect(searchRes.length).toBe(2);
		// expect(searchRes[0].name).toBe('Allguer Brauhaus AG Kempten');
		// expect(searchRes[1].name).toBe('Allguer Brauhaus AG Kempten, Brausttte Leuterschach');
		// expect(searchRes[2].name).toBe('Arcobrau Grafliches Brauhaus');
	});


	/**
	 * @describe all fixed values (IDs, names, etc) coming from neo4j...
	 */
	describe('FT Search INDEX tests - ', () => {

		it('gets the correct amount of IN & OUT links for Skill `Typescript`', () => {
			const
				searchRes = jobsIdxs[jobsModels.Skill].search(jobsConfig.searchTerm),
				id_a = '243',
				id_b = '260',
				a: TypedNode = jobsGraph.getNodeById(searchRes[0].id),
				b: TypedNode = jobsGraph.getNodeById(searchRes[1].id);


			expect(a.ins('HAS_SKILL').size).toBe(106);
			expect(a.ins('LOOKS_FOR_SKILL').size).toBe(23);

			expect(b.ins('HAS_SKILL').size).toBe(98);
			expect(b.ins('LOOKS_FOR_SKILL').size).toBe(25);
		});


		it.todo('should find the least skilled person');

	});

});

