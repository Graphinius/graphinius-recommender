import * as fs from 'fs';
import * as path from 'path';
import { DIR } from 'graphinius/lib/core/interfaces';
import { TypedNode, ITypedNode } from 'graphinius/lib/core/typed/TypedNode';
import { TypedGraph } from 'graphinius/lib/core/typed/TypedGraph';
import { JSONInput, JSONGraph } from 'graphinius/lib/io/input/JSONInput';
import { buildIdxJSSearch } from '../../src/indexers/buildJSSearch';
import { jobsIdxConfig, jobsModels } from '../../src/indexers/jobs/interfaces';
import { jobsConfig } from '../../src/indexers/jobs/appConfig';
import { simFuncs as setSimFuncs } from 'graphinius/lib/similarities/SetSimilarities';
import { viaSharedPrefs, simSource, cutFuncs } from 'graphinius/lib/similarities/SimilarityCommons';

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


	/**
	 * @todo differentiate between `expand-k` and `periphery-at-k`
	 * @todo in case we are using a manual 2-step approach, the
	 *       result set will sometimes contain the origin node
	 *       -> just delete the origin manually
	 *       -> encapsulate this bahavior within the recommender
	 */
	describe('queries extending over at least 2 relations', () => {
		let
			judyRes,
			judy;

		const
			judy_knows = 16,
			knowing_judy = 15,
			judy_sphere_out_2 = 151,
			judy_sphere_in_2 = 158,
			judy_sphere_inOut_2 = 139,
			judy_sphere_outIn_2 = 152;


		beforeEach(() => {
			judyRes = idx[jobsModels.person].search('Judy Brekke');
			judy = g.n(judyRes[0].id);
			expect(judyRes.length).toBe(1);
		});


		/**
		 * Judy -> intermediaries -> peeps
		 *
		 MATCH (p:Person{name: 'Judy Brekke'})-[:KNOWS]->(inter:Person)-[:KNOWS]->(op:Person)
		 WITH distinct(op) as peeps2
		 RETURN count(peeps2), collect(peeps2.name)
		 */
		it('people known by people known by Judy Brekke', () => {
			const peeps = g.expandK(judy, DIR.out, 'KNOWS', 2);
			expect(peeps.size).toBe(judy_sphere_out_2);

			// const people_arr = Array.from(people).map(p => p.getFeature('name')).sort();
			// console.log('People known by people known by Judy number: ', people_arr.length);
			// console.log(people_arr);
		});


		/**
		 * Judy <- intermediaries <- peeps
		 */
		it('people knowing people knowing Judy Brekke', () => {
			const peeps = g.expandK(judy, DIR.in, 'KNOWS', 2);
			expect(peeps.size).toBe(judy_sphere_in_2);

			// const people_arr = Array.from(people).map(p => p.getFeature('name')).sort();
			// console.log('People knowing people knowing Judy number: ', people_arr.length);
			// console.log(people_arr);
		});


		/**
		 * Judy <- intermediaries -> peeps
		 */
		it('people known by people knowing Judy Brekke', () => {
			const intermediaries = g.ins(judy, 'KNOWS');
			expect(intermediaries.size).toBe(knowing_judy);
			const peeps = g.expand(intermediaries, DIR.out, 'KNOWS');

			peeps.delete(judy);
			expect(peeps.size).toBe(judy_sphere_inOut_2);

			// console.log('Intermediaries: ', intermediaries.size);
			// console.log('People intermediaries know: ', peeps.size);
		});


		/**
		 * Judy -> intermediaries <- peeps
		 */
		it('people knowing people Judy Brekke knows', () => {
			const intermediaries = g.outs(judy, 'KNOWS');
			expect(intermediaries.size).toBe(judy_knows);
			const peeps = g.expand(intermediaries, DIR.in, 'KNOWS');

			peeps.delete(judy);
			expect(peeps.size).toBe(judy_sphere_outIn_2);
		});


		/**
		 MATCH (c:Company{name: 'Kohler Group'})<-[:WORKS_FOR]-(p:Person)-[:HAS_SKILL]->(s:Skill)
		 WITH p, s, collect(p) as peeps, collect(s) as skills
		 RETURN COUNT(skills), collect(s.name)
		 */
		it('combined set of skills of all the people working for Kohler Group', () => {
			const skills_exp = ["SequenceL", "MUMPS", "J++", "csh", "TypeScript", "Babbage", "ColdC", "xHarbour", "Cython", "Ladder", "AIMMS", "Stata", "Mirah", "Scratch", "Red", "Scala", "Caml", "Datalog", "S/SL", "ALGOL W", "Cayenne", "RPL", "BPEL", "Caché ObjectScript", "Hartmann pipelines", "PL/M", "ML"];
			const kG = g.n(idx[jobsModels.company].search('Kohler Group')[0].id);
			const employees = g.ins(kG, EDGE_TYPES.WorksFor);
			expect(employees.size).toBe(6);
			// Now we need to collect the SET of all Skills that those employees have
			// However, the graph has duplicate nodes for the same skill NAME, so we need to post-process..
			const skills_dup = g.expand(employees, DIR.out, 'HAS_SKILL');
			const skills = new Set<ITypedNode>();
			Array.from(skills_dup).map(s => skills.add(s.getFeature('name')));
			expect(skills.size).toBe(27);
			expect(Array.from(skills).map(s => s).sort()).toEqual(skills_exp.sort());
		});

	});


	/**
	 * @todo should we have readily available functions for each of those?
	 * 			 -> per problem domain?
	 * 			 -> configurable via node & edge types
	 */
	describe.only('similarity measures - ', () => {

		let me;

		beforeAll(() => {
			json = JSON.parse(fs.readFileSync(graphFile).toString());
			g = jsonIn.readFromJSON(json, new TypedGraph('Jobs')) as TypedGraph;
			idx = buildIdxJSSearch(g, jobsIdxConfig);
			expect(g.nrNodes()).toBe(NR_NODES);
			expect(g.nrDirEdges()).toBe(NR_EDGES_DIR);
			expect(g.nrUndEdges()).toBe(NR_EDGES_UND);

			me = g.n(idx[jobsModels.person].search('Tom Lemke')[0].id);
			expect(me).toBeDefined;
			expect(me.f('age')).toBe(59);
		});


		describe('people clustering - ', () => {

			it('people having a similar skill set -> to a specific node', () => {
				const tic = +new Date;
				const start = me.label;
				const allSets = {};
				g.getNodesT('Person').forEach(n => {
					allSets[n.label] = g.expand(n, DIR.out, 'HAS_SKILL');
				});
				const sims = simSource(setSimFuncs.jaccard, start, allSets);
				const toc = +new Date;
				// console.log(`Computing most similar people to Tom Lemke by SKILL similarity (Jaccard) took ${toc-tic} ms.`);
				// console.log(sims);
				expect(sims.slice(0, 6).map(e => e.sim)).toEqual([0.55, 0.55, 0.55, 0.52632, 0.52381, 0.52381]);
			});


			/**
			 * @todo make it `similar` country -> ENRICHMENT
			 */
			it('people living in the same country)', () => {
				const cmen_exp = ["Rosella Kohler", "Samson Hudson", "Khalid Lubowitz", "Oren Metz", "Javon Shields"];
				const tic = +new Date;
				const countries = Array.from(g.outs(me, 'LIVES_IN'));
				expect(countries.length).toBe(1);
				const country = countries[0];
				const cmen = g.ins(country, 'LIVES_IN');
				cmen.delete(me);
				const toc = +new Date;
				// console.log(`Computing people living in same city as Tom Lemke took ${toc-tic} ms.`);
				const cmen_arr = Array.from(cmen).map(c => c.f('name'));
				// console.log(cmen_arr.sort());
				expect(cmen_arr.sort()).toEqual(cmen_exp.sort());
			});


			it('people knowing the same people', () => {
				const tic = +new Date;
				const start = me.label;
				const allSets = {};
				g.getNodesT('Person').forEach(n => {
					allSets[n.label] = g.expand(n, DIR.out, 'KNOWS');
				});
				const sims = simSource(setSimFuncs.jaccard, start, allSets);
				const toc = +new Date;
				// console.log(`Computing most similar people to Tom Lemke by SKILL similarity (Jaccard) took ${toc-tic} ms.`);
				// console.log(sims);
				expect(sims.slice(0, 7).map(e => e.sim)).toEqual([0.17241, 0.16667, 0.16667, 0.16667, 0.14286, 0.13793, 0.13333]);
			});


			/**
			MATCH (p:Person)-[:KNOWS]->(op:Person)
			WITH {item:id(p), categories: collect(id(op))} as data
			WITH collect(data) AS AKnows

			// create sourceIds and targetIds lists
			WITH AKnows,
					[value in AKnows | value.item] AS sourceIds,
					[value in AKnows | value.item] AS targetIds

			CALL algo.similarity.jaccard.stream(AKnows + AKnows, {sourceIds: sourceIds, targetIds: targetIds})
			YIELD item1, item2, similarity
			WITH algo.getNodeById(item1) AS from, algo.getNodeById(item2) AS to, similarity
			RETURN from.name AS from, to.name AS to, similarity
			ORDER BY similarity DESC
			 * 
			 * @todo implement caching (since we only need to collect 200 groups, not 40k...)
			 */
			it.skip('people pairwise similarity by similar social group (jaccard)', () => {
				const tic = +new Date;
				const sims = viaSharedPrefs(g, setSimFuncs.jaccard, {
					t1: 'Person',
					t2: 'Person',
					d1: DIR.out,
					d2: DIR.out,
					e1: 'KNOWS',
					e2: 'KNOWS',
					cutFunc: cutFuncs.below,
					co: 0.99
				});
				// const sims = simPairwise(setSims.jaccard, )
				const toc = +new Date;
				console.log(`Computation of shared-preference similarities for Person-Person social group took ${toc - tic} ms.`);
				// console.log(sims);
				expect(sims.length).toBe(39800);
				expect(sims.slice(0, 3).map(e => e.sim)).toEqual([0.25926, 0.25926, 0.22222]);
			});


			/**
			 * @example 
			 * @description skills people I know have <-> skills other groups have
			 * @description double overlap
			 * @description take the top-5 most similar-skilled people, and compute their social group overlap
			 */
			it('people knowing / known-by people of similar skill set', () => {
				const tic = +new Date;

				// 1) get the people with most similar skill set to me
				let start = me.label;
				let allSets = {};
				g.getNodesT('Person').forEach(n => {
					allSets[n.label] = g.expand(n, DIR.out, 'HAS_SKILL');
				});
				let sims = simSource(setSimFuncs.jaccard, start, allSets);

				// 2) Extact the top-k people from this set
				let
					topK = new Map<string, ITypedNode>(),
					i = 0;
				for (let e of sims) {
					if (i++ < 15) {
						let node = g.n(e.to);
						topK.set(node.f('name'), node);
					}
				}
				// console.log(Array.from(topK.values()).map(t => [t.f('name')]).sort());

				// 3) add `myself` back to this group (should be `topK+1` now...?)
				topK.set(me.label, me);

				// 4) perform a `normal` simSource over the people they know / are known by
				start = me.label;
				allSets = {};
				topK.forEach(n => {
					allSets[n.label] = g.expand(n, DIR.out, 'KNOWS');
				});
				sims = simSource(setSimFuncs.jaccard, start, allSets, { knn: 5 });

				const toc = +new Date;
				console.log(`Computing the social group overlap to the top-K most similarly skilled people took ${toc - tic} ms.`);
				// console.log(Array.from(sims).map(t => [g.n(t.to).f('name'), t.sim]));

				const top5exp = [
					['Bryce Hilpert', 0.16667],
					['Olaf Jacobson', 0.14286],
					['Mandy Kiehn', 0.1],
					['Eino Stracke', 0.09375],
					['Hunter Swaniawski', 0.064516]
				];
				expect(Array.from(sims).map(t => [g.n(t.to).f('name'), t.sim])).toEqual(top5exp);
			});


			/**
			 * @description I want to switch jobs, but stay in my field 
			 * 							-> who works for companies
			 * @todo expand to `similar` employer -> ENRICHMENT
			 * @description similar employer => looking for same skills
			 * 															 => employing people of similar skill sets (sharedPrefs)?
			 */
			it('people knowing people of similar employer', () => {
				// 1) Do we start with one specific company? -> makes sense with recommendations
				// 2) Specify similar employer
			});


			/**
			 * @description huh !?
			 */
			it.todo('via overlapping social group employment');

		});


		describe('company clustering', () => {

			it.todo('companies located in the same / similar city');

			/**
				MATCH (c1:Company {name: 'Kovacek-Aufderhar'})-[:LOOKS_FOR_SKILL]->(s1:Skill)
				WITH c1, collect(id(s1)) AS c1Skills
				MATCH (c2:Company)-[:LOOKS_FOR_SKILL]->(s2:Skill) WHERE c1 <> c2
				WITH c1, c1Skills, c2, collect(id(s2)) AS c2Skills
				RETURN c1.name AS from,
							c2.name AS to,
							algo.similarity.jaccard(c1Skills, c2Skills) AS similarity
				ORDER BY similarity DESC
			 */
			it('companies looking for skill sets similar to a specific company (=my employer)', () => {
				let sim_exp = [0.2608695652173913, 0.4, 0.23809523809523808, 0.20833333333333334, 0.34782608695652173, 0.20833333333333334, 0.2916666666666667, 0.2857142857142857, 0.38095238095238093, 0.3333333333333333, 0.25, 0.30434782608695654, 0.3181818181818182, 0.30434782608695654, 0.34782608695652173, 0.23809523809523808, 0.2857142857142857, 0.22727272727272727, 0.2727272727272727, 0.2608695652173913, 0.2727272727272727, 0.2727272727272727, 0.2608695652173913, 0.2608695652173913, 0.2857142857142857, 0.22727272727272727, 0.36363636363636365, 0.2727272727272727, 0.5, 0.16666666666666666, 0.25, 0.45, 0.30434782608695654, 0.47368421052631576, 0.18181818181818182, 0.42105263157894735, 0.47368421052631576, 0.5238095238095238, 0.16, 0.22727272727272727, 0.2727272727272727, 0.36363636363636365, 0.35, 0.4, 0.4, 0.2727272727272727, 0.4, 0.22727272727272727, 0.21739130434782608];
				
				const tic = +new Date;
				const employer = Array.from(g.outs(me, 'WORKS_FOR'))[0];
				const source = employer.label;

				const allSets = {};
				g.getNodesT('Company').forEach(n => {
					allSets[n.label] = g.expand(n, DIR.out, 'LOOKS_FOR_SKILL');
				});
				const sims = simSource(setSimFuncs.jaccard, source, allSets);
				
				const toc = +new Date;
				console.log(`Computing companies interested in similar skills (than my employer) took ${toc - tic} ms.`);
				// console.log(Array.from(sims).slice(0, 15).map(se => [g.n(se.from).f('name'), g.n(se.to).f('name'), se.isect, se.sim]));
				expect(Array.from(sims).map(se => se.sim).sort()).toEqual(sim_exp.map(v => +v.toPrecision(5)).sort());
			});


			it('companies looking for similar skill sets - pairwise', () => {
				const tic = +new Date;
				const sims = viaSharedPrefs(g, setSimFuncs.jaccard, {
					t1: 'Company',
					t2: 'Company',
					d1: DIR.out,
					d2: DIR.out,
					e1: 'LOOKS_FOR_SKILL',
					e2: 'LOOKS_FOR_SKILL',
					cutFunc: cutFuncs.below,
					co: 0.99
				});
				const toc = +new Date;
				console.log(`Company-Company shared skill preference took ${toc - tic} ms.`);
				// console.log(sims);
				expect(sims.length).toBe(2450);
			});

			it.todo('companies employing people with overlapping skill sets');

			/* recursive definition? */
			it.todo('companies employing people with overlapping social groups');

		});


		describe('person-company related similarity', () => {

			it.todo('co-workers');

			it.todo('overlapping skills (having / looking for)');

			it.todo('companies located in the city I live in');

			it.todo('people known by people working for the same / a similar company');

		});


		describe('skills clustering', () => {

			it.todo('skills known by similar people');

			it.todo('skills looked for by similar companies');

			it.todo('skills known by people working for similar companies');

			/* Inverse clustering */
			it.todo('least similar skills by people I know');

		});


		/**
		 * @description ENRICHMENT OPPORTUNITIES
		 */
		describe('Graph enrichment opportunities - ', () => {

			/* Geolocation */
			it.todo('nearby cities');

			it.todo('people living in nearby cities');

			it.todo('people living in cities of similar culture');

			it.todo('people living in cities of similar industry sector composition');

			it.todo('skills known by people of similar income group');

			it.todo('skills known by people of similar social status / education level...');

			it.todo('companies operating in the same business');

		});

	});


	/**
	 * Partly queried from Neo4j in cypher, although cypher becomes cumbersome
	 * VERY QUICKLY when writing more than the most trivial queries
	 *
	 *
	 */
	describe('real-world job/skill - based recommendations - ', () => {

		let tom;

		beforeAll(() => {
			json = JSON.parse(fs.readFileSync(graphFile).toString());
			g = jsonIn.readFromJSON(json, new TypedGraph('Jobs')) as TypedGraph;
			idx = buildIdxJSSearch(g, jobsIdxConfig);
			expect(g.nrNodes()).toBe(NR_NODES);
			expect(g.nrDirEdges()).toBe(NR_EDGES_DIR);
			expect(g.nrUndEdges()).toBe(NR_EDGES_UND);

			tom = g.n(idx[jobsModels.person].search('Tom Lemke')[0].id);
			expect(tom).toBeDefined;
			expect(tom.f('age')).toBe(59);
		});


		it('companies looking for a similar skill-set than I have', () => {

		});


		/**
		MATCH (c:Company)-[:LOOKS_FOR_SKILL]->(s:Skill)
		WITH {item:id(c), categories: collect(id(s))} as data
		WITH collect(data) AS companySkills

		// compute skills people have
		MATCH (p:Person)-[:HAS_SKILL]->(s:Skill)
		WITH companySkills, {item:id(p), categories: collect(id(s))} as data
		WITH companySkills, collect(data) AS personSkills

		// create sourceIds and targetIds lists
		WITH companySkills, personSkills,
				[value in companySkills | value.item] AS sourceIds,
				[value in personSkills | value.item] AS targetIds

		CALL algo.similarity.jaccard.stream(companySkills + personSkills, {sourceIds: sourceIds, targetIds: targetIds})
		YIELD item1, item2, similarity
		WITH algo.getNodeById(item1) AS from, algo.getNodeById(item2) AS to, similarity
		RETURN from.name AS from, to.name AS to, similarity
		ORDER BY similarity DESC
		 */
		it('person <-> company pairwise similarities by overlapping skill sets (HAS / LOOKS_FOR)', () => {
			const tic = +new Date;
			const sims = viaSharedPrefs(g, setSimFuncs.jaccard, {
				t1: 'Person',
				t2: 'Company',
				d1: DIR.out,
				d2: DIR.out,
				e1: 'HAS_SKILL',
				e2: 'LOOKS_FOR_SKILL'
			});
			const toc = +new Date;
			console.log(`Computation of shared-preference similarities for Person-Company-Skills took ${toc - tic} ms.`);
			console.log(sims.length);
			// console.log(sims);
		});

		/**
		 *  Best chance of getting a personal recommendation from friends (no competition)
		 *
		 *  @todo 1) overlap `my skills` - `skills they are looking for`
		 *  		  2) overlap `my social group` - `their employees`
		 *  			3) inverted overlap `my skills` - `their skills`
		 */
		it.todo('companies looking for skills their employees (who are in my social group) have not');

		/* Initiative application via personal contacts... */
		it.todo('companies employing people I know, whose skill set differs from mine the strongest');

		/**
		 * @description The strength of weak ties - most successful personal employment recommendations do
		 * 							NOT come from direct friends, but acquaintances OR people THEY know
		 * @description Me -> friends -> acquaintances <- working for companies <- looking for skills <- I got skills
		 */
		it.todo('companies looking for my skill-set employing people known by people I know');



		/* collective application ?? */
		it.todo('companies looking for a skill set similar to that of my social group');

		it.todo('companies employing people similar to me (by skill set)');

		/* Could be interesting for personal recommendations */
		it.todo('companies employing people similar to me (by the people they know)');

		it.todo('companies employing people I know');

		it.todo('companies employing people knowing people I know');

		it.todo('companies employing people people I know know');

		/**
		 *  I wanna re-locate to some place where people understand me ;-))))
		 */
		it.todo('companies located in cities where like-minded people live');


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
