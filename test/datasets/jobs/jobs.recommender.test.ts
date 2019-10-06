import * as fs from 'fs';
import * as path from 'path';
import {DIR} from 'graphinius/lib/core/interfaces';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONGraph, JSONInput} from 'graphinius/lib/io/input/JSONInput';
import {buildIdxJSSearch} from '../../../src/indexers/buildJSSearch';
import {jobsIdxConfig, jobsModels} from '../../../src/indexers/jobs/interfaces';
import {simFuncs as setSimFuncs} from 'graphinius/lib/similarities/SetSimilarities';
import {cutFuncs, sortFuncs, sim, simSource} from 'graphinius/lib/similarities/SimilarityCommons';
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
		it('companies looking for a similar skill-set than I have', () => {
			const sims_exp = [
				[ 'Tom Lemke', 'Schroeder-Corwin', 10, 0.76923 ],
				[ 'Tom Lemke', 'Carter-McGlynn', 11, 0.73333 ],
				[ 'Tom Lemke', 'Hahn and Sons', 10, 0.66667 ],
				[ 'Tom Lemke', 'Boehm LLC', 10, 0.66667 ],
				[ 'Tom Lemke', 'Sauer Ltd', 8, 0.66667 ]
			];
			const allSets = ex.accumulateSets(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);

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


		/**
		 * @example MOST URGENT DEMAND
		 */
		it('Companies looking for ~my skill set whose workforce is bad at it (urgency)', () => {
			const tic = +new Date();

			const mySkills = g.outs(me, EDGE_TYPES.HasSkill);
			// 1) same as before - get companies with greatest overlap
			const allSetsSkillDemand = ex.accumulateSets(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
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


		it('Companies employing people of a similar skill set to mine (where would I fit in)', () => {
			const mySkills = g.outs(me, EDGE_TYPES.HasSkill);
			const employees = ex.accumulateSets(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			const employeeSkills = ex.accumulateSetRelations(employees, DIR.out, EDGE_TYPES.HasSkill);
			employeeSkills[me.id] = mySkills;
			const sims = simSource(setSimFuncs.overlap, me.label, employeeSkills, {knn: 10});
			// Just for test...
			// const sims = simSource(setSimFuncs.overlap, me.label, employeeSkills, {knn: 10, cutoff: 0.99, cutFunc: cutFuncs.below});
			const sims_res = sims.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(sims_res);
		});


		it('Companies employing people I know (k-th degree) AND looking for my skills (Referral 1)', () => {
			// 1) Companies looking for my skills
			const allSets = ex.accumulateSets(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			allSets[me.label] = g.outs(me, EDGE_TYPES.HasSkill);
			const sims1 = simSource(setSimFuncs.overlap, me.label, allSets, {knn: 10});
			// const skillSims = sims1.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(skillSims);

			// 2) Companies employing people I know
			const employees = ex.accumulateSets(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
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
		it('Companies employing people I know whose workforce is bad at my skills (Referral 2)', () => {
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
			const allEmployees = ex.accumulateSets(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			allEmployees[me.id] = g.outs(me, EDGE_TYPES.Knows);
			const peopleSims = simSource(setSimFuncs.jaccard, me.id, allEmployees, {knn: 5});
			// console.log(peopleSims);

			// 2) Get inverse skill overlap
			const skillMineTheirsOverlap = [];
			const skillSupply = ex.accumulateSetRelations(allEmployees, DIR.out, EDGE_TYPES.HasSkill);
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
		it('Companies employing people I know whose workforce is bad at their skill demand (Referral 2)', () => {
// 1) Get people overlap
			const allEmployees = ex.accumulateSets(NODE_TYPES.Company, DIR.in, EDGE_TYPES.WorksFor);
			allEmployees[me.id] = g.outs(me, EDGE_TYPES.Knows);
			const peopleSims = simSource(setSimFuncs.jaccard, me.id, allEmployees, {knn: 5});

			// 2) Get inverse skill overlap
			const skillSupplyDemandOverlap = [];
			const skillSupplies = ex.accumulateSetRelations(allEmployees, DIR.out, EDGE_TYPES.HasSkill);
			const skillDemands = ex.accumulateSets(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
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
			const skillDemands = ex.accumulateSets(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			skillDemands[me.id] = friendsSkills;		
			const sims = simSource(setSimFuncs.jaccard, me.id, skillDemands, {knn: 10});
			const sim_res = sims.map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]);
			// console.log(sim_res);
		});


		it('companies employing people similar to me (by skill set)', () => {
			const allSkills = ex.accumulateSets(NODE_TYPES.Person, DIR.out, EDGE_TYPES.HasSkill);
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
		it('companies employing people similar to me (by the people they know)', () => {
			const allFriends = ex.accumulateSets(NODE_TYPES.Person, DIR.out, EDGE_TYPES.Knows);
			const mostSimToMeByFriends = simSource(setSimFuncs.overlap, me.id, allFriends, {knn: 10});
			const employers = mostSimToMeByFriends.map(e => ({
				company: Array.from(g.outs(g.n(e.to), EDGE_TYPES.WorksFor))[0].f('name'), 
				isect: e.isect, 
				sim: e.sim
			}));
			// console.log(employers);
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


		/**
		 *  I wanna re-locate to some place where people understand me ;-))))
		 */
		it.only('companies located in countries where like-minded people live (by skills)', () => {
			const allSkills = ex.accumulateSets(NODE_TYPES.Person, DIR.out, EDGE_TYPES.HasSkill);
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

	});



	/*--------------------------------------------*/
	/*							PERSON -> SKILLS	 					  */
	/*--------------------------------------------*/
	describe('Skill-centered recommendations (what could I learn / offer to teach)', () => {

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


		/**
		 * @example What skills could I learn close to home
		 */
		it('job training available close to my location (by skills that people here have)', () => {

		});

	});



	/*--------------------------------------------*/
	/*						COMPANY -> EMPLOYEES					  */
	/*--------------------------------------------*/
	describe('Employee-centered recommendations', () => {


	});



	/*--------------------------------------------*/
	/*						 COUNTRY -> OTHERS						  */
	/*--------------------------------------------*/
	/**
	 * @todo only
	 */
	describe('Location-centered recommendations', () => {

	});


});
