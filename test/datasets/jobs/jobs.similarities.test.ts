import * as fs from 'fs';
import * as path from 'path';
import {DIR} from 'graphinius/lib/core/interfaces';
import {ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONGraph, JSONInput} from 'graphinius/lib/io/input/JSONInput';
import {buildIdxJSSearch} from '../../../src/indexers/buildJSSearch';
import {jobsIdxConfig, jobsModels} from '../../../src/indexers/jobs/interfaces';
import {simFuncs as setSimFuncs} from 'graphinius/lib/similarities/SetSimilarities';
import {cutFuncs, simPairwise, simSource, viaSharedPrefs} from 'graphinius/lib/similarities/SimilarityCommons';
import {TheExpanse} from '../../../src/recommender/TheExpanse';
import {Pagerank} from 'graphinius/lib/centralities/Pagerank';


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
	LivesIn = "LIVES_IN",
	LocatedIn = "LOCATED_IN",
	LooksForSkill = "LOOKS_FOR_SKILL"
}


const
	graphFile = path.join(__dirname, '../../../public/test-data/graphs/jobs.json'),
	NR_NODES = 305,
	NR_EDGES_DIR = 7628,
	NR_EDGES_UND = 0;


	/**
	 * @todo should we have readily available functions for each of those?
	 * 			 -> per problem domain?
	 * 			 -> configurable via node & edge types
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

			it('by overlap of people supplying them', () => {
				const skillsByPeople = ex.accumulateSets(NODE_TYPES.Skill, DIR.in, EDGE_TYPES.HasSkill);
				const sims = simPairwise(setSimFuncs.jaccard, skillsByPeople, {knn: 10});
				// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			});


			it('by overlap of companies seeking them', () => {
				const skillsSoughtByCompany = ex.accumulateSets(NODE_TYPES.Skill, DIR.in, EDGE_TYPES.LooksForSkill);
				const sims = simPairwise(setSimFuncs.jaccard, skillsSoughtByCompany, {knn: 10});
				// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			});


			/**
			 * @description although both sets - skills sought by company / country - are both of size 30
			 * 							(since there is a 1:1 company-country relationship in this dataset), we get
			 * 						  different similarity results because several companies are located in the same country
			 * 						  (there are fewer countries than companies)
			 */
			it('by overlap of countries seeking them', () => {
				const skillsSoughtByCompany = ex.accumulateSets(NODE_TYPES.Skill, DIR.in, EDGE_TYPES.LooksForSkill);
				const skillsSoughtByCountry = ex.accumulateSetRelations(skillsSoughtByCompany, DIR.out, EDGE_TYPES.LocatedIn);
				const sims = simPairwise(setSimFuncs.jaccard, skillsSoughtByCountry, {knn: 10});
				// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			});


			/**
			 * @description we only check for sub-perfect similarities
			 */
			it('by overlap of countries supplying them', () => {
				const skillsByPeople = ex.accumulateSets(NODE_TYPES.Skill, DIR.in, EDGE_TYPES.HasSkill);
				const skillsByCountry = ex.accumulateSetRelations(skillsByPeople, DIR.out, EDGE_TYPES.LivesIn);
				const sims = simPairwise(setSimFuncs.jaccard, skillsByCountry, {knn: 10, cutoff: 0.99, cutFunc: cutFuncs.below});
				// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			});

		});


		describe('people clustering - ', () => {

			it('people having a similar skill set -> to a specific node', () => {
				const tic = +new Date;
				const source = me.label;
				const allSets = ex.accumulateSets(NODE_TYPES.Person, DIR.out, EDGE_TYPES.HasSkill);
				const sims = simSource(setSimFuncs.jaccard, source, allSets);
				const toc = +new Date;
				// console.log(`Computing most similar people to Tom Lemke by SKILL similarity (Jaccard) took ${toc-tic} ms.`);
				// console.log(sims);
				expect(sims.slice(0, 6).map(e => e.sim)).toEqual([0.55, 0.55, 0.55, 0.52632, 0.52381, 0.52381]);
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
				const companiesByCountry = ex.accumulateSets(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LocatedIn);
				const skillDemandByCountry = ex.accumulateSetRelations(companiesByCountry, DIR.out, EDGE_TYPES.LooksForSkill);
				const sims = simSource(setSimFuncs.jaccard, myCountry.label, skillDemandByCountry, {knn: 10});
				// console.log(sims);
				const similarCountries = new Set([...Array.from(sims).map(sc => g.n(sc.to))]);
				const inhabitants = g.expand(similarCountries, DIR.in, EDGE_TYPES.LivesIn);
				// console.log(`There are ${inhabitants.size} people living in countries similar to mine (by skills demand)`);
				expect(inhabitants.size).toBe(78); // check via Neo4j
			});


			it('people knowing the same people', () => {
				const tic = +new Date;
				const source = me.label;
				const allSets = ex.accumulateSets(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
				const sims = simSource(setSimFuncs.jaccard, source, allSets);
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
				let allSets = ex.accumulateSets(NODE_TYPES.Person, DIR.out, EDGE_TYPES.HasSkill);
				let sims = simSource(setSimFuncs.jaccard, me.label, allSets);

				// 2) Extact the top-k people from this set
				let
					topK = new Map<string, ITypedNode>(),
					i = 0;
				for ( let e of sims ) {
					if (i++ < 15) {
						let node = g.n(e.to);
						topK.set(node.f('name'), node);
					}
				}
				// console.log(Array.from(topK.values()).map(t => [t.f('name')]).sort());

				// 3) add `myself` back to this group (should be `topK+1` now...?)
				topK.set(me.label, me);

				// 4) perform a `normal` simSource over the people they know / are known by
				allSets = ex.accumulateSets(topK, DIR.out, EDGE_TYPES.Knows);
				sims = simSource(setSimFuncs.jaccard, me.label, allSets, { knn: 5 });

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
			 * @description similar employer => looking for same skills
			 * 															 => employing people of similar skill sets (sharedPrefs)?
			 */
			it('people knowing employees of companies similar to my employer', () => {
				const tic = Date.now();
				/**
				 * companies demanding similar skills
				 */
				const myEmployer = Array.from(g.outs(me, EDGE_TYPES.WorksFor))[0];
				const skillsDemandByCompany = ex.accumulateSets(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
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
				const pr = new Pagerank(g, {normalize: true, epsilon: 1e-5}).computePR();
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


			it('people knowing the same people', () => {
				const allPeopleSets = ex.accumulateSets(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
				const top10SimPeople = simSource(setSimFuncs.jaccard, me.label, allPeopleSets, {knn: 10});
				// console.log(Array.from(top10SimPeople).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			});


			/**
			 * @description first from one source
			 */
			it('via overlapping social group employers, one source', () => {
				const allPeopleSets = ex.accumulateSets(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
				const employers = ex.accumulateSetRelations(allPeopleSets, DIR.out, EDGE_TYPES.WorksFor);
				const simPeopleByEmployer = simSource(setSimFuncs.jaccard, me.label, employers, {knn: 10});
				// console.log(Array.from(simPeopleByEmployer).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			});


			/**
			 * @description second, pairwise
			 */
			it('via overlapping social group employers, pairwise', () => {
				const allPeopleSets = ex.accumulateSets(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
				const employers = ex.accumulateSetRelations(allPeopleSets, DIR.out, EDGE_TYPES.WorksFor);
				const simPeopleByEmployer = simPairwise(setSimFuncs.jaccard, employers, {knn: 10});
				// console.log(Array.from(simPeopleByEmployer).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			});


			/**
			 * @todo really !?!?!?
			 */
			it('via overlapping social group employers countries of origin', () => {
				const allPeopleSets = ex.accumulateSets(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
				const employers = ex.accumulateSetRelations(allPeopleSets, DIR.out, EDGE_TYPES.WorksFor);
				const countries = ex.accumulateSetRelations(employers, DIR.out, EDGE_TYPES.LocatedIn);
				const simPeopleByEmployerCountry = simSource(setSimFuncs.jaccard, me.label, countries, {knn: 10});
				// console.log(Array.from(simPeopleByEmployerCountry).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
			});

		});


		describe('country similarity - ', () => {

			/**
			 * 1) get companies per country
			 * 		- only for countries hosting any companies
			 * 2) collect skill sets looked for by those companies into "country sets"
			 * 3) compute pairwise similarity
			 * 4) check if anything meaningful falls out of this :-)))
			 *
			 * @todo test...
			 *
			 */
			it('skill-demand similarity of countries (via their companies) - pairwise', () => {
				const companiesByCountry = ex.accumulateSets(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LocatedIn);
				const skillDemandByCountry = ex.accumulateSetRelations(companiesByCountry, DIR.out, EDGE_TYPES.LooksForSkill);
				const sims = simPairwise(setSimFuncs.jaccard, skillDemandByCountry, {knn: 10});
				// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
				expect(sims.length).toBe(10);
			});


			it('skill-demand similarity of countries (via their companies) - from source country', () => {
				const myCountry = Array.from(g.outs(me, 'LIVES_IN'))[0];
				const companiesByCountry = ex.accumulateSets(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LocatedIn);
				const skillDemandByCountry = ex.accumulateSetRelations(companiesByCountry, DIR.out, EDGE_TYPES.LooksForSkill);
				const sims = simSource(setSimFuncs.jaccard, myCountry.label, skillDemandByCountry);
				// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
				expect(sims.length).toBe(20); // all countries with companies minus mine ;-)
			});


			it('by citizens possessing similar skill sets - pairwise', () => {
				const peopleByCountry = ex.accumulateSets(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LivesIn);
				const skillSupplyByCountry	= ex.accumulateSetRelations(peopleByCountry, DIR.out, EDGE_TYPES.HasSkill);
				const sims = simPairwise(setSimFuncs.jaccard, skillSupplyByCountry, {knn: 10, cutFunc: cutFuncs.below, cutoff: 0.9});
				// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
				expect(sims.length).toBe(10);
			});


			it('by citizens possessing similar skill sets - from source country', () => {
				const myCountry = Array.from(g.outs(me, 'LIVES_IN'))[0];
				const peopleByCountry = ex.accumulateSets(NODE_TYPES.Country, DIR.in, EDGE_TYPES.LivesIn);
				const skillSupplyByCountry	= ex.accumulateSetRelations(peopleByCountry, DIR.out, EDGE_TYPES.HasSkill);
				const sims = simSource(setSimFuncs.jaccard, myCountry.label, skillSupplyByCountry);
				// console.log(Array.from(sims).map(c => [g.n(c.from).f('name'), g.n(c.to).f('name'), c.isect, c.sim]));
				expect(sims.length).toBe(24); // all inhabited countries minus mine ;-)
			});

		});


		describe('company clustering', () => {

			it.todo('companies located in a similar country');

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

				const employer = Array.from(g.outs(me, EDGE_TYPES.WorksFor))[0];
				const allSets = ex.accumulateSets(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
				const sims = simSource(setSimFuncs.jaccard, employer.label, allSets);

				const toc = +new Date;

				console.log(`Computing companies interested in similar skills (than my employer) took ${toc - tic} ms.`);
				// console.log(Array.from(sims).slice(0, 15).map(se => [g.n(se.from).f('name'), g.n(se.to).f('name'), se.isect, se.sim]));
				expect(Array.from(sims).map(se => se.sim).sort()).toEqual(sim_exp.map(v => +v.toPrecision(5)).sort());
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


			it.todo('companies employing people with overlapping skill sets');

			/* recursive definition? */
			it.todo('companies employing people with overlapping social groups');

		});


		describe('person-company related similarity', () => {

			it.todo('co-workers');

			it.todo('overlapping skills (having / looking for)');

			it.todo('companies located in the country I live in');

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
