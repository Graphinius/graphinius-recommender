import * as fs from 'fs';
import * as path from 'path';
import {TypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput, JSONGraph} from 'graphinius/lib/io/input/JSONInput';
import {buildIdxJSSearch} from '../../src/indexers/buildJSSearch';
import {jobsIdxConfig, jobsModels} from '../../src/indexers/jobs/interfaces';
import {jobsConfig} from '../../src/indexers/jobs/appConfig';
import {BaseGraph} from 'graphinius/lib/core/base/BaseGraph';
import getOwnPropertyDescriptor = Reflect.getOwnPropertyDescriptor;

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


describe('jobs dataset tests - ', () => {

	let g: TypedGraph = null;
	let idx: any = null;
	let json: JSONGraph = null;
	const jsonIn = new JSONInput();


	beforeAll(() => {
		json = JSON.parse(fs.readFileSync(graphFile).toString());
		g = jsonIn.readFromJSON(json, new TypedGraph('')) as TypedGraph;
		idx = buildIdxJSSearch(g, jobsIdxConfig);
		expect(g.nrNodes()).toBe(NR_NODES);
		expect(g.nrDirEdges()).toBe(NR_EDGES_DIR);
		expect(g.nrUndEdges()).toBe(NR_EDGES_UND);
	});


	describe('instantiation tests - ', () => {

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


		it('should find the two task-oriented companies', () => {
			const term = 'task';
			const res = idx[jobsModels.Company].search(term);
			expect(res.length).toBe(2);
			res.forEach(item => expect(item.desc).toContain(term));
		});

	});


	/**
	 * @describe all fixed values (IDs, names, etc) coming from neo4j...
	 */
	describe('typed edges tests - ', () => {

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


		/**
		 * match(c:Company)<-[:WORKS_FOR]-(p:Person)
		 * where c.name contains 'Kohler'
		 * return p
		 * return collect(p.name), count(p)
		 */
		it('should find the 6 people are working for the Kohler Group', () => {
			const kG = g.n(idx[jobsModels.Company].search('Kohler Group')[0].id);
			const employees = g.ins(kG, EDGE_TYPES.WorksFor);
			expect(employees.size).toBe(6);
			expect(Array.from(employees).map(e => (<any>e).id)).toEqual(['43', '63', '196', '208', '212', '222']);
			expect(Array.from(employees).map(e => (<any>e).getFeature('age'))).toEqual([45, 77, 35, 20, 77, 33]);
			expect(Array.from(employees).map(e => (<any>e).getFeature('name'))).toEqual([
				"Joannie Bartoletti",
				"Judy Brekke",
				"Alfreda Kovacek",
				"Torey Steuber",
				"Lyla Hodkiewicz",
				"Evie Cummerata",
			]);
		});


		/**
		 * @description {least employees: 0} 2 companies -> 9, 17
		 *              {most employees: 11} 1 company -> 302
		 */
		it('should find the companies with least / most #employees', () => {
			// console.log(`Graph is typed: ${BaseGraph.isTyped(g)}`);
			const employeeDist = g.inHistT(NODE_TYPES.Company, EDGE_TYPES.WorksFor);
			expect(employeeDist[0].size).toBe(2);
			expect(Array.from(employeeDist[0]).map(n => (<any> n).id)).toEqual(['9', '17']);
			expect(Array.from(employeeDist[11]).map(n => (<any> n).id)).toEqual(['302']);
		});


		/**
		 * @description {min: 11} 1 company -> 233
		 *              {max: 18} 1 company -> 300
		 */
		it('should find the companies looking for min / max amount of skills', () => {
			const seekingSkills = g.outHistT(NODE_TYPES.Company, EDGE_TYPES.LooksForSkill);
			expect(seekingSkills[11].size).toBe(1);
			expect(Array.from(seekingSkills[11]).map(c => (<any> c).id)).toEqual(['233']);
			expect(seekingSkills[18].size).toBe(1);
			expect(Array.from(seekingSkills[18]).map(c => (<any> c).id)).toEqual(['300']);
		});


		/**
		 * @description {least skills: 10} 1 person -> 199
		 *              {most skills: 19} 1 person -> 175
		 */
		it('should find the least / most skilled person', () => {
			const skillDist = g.outHistT(NODE_TYPES.Person, EDGE_TYPES.HasSkill);
			expect(skillDist[10].size).toBe(1);
			expect(Array.from(skillDist[10]).map(p => (<any> p).id)).toEqual(['199']);
			expect(skillDist[19].size).toBe(1);
			expect(Array.from(skillDist[19]).map(p => (<any> p).id)).toEqual(['175']);
		});


		/**
		 * @description {least known: 7} 1 person -> 197
		 *              {best known: 29} 2 people -> 150, 190
		 */
		it('should find the best / least known people', () => {
			const knownBy = g.inHistT(NODE_TYPES.Person, EDGE_TYPES.Knows);
			expect(knownBy[7].size).toBe(1);
			expect(Array.from(knownBy[7]).map(p => (<any> p).id)).toEqual(['197']);
			expect(knownBy[29].size).toBe(2);
			expect(Array.from(knownBy[29]).map(p => (<any> p).id)).toEqual(['150', '190']);
		});


		it('should find the best / least connected people', () => {
			const knowing = g.outHistT(NODE_TYPES.Person, EDGE_TYPES.Knows);
			expect(knowing[15].size).toBe(11);
			expect(knowing[16].size).toBe(31);
			expect(knowing[17].size).toBe(76);
			expect(knowing[18].size).toBe(82);
		});

	});
	
	
	describe('queries extending over at least 2 relations', () => {

		it.todo('people known by people who know Judy Brekke');


		it('combined set of skills of all the people working for Kohler Group', () => {
			const kG = g.n(idx[jobsModels.Company].search('Kohler Group')[0].id);
			const employees = g.ins(kG, EDGE_TYPES.WorksFor);
			expect(employees.size).toBe(6);
			// console.log(employees.entries());
			console.log(Array.from(employees).map(e => e.getFeature('name')));
			// Now we need to collect the SET of all Skills that those employees have
		});

	});

});
