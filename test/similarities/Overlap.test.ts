import {sim, simSource, simPairwise, Similarity, simSort, simFuncs, knnNodeArray, knnNodeDict, DIR, viaSharedPrefs} from "../../src/recommender/Similarity";
import {TheExpanse} from '../../src/recommender/TheExpanse';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';
import {JSONInput} from 'graphinius/lib/io/input/JSONInput';
import {TheAugments} from '../../src/recommender/TheAugments';


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


	it('should compute OVERLAP between two simple SETS', () => {
		const jexp: Similarity = {isect: 2, sim: 0.66667};
		expect(sim(simFuncs.overlap, s_a, s_b)).toEqual(jexp);
	});


	it('should compute OVERLAP between two LARGE sets', () => {
		const jexp: Similarity = {isect: 0, sim: 0};
		expect(sim(simFuncs.overlap, s_c, s_d)).toEqual(jexp);
	});

});


/**
 * @description similarities on neo4j sample graph (overlap -> books/genres)
 */
describe('OVERLAP tests on neo4j sample graph', () => {
	
	const
		gFile = './data/books.json';
	
	let
		g: TypedGraph,
		expanse = null;
		
		
	beforeEach(() => {
		g =  new JSONInput().readFromJSONFile(gFile, new TypedGraph('BooksGenreSimilarities')) as TypedGraph;
		expanse = new TheExpanse(g);
	});

  /**
   * 
  MATCH (book:Book)-[:HAS_GENRE]->(genre)
  WITH {item:id(genre), categories: collect(id(book))} as userData
  WITH collect(userData) as data
  CALL algo.similarity.overlap.stream(data)
  YIELD item1, item2, count1, count2, intersection, similarity
  RETURN algo.asNode(item1).name AS from, algo.asNode(item2).name AS to,
        count1, count2, intersection, similarity
  ORDER BY similarity DESC
   */
  it('should get OVERLAP pairwise similarities for genres', () => {
    const oexp = [
      { from: 'fantasy', to: 'scienceFiction', isect: 3, sim: 1 },
      { from: 'dystopia', to: 'scienceFiction', isect: 2, sim: 1 },
      { from: 'classics', to: 'dystopia', isect: 2, sim: 1 },
      { from: 'classics', to: 'scienceFiction', isect: 3, sim: 0.75 },
      { from: 'classics', to: 'fantasy', isect: 2, sim: 0.66667 },
      { from: 'dystopia', to: 'fantasy', isect: 1, sim: 0.5 }
    ];
    const allSets = {};
		g.getNodesT('Genre').forEach(n => {
			allSets[n.label] = expanse.expand(n, 'in', 'HAS_GENRE');
    });
    const ores = simPairwise(simFuncs.overlap, allSets);
    // console.log(ores);
    expect(ores).toEqual(oexp);
	});
	

	it('should work with cutoff', () => {
    const oexp = [
      { from: 'fantasy', to: 'scienceFiction', isect: 3, sim: 1 },
      { from: 'dystopia', to: 'scienceFiction', isect: 2, sim: 1 },
      { from: 'classics', to: 'dystopia', isect: 2, sim: 1 },
      { from: 'classics', to: 'scienceFiction', isect: 3, sim: 0.75 }
    ];
    const allSets = {};
		g.getNodesT('Genre').forEach(n => {
			allSets[n.label] = expanse.expand(n, 'in', 'HAS_GENRE');
    });
    const ores = simPairwise(simFuncs.overlap, allSets, {cutoff: 0.75});
    expect(ores).toEqual(oexp);
	});
	

	/**
	MATCH (book:Book)-[:HAS_GENRE]->(genre)
	WITH {item:id(genre), categories: collect(id(book))} as userData
	WITH collect(userData) as data
	CALL algo.similarity.overlap.stream(data, {topK: 2})
	YIELD item1, item2, count1, count2, intersection, similarity
	RETURN algo.asNode(item1).name AS from, algo.asNode(item2).name AS to,
				count1, count2, intersection, similarity
	ORDER BY from
	 */
	it('should give the top-2 NN for each genre, ARRAY version', () => {
		const oexp = [
      { from: 'scienceFiction', to: 'fantasy', isect: 3, sim: 1 },
      { from: 'scienceFiction', to: 'dystopia', isect: 2, sim: 1 },
      { from: 'dystopia', to: 'classics', isect: 2, sim: 1 },
      { from: 'classics', to: 'scienceFiction', isect: 3, sim: 0.75 },
      { from: 'fantasy', to: 'classics', isect: 2, sim: 0.66667 }
    ];
		const allSets = {};
		g.getNodesT('Genre').forEach(n => {
			allSets[n.label] = expanse.expand(n, 'in', 'HAS_GENRE');
    });
		const ores = knnNodeArray(simFuncs.overlap, allSets, {knn: 2});
		// console.log(ores);
    expect(ores).toEqual(oexp);
	});


	it('should give the top-2 NN for each genre, DICT version', () => {
		const oexp = {
      scienceFiction: [
        { to: 'fantasy', isect: 3, sim: 1 },
        { to: 'dystopia', isect: 2, sim: 1 }
      ],
      fantasy: [
        { to: 'scienceFiction', isect: 3, sim: 1 },
        { to: 'classics', isect: 2, sim: 0.66667 }
      ],
      dystopia: [
        { to: 'scienceFiction', isect: 2, sim: 1 },
        { to: 'classics', isect: 2, sim: 1 }
      ],
      classics: [
        { to: 'dystopia', isect: 2, sim: 1 },
        { to: 'scienceFiction', isect: 3, sim: 0.75 }
      ]
    };
		const allSets = {};
		g.getNodesT('Genre').forEach(n => {
			allSets[n.label] = expanse.expand(n, 'in', 'HAS_GENRE');
    });
		const ores = knnNodeDict(simFuncs.overlap, allSets, {knn: 2});
		// console.log(ores);
    expect(ores).toEqual(oexp);
	});


	it('kNN node should accept a cutoff, ARRAY version', () => {
		const oexp = [
      { from: 'scienceFiction', to: 'fantasy', isect: 3, sim: 1 },
      { from: 'scienceFiction', to: 'dystopia', isect: 2, sim: 1 },
      { from: 'dystopia', to: 'classics', isect: 2, sim: 1 },
      { from: 'scienceFiction', to: 'classics', isect: 3, sim: 0.75 }
    ];
		const allSets = {};
		g.getNodesT('Genre').forEach(n => {
			allSets[n.label] = expanse.expand(n, 'in', 'HAS_GENRE');
    });
		const ores = knnNodeArray(simFuncs.overlap, allSets, {knn: 4, cutoff: 0.7});
		// console.log(ores);
    expect(ores).toEqual(oexp);
	});


	it('kNN node should accept a cutoff', () => {
		const oexp = {
      scienceFiction: [
        { to: 'fantasy', isect: 3, sim: 1 },
        { to: 'dystopia', isect: 2, sim: 1 },
        { to: 'classics', isect: 3, sim: 0.75 }
      ],
      fantasy: [ { to: 'scienceFiction', isect: 3, sim: 1 } ],
      dystopia: [
        { to: 'scienceFiction', isect: 2, sim: 1 },
        { to: 'classics', isect: 2, sim: 1 }
      ],
      classics: [
        { to: 'dystopia', isect: 2, sim: 1 },
        { to: 'scienceFiction', isect: 3, sim: 0.75 }
      ]
    };
		const allSets = {};
		g.getNodesT('Genre').forEach(n => {
			allSets[n.label] = expanse.expand(n, 'in', 'HAS_GENRE');
    });
		const ores = knnNodeDict(simFuncs.overlap, allSets, {knn: 4, cutoff: 0.7});
		// console.log(ores);
    expect(ores).toEqual(oexp);
	});


	/**
	MATCH (book:Book)-[:HAS_GENRE]->(genre)
	WITH {item:id(genre), categories: collect(id(book))} as userData
	WITH collect(userData) as data
	CALL algo.similarity.overlap(data, {topK: 2, similarityCutoff: 0.5, write:true})
	YIELD nodes, similarityPairs, write, writeRelationshipType, writeProperty, min, max, mean, stdDev, p25, p50, p75, p90, p95, p99, p999, p100
	RETURN nodes, similarityPairs, write, writeRelationshipType, writeProperty, min, max, mean, p95
	 */
	it.only('should add new edges based on kNN query', () => {
		const augment = new TheAugments(g);
		const relName = 'SUB_GENRE';
		const oldDirEdges = g.nrDirEdges();
		const newEdges = augment.addSubsetRelationship({ntype: 'Genre', rtype: relName, knn: 2, cutoff: 0.5});
		expect(g.nrDirEdges()).toBe(oldDirEdges + newEdges.size);

		// console.log(g.n('fantasy').outs(relName));
		// console.log(g.n('scienceFiction').outs(relName));
	});


	/**
	 * @todo implement once we have expandK capabilities ;-)
	 * 
	 * fantasy -> scienceFiction
	 * fantasy -> classics
	 * fantasy -> scienceFiction -> classics
	 */
	it.todo('should compute hierarchies');

});
