import {jaccard, jaccardI32} from "../../src/recommender/Similarities";

describe('SET similarity tests', () => {

	const
		a = [1,2,3],
		b = [1,2,4,5],
		c = [],
		d = [],
		SUPER_SIZE = 1e5;
	let	i = SUPER_SIZE;
	while ( i-- >= SUPER_SIZE/4 ) d.push(i);
	while ( i-- ) c.push(i);
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
