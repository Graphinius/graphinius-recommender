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
			expect(idx[jobsModels.company]._documents.length).toBe(50);
			expect(idx[jobsModels.country]._documents.length).toBe(25);
			expect(idx[jobsModels.person]._documents.length).toBe(200);
			expect(idx[jobsModels.skill]._documents.length).toBe(30);
		});


		it('gets the correct initial search results (IDs)', () => {
			let searchRes = idx[jobsModels.skill].search(jobsConfig.searchTerm);
			expect(searchRes.length).toBe(2);
			searchRes.forEach(item => expect(item.name).toBe('TypeScript'));
		});


		it('should find the two task-oriented companies', () => {
			const term = 'task';
			const res = idx[jobsModels.company].search(term);
			expect(res.length).toBe(2);
			res.forEach(item => expect(item.desc).toContain(term));
		});

	});


	/**
	 * @describe all fixed values (IDs, names, etc) coming from neo4j...
	 */
	describe('typed edges & histogram tests - ', () => {

		it('gets the correct amount of IN & OUT links for Skill `Typescript`', () => {
			const
				searchRes = idx[jobsModels.skill].search(jobsConfig.searchTerm);

			searchRes.forEach(res => {
				const n = g.n(res.id);
				expect([106, 98]).toContain(n.ins(EDGE_TYPES.HasSkill).size);
				expect([23, 25]).toContain(n.ins(EDGE_TYPES.LooksForSkill).size);
			});
		});


		/**
		 * match(c:Company)<-[:WORKS_FOR]-(p:Person)
		 * where c.name contains 'Kohler'
		 * return p
		 * return collect(p.name), count(p)
		 */
		it('should find the 6 people are working for the Kohler Group', () => {
			const emp_names = ["Joannie Bartoletti", "Judy Brekke", "Alfreda Kovacek", "Torey Steuber", "Lyla Hodkiewicz", "Evie Cummerata"];

			const kG = g.n(idx[jobsModels.company].search('Kohler Group')[0].id);
			const employees = g.ins(kG, EDGE_TYPES.WorksFor);
			expect(employees.size).toBe(6);
			expect(Array.from(employees).map(e => (<any>e).getFeature('age')).sort()).toEqual([45, 77, 35, 20, 77, 33].sort());
			expect(Array.from(employees).map(e => (<any>e).getFeature('name')).sort()).toEqual(emp_names.sort());
		});


		/**
		 MATCH (c:Company)<-[employees:WORKS_FOR]-(p:Person)
		 WITH c, count(employees) as staff
		 RETURN collect(c.name), staff
		 ORDER BY staff
		 */
		it('should find the companies with least / most #employees', () => {
			const emp_0_exp = ["Brakus, Rohan and Grimes", "Daniel Ltd"];
			const emp_1_exp = ["Hahn and Sons", "Boehm LLC", "Hirthe Group", "Pouros PLC", "Rutherford, Gerlach and Jones", "Jaskolski Inc"];
			const emp_11_exp = ["Hirthe PLC"];

			const employeeDist = g.inHistT(NODE_TYPES.Company, EDGE_TYPES.WorksFor);
			expect(employeeDist[0].size).toBe(2);
			expect(Array.from(employeeDist[0]).map(n => (<any>n).getFeature('name')).sort()).toEqual(emp_0_exp.sort());
			expect(employeeDist[1].size).toBe(6);
			expect(Array.from(employeeDist[1]).map(n => (<any>n).getFeature('name')).sort()).toEqual(emp_1_exp.sort());
			expect(employeeDist[11].size).toBe(1);
			expect(Array.from(employeeDist[11]).map(n => (<any>n).getFeature('name')).sort()).toEqual(emp_11_exp.sort());
		});


		/**
		 MATCH (c:Company)-[searching:LOOKS_FOR_SKILL]->(s:Skill)
		 WITH collect(c.name) as cs, s, count(searching) as wanted
		 RETURN s, cs, wanted
		 ORDER BY wanted
		 */
		it('should find the most / least desired skills', () => {
			const least_desired = ["Cython"];
			const most_desired = ["S/SL", "MUMPS"];

			const desiredSkills = g.inHistT(NODE_TYPES.Skill, EDGE_TYPES.LooksForSkill);
			expect(desiredSkills[18].size).toBe(1);
			expect(Array.from(desiredSkills[18]).map(n => (<any>n).getFeature('name')).sort()).toEqual(least_desired.sort());
			expect(desiredSkills[31].size).toBe(2);
			expect(Array.from(desiredSkills[31]).map(n => (<any>n).getFeature('name')).sort()).toEqual(most_desired.sort());
		});


		/**
		 MATCH (c:Company)-[searching:LOOKS_FOR_SKILL]->(s:Skill)
		 WITH collect(s.name) as skills, c, count(searching) as wanted
		 RETURN c.name, skills, wanted
		 ORDER BY wanted
		 */
		it('should find the companies looking for min / max amount of skills', () => {
			const least_demanding = ["Mante Ltd"];
			const most_demanding = ["Kohler Group"];

			const seekingSkills = g.outHistT(NODE_TYPES.Company, EDGE_TYPES.LooksForSkill);
			expect(seekingSkills[11].size).toBe(1);
			expect(Array.from(seekingSkills[11]).map(c => (<any>c).getFeature('name'))).toEqual(least_demanding);
			expect(seekingSkills[18].size).toBe(1);
			expect(Array.from(seekingSkills[18]).map(c => (<any>c).getFeature('name'))).toEqual(most_demanding);
		});


		/**
		 MATCH (p:Person)-[talent:HAS_SKILL]->(s:Skill)
		 WITH p, count(talent) as t_cnt, collect(s.name) as skills
		 RETURN p.name, t_cnt, skills
		 ORDER BY t_cnt DESC
		 LIMIT 1
		 */
		it('should find the least / most skilled person', () => {
			const least_skilled = ["Elenora Lemke"];
			const most_skilled = ["Tyson Beatty"];

			const skillDist = g.outHistT(NODE_TYPES.Person, EDGE_TYPES.HasSkill);
			expect(skillDist[10].size).toBe(1);
			expect(Array.from(skillDist[10]).map(p => (<any>p).getFeature('name'))).toEqual(least_skilled);
			expect(skillDist[19].size).toBe(1);
			expect(Array.from(skillDist[19]).map(p => (<any>p).getFeature('name'))).toEqual(most_skilled);
		});


		/**
		 MATCH (p:Person)<-[known_by:KNOWS]-(op:Person)
		 WITH p, count(known_by) as popularity, collect(op.name) as fans
		 RETURN p.name, popularity, fans
		 ORDER BY popularity DESC
		 LIMIT 1
		 */
		it('should find the best / least known people', () => {
			const least_known = ["Kylee Larkin"];
			const best_known = ["Jana Dach", "Ursula Gerlach"];

			const knownBy = g.inHistT(NODE_TYPES.Person, EDGE_TYPES.Knows);
			expect(knownBy[7].size).toBe(1);
			expect(Array.from(knownBy[7]).map(p => (<any>p).getFeature('name'))).toEqual(least_known);
			expect(knownBy[29].size).toBe(2);
			expect(Array.from(knownBy[29]).map(p => (<any>p).getFeature('name')).sort()).toEqual(best_known.sort());
		});


		/**
		 MATCH (p:Person)-[knows:KNOWS]->(op:Person)
		 WITH p, count(knows) as connected, collect(op.name) as contacts
		 RETURN collect(p.name), connected //, collect(contacts)
		 ORDER BY connected
		 LIMIT 10
		 */
		it('should find the best / least connected people', () => {
			const knowing = g.outHistT(NODE_TYPES.Person, EDGE_TYPES.Knows);
			expect(knowing[15].size).toBe(11);
			expect(knowing[16].size).toBe(31);
			expect(knowing[17].size).toBe(76);
			expect(knowing[18].size).toBe(82);
		});

	});


	describe.skip('queries extending over at least 2 relations', () => {

		/**
		 * simple OUTward expander, k=2
		 */
		it('people known by people known by Judy Brekke', () => {
			const judyRes = idx[jobsModels.person].search('Judy Brekke');
			expect(judyRes.length).toBe(1);
			const judy = g.n(judyRes[0].id);
			// const people =
		});


		/**
		 * simple INward expander, k=2
		 */
		it('people knowing people knowing Judy Brekke', () => {
			const judyRes = idx[jobsModels.person].search('Judy Brekke');
			expect(judyRes.length).toBe(1);
			const judy = g.n(judyRes[0].id);
			// const people =
		});


		it('people known by people who know Judy Brekke', () => {
			const judyRes = idx[jobsModels.person].search('Judy Brekke');
			expect(judyRes.length).toBe(1);
			const judy = g.n(judyRes[0].id);
			console.log(judy);
		});


		it('combined set of skills of all the people working for Kohler Group', () => {
			const kG = g.n(idx[jobsModels.company].search('Kohler Group')[0].id);
			const employees = g.ins(kG, EDGE_TYPES.WorksFor);
			expect(employees.size).toBe(6);
			// console.log(employees.entries());
			console.log(Array.from(employees).map(e => e.getFeature('name')));
			// Now we need to collect the SET of all Skills that those employees have
		});

	});


	/**
	 * Partly queried from Neo4j in cypher, although cyphter becomes cumbersome
	 * VERY QUICKLY when writing more than the most trivial queries
	 * -> $G is so much more convenient :-)))
	 */
	describe('real-world job/skill - based recommendations - ', () => {

		/**
		 match (me:Person{name: 'Cyrus Koch'})-[:HAS_SKILL]->(ms:Skill)<-[:HAS_SKILL]-(p:Person)-[:WORKS_FOR]->(c:Company)-[:LOOKS_FOR_SKILL]->(os:Skill)
		 where ms.name = 'TypeScript'
		 and ms<>os
		 return
		 collect(DISTINCT p.name),
		 collect(DISTINCT c.name),
		 collect(DISTINCT os.name),
		 count(DISTINCT os.name)
		 limit 10
		 */
		it.todo('skills that companies employing similar people than me are looking for');

	});

});
