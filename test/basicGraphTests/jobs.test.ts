import * as fs from 'fs';
import * as path from 'path';
import {TypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput, JSONGraph} from 'graphinius/lib/io/input/JSONInput';
import {buildIdxJSSearch} from '../../src/indexers/buildJSSearch';
import {jobsIdxConfig, jobsModels} from '../../src/indexers/jobs/interfaces';
import {jobsConfig} from '../../src/indexers/jobs/appConfig';
import { BaseGraph } from 'graphinius/lib/core/base/BaseGraph';

// import {Logger} from 'graphinius/lib/utils/Logger';
// const logger = new Logger();


enum NODE_TYPES {
	Person = "PERSON",
	Company = "COMPANY",
	Country = "COUNTRY",
	Skill = "SKILL"
}

enum EDGE_TYPES {
	HasSkill = "HAS_SKILL",
	WorksFor = "WORKS_FOR",
	Knows = "KNOWS",
	LooksForSkill = "LOOKS_FOR_SKILL"
}


const
	graphFile = path.join(__dirname, '../../public/test-data/graphs/jobs.json'),
	NR_NODES = 305,
	NR_EDGES_DIR = 7628,
	NR_EDGES_UND = 0;


describe('jobs example tests - ', () => {

	let g: TypedGraph = null;
	let idx: any = null;
	let json: JSONGraph = null;
	const jsonIn = new JSONInput();


	beforeAll(() => {
		json = JSON.parse(fs.readFileSync(graphFile).toString());
		g = jsonIn.readFromJSON(json, new TypedGraph('')) as TypedGraph;
		idx = buildIdxJSSearch(g, jobsIdxConfig);
	});


	beforeEach(async () => {
		// jobsGraph = jsonIn.readFromJSONFile(graphFile, new TypedGraph('')) as TypedGraph;
		expect(g.nrNodes()).toBe(NR_NODES);
		expect(g.nrDirEdges()).toBe(NR_EDGES_DIR);
		expect(g.nrUndEdges()).toBe(NR_EDGES_UND);
	});


	it('should have built the right index', () => {
		for (let model in jobsModels) {
			expect(idx[model]).toBeDefined;
		}
		expect(idx[jobsModels.Company]._documents.length).toBe(50);
		expect(idx[jobsModels.Country]._documents.length).toBe(25);
		expect(idx[jobsModels.Person]._documents.length).toBe(200);
		expect(idx[jobsModels.Skill]._documents.length).toBe(30);
	});


	it('gets the correct initial search results (IDs)', () => {
		let searchRes = idx[jobsModels.Skill].search(jobsConfig.searchTerm);
		expect(searchRes.length).toBe(2);
		searchRes.forEach(item => expect(item.name).toBe('TypeScript'));
	});


	/**
	 * @describe all fixed values (IDs, names, etc) coming from neo4j...
	 */
	describe('FT Search INDEX tests - ', () => {

		it('gets the correct amount of IN & OUT links for Skill `Typescript`', () => {
			const
				searchRes = idx[jobsModels.Skill].search(jobsConfig.searchTerm),
				a: TypedNode = g.getNodeById(searchRes[0].id),
				b: TypedNode = g.getNodeById(searchRes[1].id);

			expect(a.ins(EDGE_TYPES.HasSkill).size).toBe(106);
			expect(a.ins(EDGE_TYPES.LooksForSkill).size).toBe(23);

			expect(b.ins(EDGE_TYPES.HasSkill).size).toBe(98);
			expect(b.ins(EDGE_TYPES.LooksForSkill).size).toBe(25);
		});


		it('should find the two task-oriented companies', () => {
			const term = 'task';
			const res = idx[jobsModels.Company].search(term);
			expect(res.length).toBe(2);
			res.forEach(item => expect(item.desc).toContain(term));
		});


		/**
		 * @description {least employees: 0} 2 companies -> 9, 17
		 * 							{most employees: 11} 1 company -> 302
		 */
		it('should find the companies with the least / most #employees', () => {
			// console.log(`Graph is typed: ${BaseGraph.isTyped(g)}`);
			const employeeDist = g.inHistT(NODE_TYPES.Company, EDGE_TYPES.WorksFor);
			expect(employeeDist[0].size).toBe(2);
			/**
			 * @todo weird...
			 */
			employeeDist[0].forEach(n => expect(['9', '17']).toContain((<any>n).id));
			employeeDist[11].forEach(n => expect(['302']).toContain((<any>n).id));
		});


		/**
		 * @description {least skills: 10} 1 person -> 199
		 * 							{most skills: 19} 1 person -> 175
		 */
		it('should find the least / most skilled person', () => {
			const skillDist = g.outHistT(NODE_TYPES.Person, EDGE_TYPES.HasSkill);
			expect(skillDist[10].size).toBe(1);
			expect(skillDist[10].forEach(p => expect(['199']).toContain((<any>p).id)));
			expect(skillDist[19].size).toBe(1);
			expect(skillDist[19].forEach(p => expect(['175']).toContain((<any>p).id)));
		});

	});

});

