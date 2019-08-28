import {BaseRecommender as $BR, BaseRecommender} from '../../src/recommender/BaseRecommender';
import {jaccard, jaccardI32, simSource, simPairwise, Similarity, SimilarityResult, simFuncs} from "../../src/recommender/Similarity";
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput} from 'graphinius/lib/io/input/JSONInput';


/**
 * @description similarities on neo4j sample graph (jaccard)
 */
describe('Cutoff & knn similarity tests', () => {

  const
    gFile = './data/cuisine.json',
		g = new JSONInput().readFromJSONFile(gFile, new TypedGraph('CuisineSimilarities')) as TypedGraph,
    br = new BaseRecommender(g),
    karin = g.n('Karin');


	it('simSource should consider c (cutoff) threshold', () => {
		const start = karin.label;
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		const jres = simSource(simFuncs.jaccard, start, targets, {cutoff: 0.3});
		expect(jres.length).toBe(1);
	});


	it('simPairwise should consider c (cutoff) threshold', () => {
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		const jres = simPairwise(simFuncs.jaccard, targets, {cutoff: 0.3});
		expect(jres.length).toBe(3);
	});


	it('simSource should consider knn factor', () => {
		const start = karin.label;
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		const jres = simSource(simFuncs.jaccard, start, targets, {knn: 3});
		expect(jres.length).toBe(3);
	});


	it('simSource should consider min(knn, size(res))', () => {
		const start = karin.label;
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		const jres = simSource(simFuncs.jaccard, start, targets, {knn: 13});
		expect(jres.length).toBe(4);
	});


	it('simPairwise should consider knn factor', () => {
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		const jres = simPairwise(simFuncs.jaccard, targets, {knn: 5});
		expect(jres.length).toBe(5);
	});


	it('simPairwise should consider min(knn, size(res) factor', () => {
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		const jres = simPairwise(simFuncs.jaccard, targets, {knn: 15});
		expect(jres.length).toBe(10);
	});


	it('simSource should return min(knn, #res(>cutoff)) results', () => {
		const start = karin.label;
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		const jres = simSource(simFuncs.jaccard, start, targets, {cutoff: 0.3, knn: 3});
		expect(jres.length).toBe(1);
	});


	it('simPairwise should return min(knn, #res(>cutoff)) results', () => {
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		const jres = simPairwise(simFuncs.jaccard, targets, {cutoff: 0.3, knn: 5});
		expect(jres.length).toBe(3);
	});


	/**
	 * Time measurement -> not necessary for test suite
	 */
	it('should compute the pairwise JACCARD culinary similarity', () => {
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

		let tic = process.hrtime()[1];
		const targets = {};
		g.getNodesT('Person').forEach(n => {
			targets[n.label] = br.expand(n, 'out', 'LIKES');
		});
		let toc = process.hrtime()[1];
		console.log(`Expansion on 5 nodes on mini DB took ${toc-tic} nanos.`);

		tic = process.hrtime()[1]; // +new Date;
		const jres = simPairwise(simFuncs.jaccard, targets);
		toc = process.hrtime()[1]; // +new Date;
		console.log(`All pairs Jaccard on mini DB took ${toc-tic} nanos.`);

		tic = process.hrtime()[1];
		expect(jres.length).toBe(10);
		expect(jres).toEqual(jexp);
		toc = process.hrtime()[1];
		console.log(`Running Jest expect took ${toc-tic} nanos.`);
	});
	
});
