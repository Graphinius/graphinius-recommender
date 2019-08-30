import {sim, cosine, cosineSets, simSource, simPairwise, Similarity, simFuncs,} from "../../src/recommender/Similarity";
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
      expect(cosine.bind(cosine, [1], [])).toThrowError('Vectors must be of same size');
    });


		it('should compute COSINE between two short vectors', () => {
			expect(cosine(a, b)).toEqual(0.86389);
		});


		it('should compute COSINE between two LARGE vectors', () => {
			expect(cosine(c, d)).toEqual(0.94491);
    });


    it('PERFORMANCE - should compute a great amount of cosines between two short vectors', () => {
			const tic = +new Date;
			for ( let i = 0; i < SUPER_SIZE; i++ ) cosine(a,b);
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
		 * @description the neo4j algorithm only counts the weights of the
		 * 							cuisines they both like... which makes sense, since
		 * 							you cannot compare your ratings of different items...
		 */
	it('should compute COSINE between Michael and Arya', () => {
		const cosexp = 0.97889;
		const a = michael.outs(likes);
		const b = arya.outs(likes);
		const cosres = cosineSets(a, b);
		console.log(cosres);
		expect(cosres).toBe(cosexp);
	});

});
