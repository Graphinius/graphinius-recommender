import * as fs from 'fs';
import * as path from 'path';
import {DIR} from 'graphinius/lib/core/interfaces';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONGraph, JSONInput} from 'graphinius/lib/io/input/JSONInput';
import {buildIdxJSSearch} from '../../../src/indexers/buildJSSearch';
import {jobsIdxConfig, jobsModels} from '../../../src/indexers/jobs/interfaces';
import {simFuncs as setSimFuncs} from 'graphinius/lib/similarities/SetSimilarities';
import {simSource} from 'graphinius/lib/similarities/SimilarityCommons';
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
	 * @description `what companies / jobs should I apply to / for ?`
	 * 	We can generally subdivide between different fundamental approaches:
	 * 				* direct applications -> to company
	 * 				* referrals (hunting for influential people)
	 * 					 - strength of weak ties ?
	 * 				* more general similarities (by country, sector, job description => enrichment!)
	 * 				* all of the above weighted by other graph metrics (pagerank, transitivity, ...)
	 * 
	 * @example	scenarios
	 * 					1) Companies looking for my skill set?
	 * 					2) Companies looking for my skill set whose workforce is bad at it (urgency)
	 * 					3) Companies employing people of a similar skill set to mine (where would I fit in)?
	 * 					4) Companies employing people I know (n-th degree) AND looking for my skills? (Referral 1)
	 * 					5) Same companies as 4) whose workforce is bad at my skills? (Referral 2)
	 * 					6) Most influential people amongst employees of such companies (Pagerank)
	 * 					7) Most influential people amongst employers of such companies (Cross-Pagerank !?)
	 * 					8) Companies that employ people of a skill set similar to that of my social group? (REASON???)
	 * 					9) Companies looking for my skill set located in countries generally in demand of it (greater chances)
	 * 				 10) Companies looking for my skill set located in countries weak in supply of it (also greater chances)
	 * 				 11) Companies similar to my current employer (by skill set / workforce social group overlap)
	 * 				 12) Same companies BUT DISsimilar to my current employer
	 *
	 * @description `enrichment possibilities`
	 * 							- company profiles (histories)
	 * 							- job postings (textual search)
	 * 							- (average) salaries
	 * 						  - branch / department profiles / job postings / skill demands
	 * 						  - ratings (companies / departments / skills)
	 * 						  - enrich social network of employees (married, enemies, hierarchies !!)
	 */
	describe('Company-centered recommendations', () => {

		/**
		 * 1) get my skills
		 * 2) collect companies' sought-after skill sets
		 * 3) add my skill set to this collection
		 * 4) run "normal" simSource
		 */
		it('companies looking for a similar skill-set than I have', () => {
			const source = me.label;
			const mySkills = g.outs(me, EDGE_TYPES.HasSkill);

			const allSets = ex.accumulateMaps(NODE_TYPES.Company, DIR.out, EDGE_TYPES.LooksForSkill);
			allSets[me.label] = mySkills;

			const sims = simSource(setSimFuncs.jaccard, source, allSets);
			expect(sims.length).toBe(50);
			console.log(sims.slice(0, 5).map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]));
		});


		/**
		 * @example MOST URGENT DEMAND
		 *          The weaker a workforce a company employs is on the set of skills they are
		 *          currently looking for, the more urgent they'll need someone from outside -
		 *          and offer substantially higher salaries (hopefully ;-)
		 */
		it.todo('companies looking for skills their employees do not have / are weak on');

		/**
		 * @example GETTING REFERRED QUICKLY
		 *          I want to find a new job in a hurry - the best way would be to ask a friend
		 *          to recommend me to their employer. BUT - they don't wanna pull in unnecessary
		 *          competition, so the weaker their skill overlap is with mine, the better!
		 *          (yet their company should be looking for that skill...)
		 */
		it.todo('companies looking for skills their employees (who are in my social group) have not');

		/**
		 * @example GETTING REFERRED
		 */
		it.todo('companies employing people I know, whose skill set greatly differs from mine');

		/**
		 * @description The strength of weak ties - most successful personal employment recommendations do
		 *              NOT come from direct friends, but acquaintances OR people THEY know
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
