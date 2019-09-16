import * as fs from 'fs';
import * as path from 'path';
import { DIR } from 'graphinius/lib/core/interfaces';
import { TypedNode, ITypedNode } from 'graphinius/lib/core/typed/TypedNode';
import { TypedGraph } from 'graphinius/lib/core/typed/TypedGraph';
import { JSONInput, JSONGraph } from 'graphinius/lib/io/input/JSONInput';
import { buildIdxJSSearch } from '../../../src/indexers/buildJSSearch';
import { jobsIdxConfig, jobsModels } from '../../../src/indexers/jobs/interfaces';
import { jobsConfig } from '../../../src/indexers/jobs/appConfig';
import { simFuncs as setSimFuncs } from 'graphinius/lib/similarities/SetSimilarities';
import { viaSharedPrefs, simSource, simPairwise, cutFuncs } from 'graphinius/lib/similarities/SimilarityCommons';


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
	graphFile = path.join(__dirname, '../../../public/test-data/graphs/jobs.json'),
	NR_NODES = 305,
	NR_EDGES_DIR = 7628,
  NR_EDGES_UND = 0;
  

	/**
	 * Partly queried from Neo4j in cypher, although cypher becomes cumbersome
	 * VERY QUICKLY when writing more than the most trivial queries
	 *
	 *
	 */
	describe('real-world job/skill - based recommendations - ', () => {
    
    let g: TypedGraph = null,
      idx: any = null,
      json: JSONGraph = null,
      me;

    const jsonIn = new JSONInput();
		

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


		/**
		 * 1) get my skills
		 * 2) collect companies' sought-after skill sets
		 * 3) add my skill set to this collection
		 * 4) run "normal" simSource
		 */
		it('companies looking for a similar skill-set than I have', () => {
			const source = me.label;
			const mySkills = g.outs(me, 'HAS_SKILL');

			const allSets = {};
			g.getNodesT('Company').forEach(n => {
				allSets[n.label] = g.expand(n, DIR.out, 'LOOKS_FOR_SKILL');
			});

			allSets[me.label] = mySkills;
			const sims = simSource(setSimFuncs.jaccard, source, allSets);
			expect(sims.length).toBe(50);
			console.log(sims.slice(0, 5).map(e => [g.n(e.from).f('name'), g.n(e.to).f('name'), e.isect, e.sim]));
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
		it.todo('companies looking for skills their employees have not');

		/* Explain? */
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