import * as fs from 'fs';
import * as path from 'path';
import {DIR} from 'graphinius/lib/core/interfaces';
import {ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONGraph, JSONInput} from 'graphinius/lib/io/input/JSONInput';
import {buildIdxJSSearch} from '../../../src/indexers/buildJSSearch';
import {jobsIdxConfig, jobsModels} from '../../../src/indexers/jobs/interfaces';
import {Pagerank} from 'graphinius/lib/centralities/Pagerank';
import {simFuncs as setSimFuncs} from 'graphinius/lib/similarities/SetSimilarities';
import {sim, simSource, sortFuncs} from 'graphinius/lib/similarities/SimilarityCommons';
import {TheExpanse} from '../../../src/recommender/TheExpanse';
import {EDGE_TYPES, NODE_TYPES} from './common';


const
	graphFile = path.join(__dirname, '../../../public/test-data/graphs/jobs.json'),
	NR_NODES = 305,
	NR_EDGES_DIR = 7628,
	NR_EDGES_UND = 0;


/**
 * Partly queried from Neo4j in cypher, although cypher becomes cumbersome
 * VERY QUICKLY when writing more than the most trivial queries
 */
describe('real-world job/skill - based recommendations - ', () => {

	let
		g: TypedGraph = null,
		idx: any = null,
		json: JSONGraph = null,
		ex: TheExpanse,
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



	/*--------------------------------------------*/
	/*							 PERSON -> JOBS 						  */
	/*--------------------------------------------*/
	/**
	 * @todo does `jaccard` or `overlap` make more sense in those scenarios?
	 * 			 -> overlap would give the more usable result
	 * 			 -> however jaccard would give a better overall measure of how well
	 * 			 we fit together both ways (how happy will the company be with me
	 * 			 but happy will I be there, since I can use p% of my skills)
	 */
	describe('Person -> Job (company) recommendations', () => {

		/**
		 * @example simple profile matching
		 */
		it('companies looking for a similar skill set', () => {
			const sims_exp = [
				[ 'Tom Lemke', 'Schroeder-Corwin', 10, 0.76923 ],
				[ 'Tom Lemke', 'Carter-McGlynn', 11, 0.73333 ],
				[ 'Tom Lemke', 'Hahn and Sons', 10, 0.66667 ],
				[ 'Tom Lemke', 'Boehm LLC', 10, 0.66667 ],
				[ 'Tom Lemke', 'Sauer Ltd', 8, 0.66667 ]
			];
			const allSets = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);

			/**
			 * @description We are cross-comparing skill sets by companies & a person,
			 * 							so we need to manually add the person to the set
			 *
			 * @todo should our simSource alternatively take a `source set` as parameter
			 * 			 (really - we need effing multiple dispatch in Javascript !!!)
 			 */
			allSets[me.label] = g.outs(me, EDGE_TYPES.HasSkill);

			const sims = simSource(setSimFuncs.overlap, me.label, allSets, {knn: 5});
			const sims_res = sims.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(sims_res);
			expect(sims.length).toBe(5);
			expect(sims_res).toEqual(sims_exp);
		});


		it('companies employing people I know (k^th degree)', () => {
			const myFriends = g.outs(me, EDGE_TYPES.Knows);
			const employers = Array.from(myFriends).map(f => ({
				company: Array.from(g.outs(f, EDGE_TYPES.WorksFor))[0].f('name')
			}));
			// console.log(employers);
		});


		it('companies employing people knowing people I know', () => {
			const myFriends = g.outs(me, EDGE_TYPES.Knows);
			const peopleKnowingThem = g.expand(myFriends, DIR.in, EDGE_TYPES.Knows);
			const employers = Array.from(peopleKnowingThem)
				.slice(0, 10)
				.map(f => ({
					company: Array.from(g.outs(f, EDGE_TYPES.WorksFor))[0].f('name')
				}));
			// console.log(employers);
		});


		it('most influential people amongst employees of potential employers (Pagerank)', () => {
			// 1) potential employers
			const allSets = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			allSets[me.label] = g.outs(me, EDGE_TYPES.HasSkill);
			const sims = simSource(setSimFuncs.overlap, me.label, allSets, {knn: 5});

			// 2) of those, find the most influential employees
			/**
			 * @todo implement graph projections, then decide whether to take
			 * 			 all people or just a particular company's employees as input
			 */
			const compsAndTopKEmployeesByPagerank = [];
			const pageranks = new Pagerank(g, {normalize: true}).computePR().map;
			// console.log(pageranks);

			Array.from(sims).forEach(e => {
				const employees = g.ins(g.n(e.to), EDGE_TYPES.WorksFor);
				const top3Peeps = Array.from(employees).sort((a, b) => pageranks[a.id] - pageranks[b.id]).slice(0, 3);
				compsAndTopKEmployeesByPagerank.push({
					company: g.n(e.to).f('name'),
					isect: e.isect,
					sim: e.sim,
					contacts: top3Peeps.map(p => p.f('name'))
				});
			});
			// console.log(compsAndTopKEmployeesByPagerank);
		});


		/**
		 * @todo can only answer this after graph enrichment...
		 */
		it.todo('Most influential people amongst potential employers (Pagerank)');


		/**
		 * @example MOST URGENT DEMAND
		 */
		it('companies looking for similar skill set whose workforce is bad at it (urgency)', () => {
			const tic = +new Date();

			const mySkills = g.outs(me, EDGE_TYPES.HasSkill);
			// 1) same as before - get companies with greatest overlap
			const allSetsSkillDemand = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			allSetsSkillDemand[me.label] = mySkills;
			const sims = simSource(setSimFuncs.overlap, me.label, allSetsSkillDemand, {knn: 10});

			/**
			 * 2) now get the ones with least skill overlap between their skill demand and their workforce's skills
			 /**
			 * @todo structurize -> standardize -> methodize ;-)
			 */
			const skillDemandSupplyOverlaps = [];
			for ( let entry of sims ) {
				const company = g.n(entry.to);
				const companySkillDemand = allSetsSkillDemand[entry.to];
				const employees = g.expand(company, DIR.in, EDGE_TYPES.WorksFor);
				const employeeSkills = g.expand(employees, DIR.out, EDGE_TYPES.HasSkill);
				const simSupplyDemand = sim(setSimFuncs.overlap, companySkillDemand, employeeSkills);
				skillDemandSupplyOverlaps.push({company: company.f('name'), myOverlap: entry.sim,internalOverlap: simSupplyDemand.sim});
			}
			skillDemandSupplyOverlaps.sort((a, b) => a.internalOverlap - b.internalOverlap);
			const toc = +new Date();
			console.log(`Companies looking for similar skill set whose workforce is bad at it (urgency) took ${toc-tic} ms.`);
			// console.log(skillDemandSupplyOverlaps);
		});


		it('companies whose workforce has a similar skill set to mine (where would I fit in)', () => {
			const mySkills = g.outs(me, EDGE_TYPES.HasSkill);
			const employees = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			const employeeSkills = ex.accumulateSetsFromSets(employees, DIR.out, EDGE_TYPES.HasSkill);
			employeeSkills[me.id] = mySkills;
			const sims = simSource(setSimFuncs.jaccard, me.id, employeeSkills, {knn: 10});
			// Just for test...
			// const sims = simSource(setSimFuncs.overlap, me.label, employeeSkills, {knn: 10, cutoff: 0.99, cutFunc: cutFuncs.below});
			const sims_res = sims.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(sims_res);
		});


		it('companies employing the top-K similar people to me (by skill set)', () => {
			const allSkills = ex.accumulateSetsFromNodes(NODE_TYPES.Person, DIR.out, EDGE_TYPES.HasSkill);
			const mostSimToMeBySkills = simSource(setSimFuncs.overlap, me.id, allSkills, {knn: 10});
			// console.log(mostSimToMe);
			const employers = mostSimToMeBySkills.map(e => ({
				company: Array.from(g.outs(g.n(e.to), EDGE_TYPES.WorksFor))[0].f('name'),
				isect: e.isect,
				sim: e.sim
			}));
			// console.log(employers);
		});


		/* Could be interesting for personal recommendations */
		it('companies employing the top-K similar people to me (by social sphere overlap)', () => {
			const allFriends = ex.accumulateSetsFromNodes(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
			const mostSimToMeByFriends = simSource(setSimFuncs.overlap, me.id, allFriends, {knn: 10});
			const employers = mostSimToMeByFriends.map(e => ({
				company: Array.from(g.outs(g.n(e.to), EDGE_TYPES.WorksFor))[0].f('name'),
				isect: e.isect,
				sim: e.sim
			}));
			// console.log(employers);
		});


		it('companies employing people I know (k-th degree) AND looking for my skills (Referral 1)', () => {
			// 1) Companies looking for my skills
			const allSets = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			allSets[me.label] = g.outs(me, EDGE_TYPES.HasSkill);
			const sims1 = simSource(setSimFuncs.overlap, me.label, allSets, {knn: 10});
			// const skillSims = sims1.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(skillSims);

			// 2) Companies employing people I know
			const employees = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			employees[me.id] = g.outs(me, EDGE_TYPES.Knows);
			const sims2 = simSource(setSimFuncs.overlap, me.id, employees, {knn: 10});
			// const peopleSims = sims2.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(peopleSims);

			// 3) Take both results and check if the companies overlap
			/**
			 * @todo structurize -> standardize -> methodize ;-)
			 */
			const matchingEntries = [];
			sims1.forEach(e1 => {
				sims2.forEach(e2 => {
					if ( e1.to === e2.to ) {
						matchingEntries.push({
							from: g.n(e1.from).f('name'), to: g.n(e1.to).f('name'), isectSkills: e1.isect, simSkills: e1.sim, isectPeople: e2.isect, simPeople: e2.sim
						});
					}
				});
			});
			matchingEntries.sort((a, b) => a.simPeople - b.simPeople);
			// console.log(matchingEntries);
		});


		/**
		 * @example GETTING REFERRED by non-competitors
		 */
		it('companies employing people I know whose workforce is bad at my skills (Referral 2)', () => {
			const res_exp = [
				{
					me: '583',
					company: 'Boehm LLC',
					peopleOverlap: 0.058824,
					skillOverlap: 0.53333
				},
				{
					me: '583',
					company: 'Rippin Group',
					peopleOverlap: 0.055556,
					skillOverlap: 0.76667
				},
				{
					me: '583',
					company: 'Kohler Group',
					peopleOverlap: 0.095238,
					skillOverlap: 1
				},
				{
					me: '583',
					company: 'King LLC',
					peopleOverlap: 0.090909,
					skillOverlap: 1
				},
				{
					me: '583',
					company: 'Hirthe PLC',
					peopleOverlap: 0.076923,
					skillOverlap: 1
				}
			];

			// 1) Get people overlap
			const allEmployees = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			allEmployees[me.id] = g.outs(me, EDGE_TYPES.Knows);
			const peopleSims = simSource(setSimFuncs.jaccard, me.id, allEmployees, {knn: 5});
			// console.log(peopleSims);

			// 2) Get inverse skill overlap
			const skillMineTheirsOverlap = [];
			const skillSupply = ex.accumulateSetsFromSets(allEmployees, DIR.out, EDGE_TYPES.HasSkill);
			const mySkills = skillSupply[me.id];
			for ( let entry of peopleSims ) {
				const company = g.n(entry.to);
				const employeeSkills = skillSupply[company.id];
				const simMySkillsToTheirs = sim(setSimFuncs.jaccard, employeeSkills, mySkills);
				skillMineTheirsOverlap.push({me: me.id, company: company.f('name'), peopleOverlap: entry.sim, skillOverlap: simMySkillsToTheirs.sim});
			}
			skillMineTheirsOverlap.sort((a, b) => a.skillOverlap - b.skillOverlap);
			// console.log(skillMineTheirsOverlap);
			expect(skillMineTheirsOverlap).toEqual(res_exp);
		});


		/**
		 * @example GETTING REFERRED QUICKLY
		 *          I want to find a new job in a hurry - the best way would be to ask a friend
		 *          to recommend me to their employer. BUT - they don't wanna pull in unnecessary
		 *          competition, so the weaker their skill overlap is with mine, the better!
		 *          (yet their company should be looking for that skill...)
		 */
		it('companies employing people I know whose workforce is bad at their skill demand (Referral 3)', () => {
			// 1) Get people overlap
			const allEmployees = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			allEmployees[me.id] = g.outs(me, EDGE_TYPES.Knows);
			const peopleSims = simSource(setSimFuncs.jaccard, me.id, allEmployees, {knn: 5});

			// 2) Get inverse skill overlap
			const skillSupplyDemandOverlap = [];
			const skillSupplies = ex.accumulateSetsFromSets(allEmployees, DIR.out, EDGE_TYPES.HasSkill);
			const skillDemands = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			for ( let entry of peopleSims ) {
				const company = g.n(entry.to);
				const employeeSkills = skillSupplies[company.id];
				const skillDemand = skillDemands[company.id];
				const supplyDemandSim = sim(setSimFuncs.jaccard, employeeSkills, skillDemand);
				skillSupplyDemandOverlap.push({me: me.id, company: company.f('name'), peopleOverlap: entry.sim, skillOverlap: supplyDemandSim.sim});
			}
			skillSupplyDemandOverlap.sort((a, b) => a.skillOverlap - b.skillOverlap);
			// console.log(skillSupplyDemandOverlap);
		});
		

		/**
		 * @todo reason !?!? collective application?
		 */
		it('companies looking for a skill set similar to that of my social group', () => {
			const myFriends = g.outs(me, EDGE_TYPES.Knows);
			const friendsSkills = g.expand(myFriends, DIR.out, EDGE_TYPES.HasSkill);
			const skillDemands = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			skillDemands[me.id] = friendsSkills;		
			const sims = simSource(setSimFuncs.jaccard, me.id, skillDemands, {knn: 10});
			const sim_res = sims.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(sim_res);
		});


		/**
		 *  I wanna re-locate to some place where people understand me ;-))))
		 */
		it('companies located in countries where like-minded people live (by skills)', () => {
			const allSkills = ex.accumulateSetsFromNodes(NODE_TYPES.Person, DIR.out, EDGE_TYPES.HasSkill);
			const sims = simSource(setSimFuncs.overlap, me.id, allSkills, {knn: 10});
			const employers = Array.from(sims).map(e => {
				const country = Array.from(g.outs(g.n(e.to), EDGE_TYPES.LivesIn))[0];
				const companies = g.ins(country, EDGE_TYPES.LocatedIn);
				if ( !companies || companies.size === 0 ) {
					return;
				}
				return {
					country: country.f('name'),
					companies: Array.from(companies).map(c => ({
						company: c.f('name')
				}))};
			});
			// console.log(employers);
			// console.log(JSON.stringify(employers));
		});


		it('Companies looking for my skill set located in countries generally in demand of it (greater chances)', () => {
			// 1) potential employers
			const mySkills = g.outs(me, EDGE_TYPES.HasSkill);
			const allSets = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			allSets[me.label] = mySkills;
			const sims = simSource(setSimFuncs.overlap, me.label, allSets, {knn: 20});

			// 2) pick companies located in countries where the overlap between their respective skill demands is high
			const countriesInDemandOfMySkills = [];
			Array.from(sims).forEach(e => {
				const country = Array.from(g.outs(g.n(e.to), EDGE_TYPES.LocatedIn))[0];
				const companies = g.ins(country, EDGE_TYPES.LocatedIn);
				const countrySkillDemand = g.expand(companies, DIR.out, EDGE_TYPES.LooksForSkill);
				const overlap = sim(setSimFuncs.jaccard, mySkills, countrySkillDemand);
				// console.log(overlap);
				countriesInDemandOfMySkills.push({
					company: g.n(e.to).f('name'),
					country: country.f('name'),
					isect: overlap.isect,
					sim: overlap.sim
				});
			});
			const result = countriesInDemandOfMySkills.sort((a, b) => b.sim - a.sim).slice(0, 10);
			// console.log(result);
		});


		/**
		 * @todo check against Neo4j
		 */
		it('Companies looking for my skill set located in countries weak in supply of it (greater chances)', () => {
			const tic = +new Date;
			// 1) potential employers
			const mySkills = g.outs(me, EDGE_TYPES.HasSkill);
			const allSets = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			allSets[me.label] = mySkills;
			const sims = simSource(setSimFuncs.overlap, me.label, allSets, {knn: 20});

			// 2) pick companies located in countries where the overlap between their respective skill demands is high
			const countriesInDemandOfMySkills = [];
			Array.from(sims).forEach(e => {
				const country = Array.from(g.outs(g.n(e.to), EDGE_TYPES.LocatedIn))[0];
				const companies = g.ins(country, EDGE_TYPES.LocatedIn);
				const employees = g.expand(companies, DIR.in, EDGE_TYPES.WorksFor);
				const countrySkillSupply = g.expand(employees, DIR.out, EDGE_TYPES.HasSkill);
				const overlap = sim(setSimFuncs.jaccard, mySkills, countrySkillSupply);
				countriesInDemandOfMySkills.push({
					company: g.n(e.to).f('name'),
					country: country.f('name'),
					isect: overlap.isect,
					sim: overlap.sim
				});
			});
			const result = countriesInDemandOfMySkills.sort((a, b) => a.sim - b.sim).slice(0, 10);
			const toc = +new Date;
			// console.log(`Companies looking for my skill set located in countries weak in supply of it took ${toc-tic} ms.`)
			// console.log(result);
		});


		it('Companies (DIS-)similar to my current employer (by skill demand)', () => {
			const skillDemandByCompany = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			const myEmployer = Array.from(g.outs(me, EDGE_TYPES.WorksFor))[0];
			const sims = simSource(setSimFuncs.jaccard, myEmployer.id, skillDemandByCompany, {knn: 10});
			const sims_res = sims.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(sims_res);
		});


		it('Companies (DIS-) similar to my current employer (by skill supply)', () => {
			const employeesByCompany = ex.accumulateSetsFromNodes(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			const skillSets = ex.accumulateSetsFromSets(employeesByCompany, DIR.out, EDGE_TYPES.HasSkill);
			const myEmployer = Array.from(g.outs(me, EDGE_TYPES.WorksFor))[0];
			const sims = simSource(setSimFuncs.jaccard, myEmployer.id, skillSets, {knn: 10});
			const sims_res = sims.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(sims_res);
		});


		/**
		 * @todo waiting for graph enrichment...
		 */
		it.todo('Same companies BUT DISsimilar to my current employerdescription `enrichment possibilities`');

	});



	/*--------------------------------------------*/
	/*							PERSON -> SKILLS	 					  */
	/*--------------------------------------------*/
	describe.skip('Skill-centered recommendations (what could I learn / offer to teach)', () => {

		describe('skills required by companies ', () => {

			/**
			 * @description IDs of `task`-oriented companies
			 * 							-> id: "244", name: "O'Kon, Cormier and Jast", desc: "Mandatory 4thgeneration task-force"
			 * 						 	-> id: "283", name: "Durgan LLC", desc: "Enterprise-wide local task-force"
			 */
			it('that interest me (particular company) - start with full text search (simulated)', () => {
				const companies = new Set<ITypedNode>([g.n("244"), g.n("283")]);
				const skillDemand = g.expand(companies, DIR.out, EDGE_TYPES.LooksForSkill);
				const result = Array.from(skillDemand).map(s => g.n(s.id).f('name'));
				console.log(result);
			});


			it('employing my k^th degree friends', () => {

			});


			it('employing similar people than me (itself by skill overlap)', () => {

			});

		});


		describe('Which people possess skills I don\'t have? - ', () => {

			it('working at companies I am interested in', () => {

			});


			it('where my k^th degree friends work', () => {

			});

		});


		describe('Which people don\'t possess skills I got? - ', () => {

			it('working at companies I am interested in', () => {

			});


			it('where my k^th degree friends work', () => {

			});

		});


		describe('company / country skill comparisons', () => {

			it('Companies possessing skills I don\'t have (via their employees)', () => {

			});


			it('Companies NOT possessing skills I\'ve got (via their employees)', () => {

			});


			it('Countries possessing skills I don\'t have (via employees of their companies)', () => {

			});


			it('Countries NOT possessing skills I\'ve got (via employees of their companies)', () => {

			});

		});


		describe('Brian Tracy - ', () => {

			it('At which companies would I be special (less than k% of employees have a skill overlap > m with me)', () => {

			});


			it('At which companies would I be SUPER special (I got at least k (1) skills **nobody** there possesses)', () => {

			});

		});

	});



	/*--------------------------------------------*/
	/*						COMPANY -> EMPLOYEES					  */
	/*--------------------------------------------*/
	describe('Employee-centered recommendations', () => {

		it('People having skills we seek', () => {

		});


		it('People having a similar skill set to our workforce (fitting in)', () => {

		});


		it('People having a similar skill set to our workforce & knowing them', () => {

		});


		it('People having a similar skill set to our workforce who know them', () => {

		});


		it('People having a different skill set to our workforce (complement)', () => {

		});


		it('People having a different skill set to our workforce & knowing them', () => {

		});


		it('People having a different skill set to our workforce who know them', () => {

		});


		it('People coming from a similar company culture (by skills possessed)', () => {

		});


		it('People coming from a different company culture', () => {

		});


		it('People coming from a similar country culture', () => {

		});


		it('People coming from a different country culture', () => {

		});

	});



	/*--------------------------------------------*/
	/*						 COUNTRY -> OTHERS						  */
	/*--------------------------------------------*/
	/**
	 * @todo only
	 */
	describe('Location-centered recommendations', () => {

		it('People (individuals) with a skill set our companies need', () => {

		});


		it('People (individuals) with a skill set our workforce has not', () => {

		});


		/**
		 * @example What people do we want to attract?
		 */
		it('Companies seeking skills our people have but our economies is not providing chances for', () => {

		});


		/**
		 * @example Which of our citizens could potentially leave the country
		 */
		it('Countries seeking skills our people have but our economies is not providing chances for', () => {

		});


		/**
		 * @example international competition
		 */
		it('Peoples (collective) with a skill set our workforce has not', () => {

		});

	});

});
