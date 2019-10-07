import * as fs from 'fs';
import * as path from 'path';
import {DIR} from 'graphinius/lib/core/interfaces';
import {ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONGraph, JSONInput} from 'graphinius/lib/io/input/JSONInput';
import {buildIdxJSSearch} from '../../../src/indexers/buildJSSearch';
import {jobsIdxConfig, jobsModels} from '../../../src/indexers/jobs/interfaces';
import {simFuncs as setSimFuncs} from 'graphinius/lib/similarities/SetSimilarities';
import {
	cutFuncs,
	sim,
	simPairwise,
	simSource,
	sortFuncs,
	viaSharedPrefs
} from 'graphinius/lib/similarities/SimilarityCommons';
import {TheExpanse} from '../../../src/recommender/TheExpanse';
import {Pagerank} from 'graphinius/lib/centralities/Pagerank';
import {EDGE_TYPES, NODE_TYPES} from './common';


const
	graphFile = path.join(__dirname, '../../../public/test-data/graphs/jobs.json'),
	NR_NODES = 305,
	NR_EDGES_DIR = 7628,
	NR_EDGES_UND = 0;


/**
 * @todo should we have readily available functions for each of those?
 *       -> per problem domain?
 *       -> configurable via node & edge types
 */
describe('similarity measures - ', () => {

	let
		g: TypedGraph = null,
		ex: TheExpanse,
		idx: any = null,
		json: JSONGraph = null,
		me;

	const jsonIn = new JSONInput();


	beforeAll(() => {
		json = JSON.parse(fs.readFileSync(graphFile).toString());
		g = jsonIn.readFromJSON(json, new TypedGraph('Jobs')) as TypedGraph;
		ex = new TheExpanse(g);
		idx = buildIdxJSSearch(g, jobsIdxConfig);
		expect(g.nrNodes()).toBe(NR_NODES);
		expect(g.nrDirEdges()).toBe(NR_EDGES_DIR);
		expect(g.nrUndEdges()).toBe(NR_EDGES_UND);

		me = g.n(idx[jobsModels.person].search('Tom Lemke')[0].id);
		expect(me).toBeDefined;
		expect(me.f('age')).toBe(59);
	});


	/**
	 * @todo formulate expectations
	 */
	describe('skills similarity - ', () => {

		it('by overlap of people possessing them', () => {
			const skillsByPeople = ex.accumulateSetsFromNodes(NODE_TYPES.Skill, DIR.in, EDGE_TYPES.HasSkill);
			const sims = simPairwise(setSimFuncs.jaccard, skillsByPeople, {knn: 10});
			// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
		});


		it('by overlap of companies seeking them', () => {
			const skillsSoughtByCompany = ex.accumulateSetsFromNodes(NODE_TYPES.Skill, DIR.in, EDGE_TYPES.LooksForSkill);
			const sims = simPairwise(setSimFuncs.jaccard, skillsSoughtByCompany, {knn: 10});
			// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
		});


		/**
		 * @description although both sets - skills sought by company / country - are both of size 30
		 *              (since there is a 1:1 company-country relationship in this dataset), we get
		 *              different similarity results because several companies are located in the same country
		 *              (there are fewer countries than companies)
		 */
		it('by overlap of countries seeking them', () => {
			const skillsSoughtByCompany = ex.accumulateSetsFromNodes(NODE_TYPES.Skill, DIR.in, EDGE_TYPES.LooksForSkill);
			const skillsSoughtByCountry = ex.accumulateSetsFromSets(skillsSoughtByCompany, DIR.out, EDGE_TYPES.LocatedIn);
			const sims = simPairwise(setSimFuncs.jaccard, skillsSoughtByCountry, {knn: 10});
			// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
		});


		/**
		 * @description we only check for sub-perfect similarities
		 */
		it('by overlap of countries possessing them', () => {
			const skillsByPeople = ex.accumulateSetsFromNodes(NODE_TYPES.Skill, DIR.in, EDGE_TYPES.HasSkill);
			const skillsByCountry = ex.accumulateSetsFromSets(skillsByPeople, DIR.out, EDGE_TYPES.LivesIn);
			const sims = simPairwise(setSimFuncs.jaccard, skillsByCountry, {knn: 10, cutoff: 0.99, cutFunc: cutFuncs.below});
			// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
		});

	});



	/**
	 * @describe italy ID: 309
	 * @todo test against neo4j...!
	 */
	describe('country similarity - ', () => {

		it('by citizens possessing similar skill sets - between single countries', () => {
			const congo = Array.from(g.outs(me, 'LIVES_IN'))[0];
			const skillsCongo = g.expand(g.ins(congo, EDGE_TYPES.LivesIn), DIR.out, EDGE_TYPES.HasSkill);
			const italy = g.n('309');
			const skillsItaly = g.expand(g.ins(italy, EDGE_TYPES.LivesIn), DIR.out, EDGE_TYPES.HasSkill);
			const sim_res = sim(setSimFuncs.jaccard, skillsCongo, skillsItaly);
			console.log(sim_res);
			expect(sim_res).toEqual({ isect: 26, sim: 0.86667 } );
		});


		it('by citizens possessing similar skill sets - by source', () => {
			const sims_exp = [
				[ 'Congo', 'Italy', 26, 0.86667 ],
				[ 'Congo', 'Kyrgyz Republic', 27, 0.9 ],
				[ 'Congo', 'Ukraine', 28, 0.93333 ],
				[ 'Congo', 'Guernsey', 29, 0.96667 ],
				[	'Congo', 'South Georgia and the South Sandwich Islands', 29, 0.96667 ],
				[ 'Congo', 'Turks and Caicos Islands', 29, 0.96667 ],
				[ 'Congo', 'Palestinian Territory', 29, 0.96667 ],
				[ 'Congo', 'Anguilla', 29, 0.96667 ],
				[ 'Congo', 'Mozambique', 30, 1 ],
				[ 'Congo', 'Norway', 30, 1 ]
			];
			const myCountry = Array.from(g.outs(me, 'LIVES_IN'))[0];
			const peopleByCountry = ex.accumulateSetsFromNodes(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LivesIn);
			const skillSupplyByCountry = ex.accumulateSetsFromSets(peopleByCountry, DIR.out, EDGE_TYPES.HasSkill);
			const sims = simSource(setSimFuncs.jaccard, myCountry.label, skillSupplyByCountry, {knn: 10, sort: sortFuncs.asc});
			const sims_res = Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]);
			// console.log(sims_res);
			expect(sims.length).toBe(10);
			expect(sims_res).toEqual(sims_exp);
		});


		it('by citizens possessing similar skill sets - pairwise', () => {
			const sims_exp = [
				[ 'Kyrgyz Republic', 'Italy', 23, 0.76667 ],
				[	'Italy', 'South Georgia and the South Sandwich Islands', 25, 0.83333],
				[ 'Italy', 'Turks and Caicos Islands', 25, 0.83333 ],
				[ 'Anguilla', 'Italy', 25, 0.83333 ],
				[ 'Kyrgyz Republic', 'Ukraine', 25, 0.83333 ],
				[ 'Italy', 'Ukraine', 25, 0.86207 ],
				[ 'Italy', 'Mozambique', 26, 0.86667 ],
				[ 'Italy', 'Congo', 26, 0.86667 ],
				[ 'Italy', 'Norway', 26, 0.86667 ],
				[ 'Italy', 'Iceland', 26, 0.86667 ]
			];
			const peopleByCountry = ex.accumulateSetsFromNodes(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LivesIn);
			const skillSupplyByCountry = ex.accumulateSetsFromSets(peopleByCountry, DIR.out, EDGE_TYPES.HasSkill);
			const sims = simPairwise(setSimFuncs.jaccard, skillSupplyByCountry, {knn: 10, sort: sortFuncs.asc});
			const sims_res = Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]);
			// console.log(sims_res);
			expect(sims.length).toBe(10);
			expect(sims_res).toEqual(sims_exp);
		});


		/**
		 * @todo The result is the same as citizen skill set which makes sense
		 * 			 for this data set since companies can only be located in one country
		 * 			 (and people can only live in one country) - but should be different
		 * 			 in a REAL setting
		 */
		it('skill SUPPLY similarity between two countries (via their companies)', () => {
			const congo = Array.from(g.outs(me, 'LIVES_IN'))[0];
			const companiesCongo = g.expand(congo, DIR.in, EDGE_TYPES.LocatedIn);
			const employeesCongo = g.expand(companiesCongo, DIR.in, EDGE_TYPES.WorksFor);
			const skillsCongo = g.expand(employeesCongo, DIR.out, EDGE_TYPES.HasSkill);

			const italy = g.n('309');
			const companiesItaly = g.expand(italy, DIR.in, EDGE_TYPES.LocatedIn);
			const employeesItaly = g.expand(companiesItaly, DIR.in, EDGE_TYPES.WorksFor);
			const skillsItaly = g.expand(employeesItaly, DIR.out, EDGE_TYPES.HasSkill);

			const sim_res = sim(setSimFuncs.jaccard, skillsCongo, skillsItaly);
			console.log(sim_res);
			expect(sim_res).toEqual({ isect: 26, sim: 0.86667 } );
		});


		/**
		 * @todo we have to standardize a template here
		 * 			 {
		 						?????
		 * 			 }
		 */
		it('skill SUPPLY similarity of countries (via their companies) - by source', () => {
			const sims_exp = [
				[ 'Congo', 'Iran', 15, 0.51724 ],
				[ 'Congo', 'British Virgin Islands', 14, 0.51852 ],
				[ 'Congo', 'Anguilla', 21, 0.72414 ],
				[ 'Congo', 'Hong Kong', 22, 0.73333 ],
				[ 'Congo', 'Norfolk Island', 23, 0.76667 ],
				[ 'Congo', 'Guatemala', 22, 0.78571 ],
				[ 'Congo', 'Guernsey', 26, 0.86667 ],
				[ 'Congo', 'Mozambique', 26, 0.86667 ],
				[	'Congo', 'South Georgia and the South Sandwich Islands', 26, 0.86667 ],
				[ 'Congo', 'Bouvet Island (Bouvetoya)', 26, 0.86667 ]
			];
			const myCountry = Array.from(g.outs(me, 'LIVES_IN'))[0];
			const companiesByCountry = ex.accumulateSetsFromNodes(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LocatedIn);
			const employeesByCountry   = ex.accumulateSetsFromSets(companiesByCountry, DIR.in, EDGE_TYPES.WorksFor);
			const skillSupplyByCountry = ex.accumulateSetsFromSets(employeesByCountry, DIR.out, EDGE_TYPES.HasSkill);
			const sims = simSource(setSimFuncs.jaccard, myCountry.label, skillSupplyByCountry, {knn: 10, sort: sortFuncs.asc});
			const sims_res = Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]);
			// console.log(sims_res);
			expect(sims.length).toBe(10);
			expect(sims_res).toEqual(sims_exp);
		});


		it('skill SUPPLY similarity of countries (via their companies) - pairwise', () => {
			const sims_exp = [
				[ 'Iran', 'British Virgin Islands', 8, 0.32 ],
				[ 'Guatemala', 'British Virgin Islands', 11, 0.39286 ],
				[ 'Hong Kong', 'British Virgin Islands', 12, 0.41379 ],
				[ 'Norfolk Island', 'British Virgin Islands', 13, 0.44828 ],
				[ 'Iran', 'Guatemala', 13, 0.44828 ],
				[ 'Iran', 'Hong Kong', 14, 0.46667 ],
				[ 'British Virgin Islands', 'Guernsey', 15, 0.5 ],
				[ 'British Virgin Islands', 'Mozambique', 15, 0.5 ],
				[	'British Virgin Islands',	'South Georgia and the South Sandwich Islands',	15,	0.5	],
				[ 'British Virgin Islands', 'Bouvet Island (Bouvetoya)', 15, 0.5 ]
			];
			const companiesByCountry = ex.accumulateSetsFromNodes(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LocatedIn);
			const employeesByCountry   = ex.accumulateSetsFromSets(companiesByCountry, DIR.in, EDGE_TYPES.WorksFor);
			const skillSupplyByCountry = ex.accumulateSetsFromSets(employeesByCountry, DIR.out, EDGE_TYPES.HasSkill);
			const sims = simPairwise(setSimFuncs.jaccard, skillSupplyByCountry, {knn: 10, sort: sortFuncs.asc});
			const sims_res = Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]);
			// console.log(sims_res);
			expect(sims.length).toBe(10);
			expect(sims_res).toEqual(sims_exp);
		});


		it('skill DEMAND similarity between two countries (via their companies)', () => {
			const congo = Array.from(g.outs(me, 'LIVES_IN'))[0];
			const companiesCongo = g.expand(congo, DIR.in, EDGE_TYPES.LocatedIn);
			const skillsCongo = g.expand(companiesCongo, DIR.out, EDGE_TYPES.LooksForSkill);
			const italy = g.n('309');
			const companiesItaly = g.expand(italy, DIR.in, EDGE_TYPES.LocatedIn);
			const skillsItaly = g.expand(companiesItaly, DIR.out, EDGE_TYPES.LooksForSkill);
			const sim_res = sim(setSimFuncs.jaccard, skillsCongo, skillsItaly);
			// console.log(sim_res);
			expect(sim_res).toEqual({ isect: 15, sim: 0.55556 });
		});


		it('skill DEMAND similarity of countries (via their companies) - by source country', () => {
			const myCountry = Array.from(g.outs(me, 'LIVES_IN'))[0];
			const companiesByCountry = ex.accumulateSetsFromNodes(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LocatedIn);
			const skillDemandByCountry = ex.accumulateSetsFromSets(companiesByCountry, DIR.out, EDGE_TYPES.LooksForSkill);
			const sims = simSource(setSimFuncs.jaccard, myCountry.label, skillDemandByCountry);
			// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			expect(sims.length).toBe(20); // all countries with companies minus mine ;-)
		});


		it('skill DEMAND similarity of countries (via their companies) - pairwise', () => {
			const companiesByCountry = ex.accumulateSetsFromNodes(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LocatedIn);
			const skillDemandByCountry = ex.accumulateSetsFromSets(companiesByCountry, DIR.out, EDGE_TYPES.LooksForSkill);
			const sims = simPairwise(setSimFuncs.jaccard, skillDemandByCountry, {knn: 10});
			// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			expect(sims.length).toBe(10);
		});

	});


	describe('people clustering - ', () => {

		it('people having a similar skill set -> by source', () => {
			const sims_exp = [
				[ 'Tom Lemke', 'Mandy Kiehn', 11, 0.55 ],
				[ 'Tom Lemke', 'Asa Botsford', 11, 0.55 ],
				[ 'Tom Lemke', 'Tristin Kohler', 11, 0.55 ],
				[ 'Tom Lemke', 'Randi Mosciski', 10, 0.52632 ],
				[ 'Tom Lemke', 'Olaf Jacobson', 11, 0.52381 ],
				[ 'Tom Lemke', 'Carolyn Hessel', 11, 0.52381 ]
			];
			const allSets = ex.accumulateSetsFromNodes(NODE_TYPES.Person, DIR.out, EDGE_TYPES.HasSkill);
			const sims = simSource(setSimFuncs.jaccard, me.id, allSets, {knn: 6});
			const sims_res = sims.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(sims_res);
			expect(sims_res).toEqual(sims_exp);
		});


		it('people living in the same country)', () => {
			const cmen_exp = ["Rosella Kohler", "Samson Hudson", "Khalid Lubowitz", "Oren Metz", "Javon Shields"];
			const tic = +new Date;
			const countries = Array.from(g.outs(me, EDGE_TYPES.LivesIn));
			expect(countries.length).toBe(1);
			const country = countries[0];
			const cmen = g.ins(country, EDGE_TYPES.LivesIn);
			cmen.delete(me);
			const toc = +new Date;
			// console.log(`Computing people living in same country as Tom Lemke took ${toc-tic} ms.`);
			const cmen_arr = Array.from(cmen).map(c => c.f('name'));
			// console.log(cmen_arr.sort());
			expect(cmen_arr.sort()).toEqual(cmen_exp.sort());
		});


		it('people living in a similar country (by skill demands of their companies) to mine', () => {
			const myCountry = Array.from(g.expand(me, DIR.out, EDGE_TYPES.LivesIn))[0];
			const companiesByCountry = ex.accumulateSetsFromNodes(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LocatedIn);
			const skillDemandByCountry = ex.accumulateSetsFromSets(companiesByCountry, DIR.out, EDGE_TYPES.LooksForSkill);
			const sims = simSource(setSimFuncs.jaccard, myCountry.label, skillDemandByCountry, {knn: 10});
			// console.log(sims);
			const similarCountries = new Set([...Array.from(sims).map(sc => g.n(sc.to))]);
			const inhabitants = g.expand(similarCountries, DIR.in, EDGE_TYPES.LivesIn);
			// console.log(`There are ${inhabitants.size} people living in countries similar to mine (by skills demand)`);
			expect(inhabitants.size).toBe(78); // check via Neo4j
		});


		it('people knowing similar people - by source', () => {
			const tic = +new Date;
			const source = me.label;
			const allSets = ex.accumulateSetsFromNodes(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
			const sims = simSource(setSimFuncs.jaccard, source, allSets);
			const toc = +new Date;
			// console.log(`Computing most similar people to Tom Lemke by SKILL similarity (Jaccard) took ${toc-tic} ms.`);
			// console.log(sims);
			expect(sims.slice(0, 7).map(e => e.sim)).toEqual([0.17241, 0.16667, 0.16667, 0.16667, 0.14286, 0.13793, 0.13333]);
		});


		it('people knowing similar people - pairwise', () => {
			const allPeopleSets = ex.accumulateSetsFromNodes(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
			const top10SimPeople = simSource(setSimFuncs.jaccard, me.label, allPeopleSets, {knn: 10});
			// console.log(Array.from(top10SimPeople).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
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
		 */
		it('people pairwise similarity by similar social group (jaccard)', () => {
			const tic = +new Date;
			const sims = viaSharedPrefs(g, setSimFuncs.jaccard, {
				t1: NODE_TYPES.Person,
				t2: NODE_TYPES.Person,
				d1: DIR.out,
				d2: DIR.out,
				e1: EDGE_TYPES.Knows,
				e2: EDGE_TYPES.Knows,
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
			let allSets = ex.accumulateSetsFromNodes(NODE_TYPES.Person, DIR.out, EDGE_TYPES.HasSkill);
			let sims = simSource(setSimFuncs.jaccard, me.label, allSets, {knn: 15});

			// 2) Extact the top-k people from this set
			const topK = new Map<string, ITypedNode>();
			for (let e of sims) {
				let node = g.n(e.to);
				topK.set(node.f('name'), node);
			}
			// console.log(Array.from(topK.values()).map(t => [t.f('name')]).sort());

			// 3) add `myself` back to this group (should be `topK+1` now...?)
			topK.set(me.label, me);

			// 4) perform a `normal` simSource over the people they know / are known by
			allSets = ex.accumulateSetsFromNodes(topK, DIR.out, EDGE_TYPES.Knows);
			sims = simSource(setSimFuncs.jaccard, me.label, allSets, {knn: 5});

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
		 *              -> who works for companies
		 * @description similar employer => looking for same skills
		 *                               => employing people of similar skill sets (sharedPrefs)?
		 */
		it('people knowing employees of companies similar to my employer', () => {
			const tic = Date.now();
			/**
			 * companies demanding similar skills
			 */
			const myEmployer = Array.from(g.outs(me, EDGE_TYPES.WorksFor))[0];
			const skillsDemandByCompany = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			const sims = simSource(setSimFuncs.jaccard, myEmployer.label, skillsDemandByCompany, {knn: 5});
			// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));

			/**
			 * collect their employees
			 */
			const simEmployersSet = new Set([...Array.from(sims).map(e => g.n(e.to))]);
			const employeesCombined = g.expand(simEmployersSet, DIR.in, EDGE_TYPES.WorksFor);
			// console.log(employeesCombined.size);

			/**
			 * collect people knowing them
			 */
			const peepsKnowingEmps = g.expand(employeesCombined, DIR.in, EDGE_TYPES.Knows);
			// console.log(peepsKnowingEmps.size);

			/**
			 * collect the most important ones of them according to Pagerank
			 */
			const pr = new Pagerank(g, {normalize: true, epsilon: 1e-5}).computePR().map;
			const prSorted = Array.from(Object.entries(pr)).filter(e => g.n(e[0]).type === NODE_TYPES.Person).sort((a, b) => b[1] - a[1]);
			const prSortedTop10 = prSorted.slice(0, 10);
			const top10Influencers = prSortedTop10.map(e => g.n(e[0]));
			// console.log('top-10 influencers are: ', top10Influencers.map(i => i.f('name')));

			/**
			 * @todo Maybe not only sort them by Pagerank but in addition by #people they know (amongst relevant employees...?)
			 */

			const toc = Date.now();
			console.log(`Computing top-10 influencers (people knowing employees of companies similar to my employer) via Pagerank took ${toc - tic} ms.`);
		});

	});



	describe('company clustering', () => {

		/**
		 * @description Chaining:
		 * 							1) Top-k similar countries by skill supply
		 * 						  2) for each pair, output a group of companies...
		 *
		 * @todo The whole first part of this is the same as above (country-country-similarity)
		 * 			 -> extract out into cool function (make one up in your sleep...)
		 * @todo aren't we over-complicating things? since we need companiesbyCountry in the process...
		 * @todo this only works for pairs of countries - what if I want the top-K of similar pairs?
		 */
		it('companies located in a similar country by skill supply', () => {
			// 1)
			const companiesByCountry = ex.accumulateSetsFromNodes(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LocatedIn);
			const employeesByCountry   = ex.accumulateSetsFromSets(companiesByCountry, DIR.in, EDGE_TYPES.WorksFor);
			const skillSupplyByCountry = ex.accumulateSetsFromSets(employeesByCountry, DIR.out, EDGE_TYPES.HasSkill);
			const simCountries = simPairwise(setSimFuncs.jaccard, skillSupplyByCountry, {knn: 10});

			// 2)
			let land1, land2, comps1, comps2;
			const simCompanies = Array.from(simCountries).map(c => {
				land1 = g.n(c.from);
				land2 = g.n(c.to);
				comps1 = Array.from(g.ins(land1, EDGE_TYPES.LocatedIn)).map(c => c.f('name'));
				comps2 = Array.from(g.ins(land2, EDGE_TYPES.LocatedIn)).map(c => c.f('name'));
				return [land1.f('name'), land2.f('name'), [...comps1, ...comps2]];
			});
			// console.log(simCompanies);
		});


		it('companies located in a similar country (by skill demand)', () => {
			// 1)
			const companiesByCountry = ex.accumulateSetsFromNodes(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LocatedIn);
			const skillDemandByCountry = ex.accumulateSetsFromSets(companiesByCountry, DIR.out, EDGE_TYPES.LooksForSkill);
			const simCountries = simPairwise(setSimFuncs.jaccard, skillDemandByCountry, {knn: 10});

			// 2)
			let land1, land2, comps1, comps2;
			const simCompanies = Array.from(simCountries).map(c => {
				land1 = g.n(c.from);
				land2 = g.n(c.to);
				comps1 = Array.from(g.ins(land1, EDGE_TYPES.LocatedIn)).map(c => c.f('name'));
				comps2 = Array.from(g.ins(land2, EDGE_TYPES.LocatedIn)).map(c => c.f('name'));
				return [land1.f('name'), land2.f('name'), [...comps1, ...comps2]];
			});
			// console.log(simCompanies);
		});


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
		it('Two companies looking for a similar skill set', () => {
			let sim_exp = [0.2608695652173913, 0.4, 0.23809523809523808, 0.20833333333333334, 0.34782608695652173, 0.20833333333333334, 0.2916666666666667, 0.2857142857142857, 0.38095238095238093, 0.3333333333333333, 0.25, 0.30434782608695654, 0.3181818181818182, 0.30434782608695654, 0.34782608695652173, 0.23809523809523808, 0.2857142857142857, 0.22727272727272727, 0.2727272727272727, 0.2608695652173913, 0.2727272727272727, 0.2727272727272727, 0.2608695652173913, 0.2608695652173913, 0.2857142857142857, 0.22727272727272727, 0.36363636363636365, 0.2727272727272727, 0.5, 0.16666666666666666, 0.25, 0.45, 0.30434782608695654, 0.47368421052631576, 0.18181818181818182, 0.42105263157894735, 0.47368421052631576, 0.5238095238095238, 0.16, 0.22727272727272727,0.2727272727272727, 0.36363636363636365, 0.35, 0.4, 0.4, 0.2727272727272727, 0.4, 0.22727272727272727, 0.21739130434782608];

			const tic = +new Date;

			const employer = Array.from(g.outs(me, EDGE_TYPES.WorksFor))[0];
			const allSets = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			const sims = simSource(setSimFuncs.jaccard, employer.label, allSets);

			const toc = +new Date;

			console.log(`Computing companies interested in similar skills (than my employer) took ${toc - tic} ms.`);
			// console.log(Array.from(sims).slice(0, 15).map(se => [g.n(se.from).f('name'), g.n(se.to).f('name'), se.isect, se.sim]));
			expect(Array.from(sims).map(se => se.sim).sort()).toEqual(sim_exp.map(v => +v.toPrecision(5)).sort());
		});


		/**
		 * @todo test against neo4j (but should really be good already...)
		 */
		it('companies looking for similar skill sets - by source', () => {
			const sims_exp = [
				[ 'Kovacek-Aufderhar', 'Hahn and Sons', 13, 0.43333 ],
				[ 'Kovacek-Aufderhar', 'Rutherford, Gerlach and Jones', 14, 0.46667 ],
				[ 'Kovacek-Aufderhar', 'Hirthe Group', 15, 0.5 ],
				[ 'Kovacek-Aufderhar', 'Boehm LLC', 16, 0.53333 ],
				[ 'Kovacek-Aufderhar', 'Jaskolski Inc', 16, 0.53333 ],
				[ 'Kovacek-Aufderhar', 'Pouros PLC', 18, 0.6 ],
				[ 'Kovacek-Aufderhar', "O'Kon, Cormier and Jast", 23, 0.76667 ],
				[ 'Kovacek-Aufderhar', 'Hilll-Schiller', 23, 0.76667 ],
				[ 'Kovacek-Aufderhar', 'Rippin Group', 23, 0.76667 ],
				[ 'Kovacek-Aufderhar', 'Durgan LLC', 23, 0.76667 ]
			];
			const myCompany = Array.from(g.outs(me, EDGE_TYPES.WorksFor))[0];
			const employeesByCompany = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			const skillsByCompany = ex.accumulateSetsFromSets(employeesByCompany, DIR.out, EDGE_TYPES.HasSkill);
			const sims = simSource(setSimFuncs.jaccard, myCompany.label, skillsByCompany, {knn: 10, sort: sortFuncs.asc});
			const sims_res = Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]);
			// console.log(sims_res);
			expect(sims_res.length).toBe(10);
			expect(sims_res).toEqual(sims_exp);
		});


		it('companies looking for similar skill sets - pairwise', () => {
			const tic = +new Date;
			const sims = viaSharedPrefs(g, setSimFuncs.jaccard, {
				t1: NODE_TYPES.Company,
				t2: NODE_TYPES.Company,
				d1: DIR.out,
				d2: DIR.out,
				e1: EDGE_TYPES.LooksForSkill,
				e2: EDGE_TYPES.LooksForSkill,
				cutFunc: cutFuncs.below,
				co: 0.99
			});
			const toc = +new Date;
			console.log(`Company-Company shared skill preference took ${toc - tic} ms.`);
			// console.log(sims);
			expect(sims.length).toBe(2450);
		});


		it('companies employing people with overlapping skill sets', () => {
			const employees = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			const empSkills = ex.accumulateSetsFromSets(employees, DIR.out, EDGE_TYPES.HasSkill);
			const sims = simPairwise(setSimFuncs.jaccard, empSkills, {knn: 10, cutFunc: cutFuncs.below, cutoff: 0.99});
			// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
		});


		it('companies employing people with overlapping social groups', () => {
			const employees = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			const empFriends = ex.accumulateSetsFromSets(employees, DIR.out, EDGE_TYPES.Knows);
			const sims = simPairwise(setSimFuncs.jaccard, empFriends, {knn: 10, cutFunc: cutFuncs.below, cutoff: 0.99});
			// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
		});

	});



	/**
	 * @todo test something useful.. !!
	 */
	describe('person-company related similarity', () => {

		it('my co-workers', () => {
			const myEmployer = Array.from(g.expand(me, DIR.out, EDGE_TYPES.WorksFor))[0];
			const coworkers = g.ins(myEmployer, EDGE_TYPES.WorksFor);
			coworkers.delete(me);
			// console.log(Array.from(coworkers).map(cw => cw.f('name')));
			expect(coworkers.size).toBe(5);
		});


		it('overlapping skills (having / looking for)', () => {
			const sims = viaSharedPrefs(g, setSimFuncs.jaccard, {
				t1: NODE_TYPES.Person,
				t2: NODE_TYPES.Company,
				e1: EDGE_TYPES.HasSkill,
				e2: EDGE_TYPES.LooksForSkill,
				d1: DIR.out,
				d2: DIR.out,
				co: 0.6
			});
			// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			expect(sims.length).toBe(35);
		});


		it('companies located in the country I live in', () => {
			const myCountry = Array.from(g.expand(me, DIR.out, EDGE_TYPES.LivesIn))[0];
			const cmen = g.ins(myCountry, EDGE_TYPES.LivesIn);
			cmen.delete(me);
			// console.log(Array.from(cmen).map(cw => cw.f('name')));
			expect(cmen.size).toBe(5);
		});


		it('people known by my coworkers', () => {
			const myEmployer = Array.from(g.expand(me, DIR.out, EDGE_TYPES.WorksFor))[0];
			const coworkers = g.ins(myEmployer, EDGE_TYPES.WorksFor);
			coworkers.delete(me);
			const cowFriends = g.expand(coworkers, DIR.out, EDGE_TYPES.Knows);
			// console.log(Array.from(cowFriends).map(cw => cw.f('name')));
			expect(cowFriends.size).toBe(74);
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
				t1: NODE_TYPES.Person,
				t2: NODE_TYPES.Company,
				d1: DIR.out,
				d2: DIR.out,
				e1: EDGE_TYPES.HasSkill,
				e2: EDGE_TYPES.LooksForSkill
			});
			const toc = +new Date;
			console.log(`Computation of shared-preference similarities for Person-Company-Skills took ${toc - tic} ms.`);
			expect(sims.length).toBe(10000);
			// console.log(sims.length);
		});


		/**
		 * @description first from one source
		 */
		it('via overlapping social group employers - by source', () => {
			const allPeopleSets = ex.accumulateSetsFromNodes(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
			const employers = ex.accumulateSetsFromSets(allPeopleSets, DIR.out, EDGE_TYPES.WorksFor);
			const simPeopleByEmployer = simSource(setSimFuncs.jaccard, me.label, employers, {knn: 10});
			// console.log(Array.from(simPeopleByEmployer).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
		});


		/**
		 * @description second, pairwise
		 */
		it('via overlapping social group employers - pairwise', () => {
			const allPeopleSets = ex.accumulateSetsFromNodes(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
			const employers = ex.accumulateSetsFromSets(allPeopleSets, DIR.out, EDGE_TYPES.WorksFor);
			const simPeopleByEmployer = simPairwise(setSimFuncs.jaccard, employers, {knn: 10});
			// console.log(Array.from(simPeopleByEmployer).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
		});


		/**
		 * @todo really !? but why not !?
		 */
		it('via overlapping social group employers countries of origin', () => {
			const allPeopleSets = ex.accumulateSetsFromNodes(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
			const employers = ex.accumulateSetsFromSets(allPeopleSets, DIR.out, EDGE_TYPES.WorksFor);
			const countries = ex.accumulateSetsFromSets(employers, DIR.out, EDGE_TYPES.LocatedIn);
			const simPeopleByEmployerCountry = simSource(setSimFuncs.jaccard, me.label, countries, {knn: 10});
			// console.log(Array.from(simPeopleByEmployerCountry).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
		});

	});


	/**
	 * @description ENRICHMENT OPPORTUNITIES
	 */
	describe.skip('Graph enrichment opportunities - ', () => {

		it.todo('nearby countries');

		it.todo('people living in nearby countries');

		it.todo('people living in countries of similar culture');

		it.todo('people living in countries of similar industry sector composition');

		it.todo('companies operating in nearby countries');

		it.todo('companies operating in the same industry sector');

		it.todo('skills known by people of similar income group');

		it.todo('skills known by people of similar social status / education level...');

	});

});
