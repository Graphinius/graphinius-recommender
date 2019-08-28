import {sim, simSource, simPairwise, Similarity, simSort, simFuncs, knnPerNode, DIR, viaSharedPrefs} from "../../src/recommender/Similarity";
import {TheExpanse} from '../../src/recommender/TheExpanse';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput} from 'graphinius/lib/io/input/JSONInput';


describe('OVERLAP base similarity tests', () => {

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
		s_d = new Set(d);


		it('should compute jaccard between two simple SETS', () => {
			const jexp: Similarity = {isect: 2, sim: 0.66667};
			expect(sim(simFuncs.overlap, s_a, s_b)).toEqual(jexp);
		});


		it('should compute jaccard between two LARGE sets', () => {
			const jexp: Similarity = {isect: 0, sim: 0};
			expect(sim(simFuncs.overlap, s_c, s_d)).toEqual(jexp);
		});

});