import {simFuncs} from '../../src/similarity/ScoreSimilarity';
import {sim, simSource} from '../../src/similarity/SimilarityCommons';
import {TheExpanse} from '../../src/recommender/TheExpanse';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput} from 'graphinius/lib/io/input/JSONInput';


describe('COSINE base similarity tests', () => {

	const
		a = [3,8,7,5,2,9],
		b = [10,8,6,6,4,5],
		c = [],
		d = [],
		SUPER_SIZE = 1e5;
	let i = 0;
	// Symmetric split...
  while (i++ < SUPER_SIZE / 2) c.push(i);
	while (i++ <= SUPER_SIZE) d.push(i);
  // console.log(c.length);
  // console.log(d.length);
  
    it('should throw upon passing vectors of different size', () => {
      expect(simFuncs.cosine.bind(simFuncs.cosine, [1], [])).toThrowError('Vectors must be of same size');
    });


		it('should compute COSINE between two short vectors', () => {
			expect(simFuncs.cosine(a, b)).toEqual({sim: 0.86389});
		});


		it('should compute COSINE between two LARGE vectors', () => {
			expect(simFuncs.cosine(c, d)).toEqual({sim: 0.94491});
    });


    it('PERFORMANCE - should compute a great amount of cosines between two short vectors', () => {
			const tic = +new Date;
			for ( let i = 0; i < SUPER_SIZE; i++ ) simFuncs.cosine(a,b);
			const toc = +new Date;
			console.log(`1e5 iterations of cosine on 5-dim vectors took ${toc - tic} ms.`);
		});
    
	});
	

/**
 * @description similarities on neo4j sample graph
 */
describe('COSINE tests on neo4j sample graph', () => {
	
	const
		gFile = './data/cuisineCosine.json',
		g = new JSONInput({weighted: true}).readFromJSONFile(gFile, new TypedGraph('CosineCuisineSimilarities')) as TypedGraph,
		expanse = new TheExpanse(g),
		likes = 'LIKES',
		michael = g.n('Michael'),
		arya = g.n('Arya');


		/**
		MATCH (p1:Person {name: 'Michael'})-[likes1:LIKES]->(cuisine)
		MATCH (p2:Person {name: "Arya"})-[likes2:LIKES]->(cuisine)
		RETURN p1.name AS from,
					p2.name AS to,
					algo.similarity.cosine(collect(likes1.score), collect(likes2.score)) AS similarity
		 */
	it('should compute COSINE between Michael and Arya', () => {
		const coexp = {sim: 0.97889};
		const a = michael.outs(likes);
		const b = arya.outs(likes);
		const cores = sim(simFuncs.cosineSets, a, b);
		// console.log(cores);
		expect(cores).toEqual(coexp);
	});


	/**
	MATCH (p1:Person {name: 'Michael'})-[likes1:LIKES]->(cuisine)
	MATCH (p2:Person)-[likes2:LIKES]->(cuisine) WHERE p2 <> p1
	RETURN p1.name AS from,
				p2.name AS to,
				algo.similarity.cosine(collect(likes1.score), collect(likes2.score)) AS similarity
	ORDER BY similarity DESC
	 *
	 * @todo 
	 */
	it('should compute COSINE from a source', () => {
		const cox = [
      { from: 'Michael', to: 'Arya', sim: 0.97889 },
      { from: 'Michael', to: 'Zhen', sim: 0.95423 },
      { from: 'Michael', to: 'Praveena', sim: 0.94299 },
      { from: 'Michael', to: 'Karin', sim: 0.84981 }
    ];
		const start = michael.label;
		const allSets = {};
		g.getNodesT('Person').forEach(n => {
			// allSets[n.label] = expanse.expand(n, 'out', 'LIKES');
			allSets[n.label] = n.outs('LIKES');
		});
		// console.log(allSets);
		const cores = simSource(simFuncs.cosineSets, start, allSets);
		// console.log(cores);
		expect(cores).toEqual(cox);
	});
});
