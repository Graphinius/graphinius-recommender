import {BaseRecommender as $BR} from '../../src/recommender/BaseRecommender';
import {jaccard, jaccardI32, jaccardSource, jaccardPairwise} from "../../src/recommender/Similarity";
import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONOutput} from 'graphinius/lib/io/output/JSONOutput';
import { nodeInternals } from "stack-utils";

describe('SET similarity tests', () => {

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


	describe('Jaccard similarity tests', () => {

		it('should compute jaccard between two simple SETS', () => {
			expect(jaccard(s_a, s_b)).toBe(0.4);
		});

		it('should compute jaccard between two LARGE sets', () => {
			expect(jaccard(s_c, s_d)).toBe(0);
		});

		it('should compute jaccard between two simple TypedArraysI32', () => {
			expect(jaccardI32(t_ai, t_bi)).toBe(0.4);
		});

		it('should compute jaccard between two LARGE TypedArraysI32', () => {
			expect(jaccardI32(t_ci, t_di)).toBe(0);
		});

	});

});


/**
 * @description similarities on neo4j sample graph (jaccard)
 */
describe('neo4j samples, computed in graphinius', () => {
	const neo4jCusineGraphInput = `
		MERGE (french:Cuisine {name:'French'})
		MERGE (italian:Cuisine {name:'Italian'})
		MERGE (indian:Cuisine {name:'Indian'})
		MERGE (lebanese:Cuisine {name:'Lebanese'})
		MERGE (portuguese:Cuisine {name:'Portuguese'})
	
		MERGE (zhen:Person {name: "Zhen"})
		MERGE (praveena:Person {name: "Praveena"})
		MERGE (michael:Person {name: "Michael"})
		MERGE (arya:Person {name: "Arya"})
		MERGE (karin:Person {name: "Karin"})
	
		MERGE (shrimp:Recipe {title: "Shrimp Bolognese"})
		MERGE (saltimbocca:Recipe {title: "Saltimbocca alla roman"})
		MERGE (periperi:Recipe {title: "Peri Peri Naan"})
	
		MERGE (praveena)-[:LIKES]->(indian)
		MERGE (praveena)-[:LIKES]->(portuguese)
	
		MERGE (zhen)-[:LIKES]->(french)
		MERGE (zhen)-[:LIKES]->(indian)
	
		MERGE (michael)-[:LIKES]->(french)
		MERGE (michael)-[:LIKES]->(italian)
		MERGE (michael)-[:LIKES]->(indian)
	
		MERGE (arya)-[:LIKES]->(lebanese)
		MERGE (arya)-[:LIKES]->(italian)
		MERGE (arya)-[:LIKES]->(portuguese)
	
		MERGE (karin)-[:LIKES]->(lebanese)
		MERGE (karin)-[:LIKES]->(itali{ Zhen: 0, Praveena: 0, Michael: 0.25, Arya: 0.6666666666666666 }an)
	
		MERGE (shrimp)-[:TYPE]->(italian)
		MERGE (shrimp)-[:TYPE]->(indian)
	
		MERGE (saltimbocca)-[:TYPE]->(italian)
		MERGE (saltimbocca)-[:TYPE]->(french)
	
		MERGE (periperi)-[:TYPE]->(portuguese)
		MERGE (periperi)-[:TYPE]->(indian)
	`;
	const
		g = new TypedGraph('CuisineSimilarities'),
		french = g.addNodeByID('French', {type: 'CUISINE'}),
		italian = g.addNodeByID('Italian', {type: 'CUISINE'}),
		indian = g.addNodeByID('Indian', {type: 'CUISINE'}),
		lebanese = g.addNodeByID('Lebanese', {type: 'CUISINE'}),
		portuguese = g.addNodeByID('Portuguese', {type: 'CUISINE'}),

		zhen = g.addNodeByID('Zhen', {type: 'PERSON'}),
		praveena = g.addNodeByID('Praveena', {type: 'PERSON'}),
		michael = g.addNodeByID('Michael', {type: 'PERSON'}),
		arya = g.addNodeByID('Arya', {type: 'PERSON'}),
		karina = g.addNodeByID('Karina', {type: 'PERSON'}),

		shrimp = g.addNodeByID('Shrimp Bolognese', {type: 'RECIPE'}),
		saltimbocca = g.addNodeByID('Saltimbocca alla roman', {type: 'RECIPE'}),
		periperi = g.addNodeByID('Peri Peri Naan', {type: 'RECIPE'}),

		l1 = g.addEdgeByID('l1', praveena, indian, {directed: true, type: 'LIKES'}),
		l2 = g.addEdgeByID('l2', praveena, portuguese, {directed: true, type: 'LIKES'}),

		l3 = g.addEdgeByID('l3', zhen, french, {directed: true, type: 'LIKES'}),
		l4 = g.addEdgeByID('l4', zhen, indian, {directed: true, type: 'LIKES'}),

		l5 = g.addEdgeByID('l5', michael, french, {directed: true, type: 'LIKES'}),
		l6 = g.addEdgeByID('l6', michael, italian, {directed: true, type: 'LIKES'}),
		l7 = g.addEdgeByID('l7', michael, indian, {directed: true, type: 'LIKES'}),

		l8 = g.addEdgeByID('l8', arya, lebanese, {directed: true, type: 'LIKES'}),
		l9 = g.addEdgeByID('l9', arya, italian, {directed: true, type: 'LIKES'}),
		l10 = g.addEdgeByID('l10', arya, portuguese, {directed: true, type: 'LIKES'}),

		l11 = g.addEdgeByID('l11', karina, lebanese, {directed: true, type: 'LIKES'}),
		l12 = g.addEdgeByID('l12', karina, italian, {directed: true, type: 'LIKES'}),

		t1 = g.addEdgeByID('t1', shrimp, italian, {directed: true, type: 'TYPE'}),
		t2 = g.addEdgeByID('t2', shrimp, indian, {directed: true, type: 'TYPE'}),

		t3 = g.addEdgeByID('t3', saltimbocca, italian, {directed: true, type: 'TYPE'}),
		t4 = g.addEdgeByID('t4', saltimbocca, french, {directed: true, type: 'TYPE'}),

		t5 = g.addEdgeByID('t5', periperi, portuguese, {directed: true, type: 'TYPE'}),
		t6 = g.addEdgeByID('t6', periperi, indian, {directed: true, type: 'TYPE'});


	beforeAll(() => {
		// new JSONOutput().writeToJSONFile('./outputs/cuisine.json', g);
	});


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
	it('should compute the correct culinary similarity between Karin & Arya', () => {
		const kc = g.outs(karina, 'LIKES');
		const ac = g.outs(arya, 'LIKES');
		const jacc = jaccard(kc, ac);
		console.log(JSON.stringify({from: karina.label, to: arya.label, similarity: jacc}));
		// console.log(`Karin & Arya have a Jaccard similarity of ${jacc} w.r.t to their taste in cuisines.`)
		expect(+jacc.toFixed(4)).toBe(0.6667);
	});


	it('should compute the correct culinary similarity between Karin and everyone else', () => {
		const start = karina.label;
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = $BR.expand(g, n, 'out', 'LIKES');
		});
		const jaccs = jaccardSource(start, targets);
		console.log(jaccs);
		expect(jaccs).toEqual({Zhen: 0, Praveena: 0, Michael: 0.25, Arya: 0.6666666666666666});
	});


	it('should compute the pairwise culinary similarity', () => {
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = $BR.expand(g, n, 'out', 'LIKES');
		});
		const tic = +new Date;
		const jaccs = jaccardPairwise(targets);
		const toc = +new Date;
		console.log(`All pairs Jaccard on mini DB took ${toc-tic} ms.`)
		console.log(jaccs);
	});


	it.todo('should consider c (cutoff) threshold');

	it.todo('should consider k (NN) factor');

	it.todo('should return min(k, #res(c)) results');

	it.todo('should return min(k, #res(c), #res) results');

	/**
	 * @todo refactor so that Source & Set distance functions work generally with all distance measures
	 */
});