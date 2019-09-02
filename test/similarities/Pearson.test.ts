import {simFuncs} from '../../src/similarity/ScoreSimilarity';
import {
	sim,
	simSource,
	simPairwise,
	simSubsets,
	knnNodeArray,
	getBsNotInA,
	simSort, cutFuncs, knnNodeDict
} from '../../src/similarity/SimilarityCommons';
import {TheExpanse} from '../../src/recommender/TheExpanse';
import {TheAugments} from '../../src/recommender/TheAugments';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput} from 'graphinius/lib/io/input/JSONInput';
import {DIR} from "../../src/similarity/interfaces";


describe('PEARSON base similarity tests', () => {

	const
		a = [5,8,7,5,4,9],
		b = [7,8,6,6,4,5],
		c = [],
		d = [],
		e = [],
		SUPER_SIZE = 1e5;
	for ( let i = 0; i < SUPER_SIZE; i++ ) {
		c.push(i);
		d.push(i);
	}
	for ( let i = SUPER_SIZE; i; i-- ) {
		e.push(i);
	}

	it('should throw upon passing vectors of different size', () => {
		expect(simFuncs.pearson.bind(simFuncs.pearson, [1], [])).toThrowError('Vectors must be of same size');
	});


	it('should compute PEARSON between two short vectors', () => {
		expect(simFuncs.pearson(a, b)).toEqual({sim: 0.28768});
	});


	it('should compute PEARSON between two LARGE vectors', () => {
		expect(simFuncs.pearson(c, d)).toEqual({sim: 1});
	});


	it('should compute PEARSON between two LARGE vectors', () => {
		expect(simFuncs.pearson(c, e)).toEqual({sim: -1});
	});


	it('PERFORMANCE - should compute a great amount of cosines between two short vectors', () => {
		const tic = +new Date;
		for (let i = 0; i < SUPER_SIZE; i++) simFuncs.pearson(a, b);
		const toc = +new Date;
		console.log(`1e5 iterations of cosine on 5-dim vectors took ${toc - tic} ms.`);
	});

});
