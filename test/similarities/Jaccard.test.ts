import {BaseRecommender as $BR, BaseRecommender} from '../../src/recommender/BaseRecommender';
import {jaccard, jaccardI32, simSource, simPairwise, Similarity, SimilarityResult, simFuncs} from "../../src/recommender/Similarity";
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput} from 'graphinius/lib/io/input/JSONInput';


describe('JACCARD base similarity tests', () => {

	const
		a = [1, 2, 3],
		b = [1, 2, 4, 5],
		c = [],
		d = [],
		SUPER_SIZE = 1e5;
	let i = SUPER_SIZE;
	// Asymmetric split...
	while (i-- >= SUPER_SIZE / 3) d.push(i);
	while (i--) c.push(i);
	let
		s_a = new Set(a),
		s_b = new Set(b),
		s_c = new Set(c),
		s_d = new Set(d),
		t_ai = new Uint32Array(a),
		t_bi = new Uint32Array(b),
		t_ci = new Uint32Array(c),
		t_di = new Uint32Array(d);


		it('should compute jaccard between two simple SETS', () => {
			const jexp: Similarity = {isect: 2, sim: 0.4};
			expect(jaccard(s_a, s_b)).toEqual(jexp);
		});


		it('should compute jaccard between two LARGE sets', () => {
			const jexp: Similarity = {isect: 0, sim: 0};
			expect(jaccard(s_c, s_d)).toEqual(jexp);
		});


		it('should compute jaccard between two simple TypedArraysI32', () => {
			const jexp: Similarity = {isect: 2, sim: 0.4};
			expect(jaccardI32(t_ai, t_bi)).toEqual(jexp);
		});


		it('should compute jaccard between two LARGE TypedArraysI32', () => {
			const jexp: Similarity = {isect: 0, sim: 0};
			expect(jaccardI32(t_ci, t_di)).toEqual(jexp);
		});
	
});


/**
 * @description similarities on neo4j sample graph (jaccard)
 */
describe('JACCARD tests on neo4j sample graph', () => {
	
	const
	gFile = './data/cuisine.json',
	g = new JSONInput().readFromJSONFile(gFile, new TypedGraph('CuisineSimilarities')) as TypedGraph,
	br = new BaseRecommender(g),
	arya = g.n('Arya'),
	karin = g.n('Karin');


	/**
	 * Cuisine preference similarity of Karin & Arya
	 *
	 * MATCH (p1:Person {name: 'Karin'})-[:LIKES]->(cuisine1)
		 WITH p1, collect(id(cuisine1)) AS p1Cuisine
		 MATCH (p2:Person {name: "Arya"})-[:LIKES]->(cuisine2)
		 WITH p1, p1Cuisine, p2, collect(id(cuisine2)) AS p2Cuisine
		 RETURN
	 		p1.name AS from,
		 	p2.name AS to,
		 	algo.similarity.jaccard(p1Cuisine, p2Cuisine) AS similarity
	 */
	it('should compute the correct culinary similarity of Karin & Arya', () => {
		const kc = g.outs(karin, 'LIKES');
		const ac = g.outs(arya, 'LIKES');
		const jexp: Similarity = {isect: 2, sim: 0.66667};
		const jres = jaccard(kc, ac);
		expect(jres).toEqual(jexp);
	});


	it('should compute the correct culinary similarities for Karin', () => {
		const jexp = [
      { from: 'Karin', to: 'Arya', isect: 2, sim: 0.66667 },
      { from: 'Karin', to: 'Michael', isect: 1, sim: 0.25 },
      { from: 'Karin', to: 'Zhen', isect: 0, sim: 0 },
      { from: 'Karin', to: 'Praveena', isect: 0, sim: 0 }
    ];
		const start = karin.label;
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		const jres = simSource(simFuncs.jaccard, start, targets);
		// console.log(jres);
		expect(jres).toEqual(jexp);
	});


	it('should compute the pairwise culinary similarity', () => {
		const jexp = [
      { from: 'Michael', to: 'Zhen', isect: 2, sim: 0.66667 },
      { from: 'Karin', to: 'Arya', isect: 2, sim: 0.66667 },
      { from: 'Praveena', to: 'Zhen', isect: 1, sim: 0.33333 },
      { from: 'Michael', to: 'Praveena', isect: 1, sim: 0.25 },
      { from: 'Arya', to: 'Praveena', isect: 1, sim: 0.25 },
      { from: 'Karin', to: 'Michael', isect: 1, sim: 0.25 },
      { from: 'Arya', to: 'Michael', isect: 1, sim: 0.2 },
      { from: 'Arya', to: 'Zhen', isect: 0, sim: 0 },
      { from: 'Karin', to: 'Zhen', isect: 0, sim: 0 },
      { from: 'Karin', to: 'Praveena', isect: 0, sim: 0 }
		]

		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		const jres = simPairwise(simFuncs.jaccard, targets);

		expect(jres.length).toBe(10);
		expect(jres).toEqual(jexp);
	});
	
});
