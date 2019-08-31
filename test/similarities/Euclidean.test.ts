import {simFuncs} from '../../src/similarity/ScoreSimilarity';
import {
	sim,
	simSource,
	simPairwise,
	simSubsets,
	knnNodeArray,
	getBsNotInA,
	simSort
} from '../../src/similarity/SimilarityCommons';
import {TheExpanse} from '../../src/recommender/TheExpanse';
import {TheAugments} from '../../src/recommender/TheAugments';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput} from 'graphinius/lib/io/input/JSONInput';
import {DIR} from "../../src/similarity/interfaces";


describe('EUCLIDEAN base similarity tests', () => {

	const
		a = [3,8,7,5,2,9],
		b = [10,8,6,6,4,5],
		c = [],
		d = [],
		SUPER_SIZE = 1e5;
	let i = 0;
	for ( let i = 0; i < SUPER_SIZE; i++ ) {
		c.push(i);
		d.push(i);
	}

	it('should throw upon passing vectors of different size', () => {
		expect(simFuncs.euclidean.bind(simFuncs.euclidean, [1], [])).toThrowError('Vectors must be of same size');
	});


	it('should compute EUCLIDEAN between two short vectors', () => {
		expect(simFuncs.euclidean(a, b)).toEqual({sim: 8.4261});
	});


	it('should compute EUCLIDEAN between two LARGE vectors', () => {
		expect(simFuncs.euclidean(c, d)).toEqual({sim: 0});
	});


	it('PERFORMANCE - should compute a great amount of cosines between two short vectors', () => {
		const tic = +new Date;
		for ( let i = 0; i < SUPER_SIZE; i++ ) simFuncs.euclidean(a,b);
		const toc = +new Date;
		console.log(`1e5 iterations of cosine on 5-dim vectors took ${toc - tic} ms.`);
	});

});


/**
 * @description similarities on neo4j sample graph
 */
describe('EUCLIDEAN tests on neo4j sample graph', () => {

	const
		gFile = './data/cuisineCosine.json',
		g = new JSONInput({weighted: true}).readFromJSONFile(gFile, new TypedGraph('CosineCuisineSimilarities')) as TypedGraph,
		expanse = new TheExpanse(g),
		likes = 'LIKES',
		zhen = g.n('Zhen'),
		praveena = g.n('Praveena');


	it('should compute similarity between Zhen and Praveena', () => {
		const exp = {sim: 6.7082};
		const a = zhen.outs(likes);
		const b = praveena.outs(likes);
		const eres = sim(simFuncs.euclideanSets, a, b);
		console.log(eres);
		expect(eres).toEqual(exp);
	});


	it('should compute sims from a source', () => {
		const exp = [
			{ from: 'Zhen', to: 'Michael', sim: 3.6056 },
			{ from: 'Zhen', to: 'Praveena', sim: 6.7082 }
		];
		const start = zhen.label;
		const allSets = {};
		g.getNodesT('Person').forEach(n => {
			allSets[n.label] = n.outs('LIKES');
		});
		const eres = simSource(simFuncs.euclideanSets, start, allSets, {cutoff: 1e-6, sort: simSort.asc});
		console.log(eres);
		expect(eres).toEqual(exp);
	});


	it('should compute pairwise', () => {
		const exp = [
			{ from: 'Arya', to: 'Zhen', sim: 0 },
			{ from: 'Karin', to: 'Zhen', sim: 0 },
			{ from: 'Karin', to: 'Praveena', sim: 3 },
			{ from: 'Michael', to: 'Zhen', sim: 3.6056 },
			{ from: 'Michael', to: 'Praveena', sim: 4 },
			{ from: 'Karin', to: 'Arya', sim: 4.3589 },
			{ from: 'Arya', to: 'Michael', sim: 5 },
			{ from: 'Praveena', to: 'Zhen', sim: 6.7082 },
			{ from: 'Karin', to: 'Michael', sim: 7 },
			{ from: 'Arya', to: 'Praveena', sim: 8 }
		];
		const allSets = {};
		g.getNodesT('Person').forEach(n => {
			allSets[n.label] = n.outs('LIKES');
		});
		const eres = simPairwise(simFuncs.euclideanSets, allSets, {sort: simSort.asc});
		// console.log(eres);
		expect(eres).toEqual(exp);
	});

});