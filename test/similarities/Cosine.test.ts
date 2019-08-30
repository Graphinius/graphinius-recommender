import {sim, cosine, CosineSet, simSource, simPairwise, Similarity, simFuncs,} from "../../src/recommender/Similarity";
import {TheExpanse} from '../../src/recommender/TheExpanse';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput} from 'graphinius/lib/io/input/JSONInput';


describe('JACCARD base similarity tests', () => {

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
  console.log(c.length);
  console.log(d.length);
  
    it('should throw upon passing vectors of different size', () => {
      expect(cosine.bind(cosine, [1], [])).toThrowError('Vectors must be of same size');
    });


		it('should compute jaccard between two simple SETS', () => {
			expect(cosine(a, b)).toEqual(0.86389);
		});


		it('should compute jaccard between two LARGE sets', () => {
			expect(cosine(c, d)).toEqual(0.94491);
    });


    it('should ')
    
  });