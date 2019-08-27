import {jaccard} from "../../src/recommender/Similarities";

describe('SET similarity tests', () => {

	describe('Jaccard similarity tests', () => {

		it('should compute a simple jaccard similarity', () => {
			const
				a = new Set([1, 2, 3]),
				b = new Set([1, 2, 4, 5]);
			expect(jaccard(a, b)).toBe(0.4);
		});

	});

});
