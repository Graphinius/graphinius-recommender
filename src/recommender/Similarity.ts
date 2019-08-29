import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';


/*----------------------------------*/
/*		INTERFACES, TYPES & ENUMS			*/
/*----------------------------------*/

export type Sets = {[key: string]: Set<any>};

export interface Similarity {
	isect : number; // intersection (# of items)
	sim		: number; // similarity
}

export interface TopKEntry extends Similarity {
	to: string;
}

export interface SimilarityEntry extends Similarity {
	from	: string;
	to 		: string;
}

export type SimilarityResult = SimilarityEntry[];

export type TopKResult = {[key: string]: TopKEntry};

export interface SimParams {
	cutoff?: number;
	knn?: number;
}

export enum DIR {
	in = 'ins',
	out = 'outs',
	conn = 'conns'
}

/**
 * @param t1 type of node set 1
 * @param t2 type of node set 2
 * @param d1 traversal direction for t1
 * @param d2 traversal direction for t2
 * @param e1 edge type to follow for t1
 * @param e2 edge type to follow for t2
 * @param co cutoff below which entry will be omitted
 */
export interface SimPerSharedPrefConfig {
	t1: string;
	t2: string;
	d1: DIR;
	d2: DIR;
	e1: string;
	e2: string;
	co?: number;
}



/*----------------------------------*/
/*							CONSTS							*/
/*----------------------------------*/

export const simFuncs = {
	jaccard,
	overlap
}

export const simSort = (se1: SimilarityEntry, se2: SimilarityEntry) => se2.sim - se1.sim;

const PRECISION = 5;



/*----------------------------------*/
/*				SIMILARITY MEASURES				*/
/*----------------------------------*/

/**
 * @param a set A
 * @param b set B
 */
function jaccard(a: Set<any>, b: Set<any>) : Similarity {
	const ui = unionIntersect(a, b);
	return {
		isect: ui.isectSize,
		sim: +(ui.isectSize / ui.unionSize).toPrecision(PRECISION)
	}
}


function overlap(a: Set<any>, b: Set<any>) : Similarity {
	const ui = unionIntersect(a, b);
	return {
		isect: ui.isectSize,
		sim: +(ui.isectSize / Math.min(a.size, b.size)).toPrecision(PRECISION)
	}
}


function unionIntersect(a: Set<any>, b: Set<any>) {
	const unionSize = new Set([...a, ...b]).size;
	const isectSize = a.size + b.size - unionSize;
	return {unionSize, isectSize};
}



/*----------------------------------*/
/*			SIMILARITY FUNCTIONS				*/
/*----------------------------------*/

export function sim(algo: Function, a: Set<any>, b: Set<any>) {
	return algo(a, b);
}


/**
 * @description similarity between set & particular node
 * 							sorted by similarity DESC
 * 
 * @param algo similarity function to use
 * @param s source set
 * @param t target sets to measure similarity to
 * @param c cutoff parameter
 * @param k kNN to consider
 */
export function simSource(algo: Function, s: string, t: Sets, config: SimParams = {}) : SimilarityResult {
	let result: SimilarityResult = [];
	const start = t[s];
	for ( let [k,v] of Object.entries(t)) {
		if ( k === s ) {
			continue;
		}
		const sim: Similarity = algo(start, v);
		if ( config.cutoff == null || sim.sim >= config.cutoff ) {
			result.push({from: s, to: k, ...sim});
		}
	}
	result.sort(simSort);
	if ( config.knn != null && config.knn <= result.length ) {
		result = result.slice(0, config.knn);
	}
	return result.sort(simSort);
}


/**
 * @description pairwise is a *symmetrical* algorithm, so we only need to
 * 							compute similarities in one direction
 * 
 * @param algo similarity function to use
 * @param s all sets
 * @param c cutoff parameter
 * @param k kNN to consider
 */
export function simPairwise(algo: Function, s: Sets, config: SimParams = {}) : SimilarityResult {
	let result: SimilarityResult = [];	
	const keys = Object.keys(s);
	for ( let i in keys ) {
		for ( let j = 0; j < +i; j++) {
			const from = keys[i];
			const to = keys[j];
			const sim = algo(s[keys[i]], s[keys[j]]);
			if ( config.cutoff == null || sim.sim >= config.cutoff ) {
				// console.log(`${from}: ${s[keys[i]].size} | ${to}: ${s[keys[j]].size}`);
				result.push({from, to, ...sim});
			}
		}
	}
	result.sort(simSort);
	if ( config.knn != null && config.knn <= result.length ) {
		result = result.slice(0, config.knn);
	}
	return result;
}


/**
 * @description top-K per node
 * 
 * @param algo similarity function to use
 * @param s all sets
 * 
 * @returns most similar neighbor per node
 */
export function knnPerNode(algo: Function, s: Sets) : TopKResult {
	const topK: TopKResult = {};
	for ( let node of Object.keys(s) ) {
		const topKEntry: SimilarityEntry = simSource(algo, node, s, {knn: 1})[0];
		delete topKEntry.from;
		topK[node] = topKEntry;
	}
	return topK;
}


/**
 * @description Returns similarities of 2 node sets depending on shared preferences
 * @description default cutoff similarity is 1e-6
 * 
 * @param g graph
 * @param algo similarity function to use
 * @param cfg config object of type SimPerSharedPrefConfig
 * 
 * @returns something
 * 
 * @todo type return value
 * @todo get rid of graph somehow (transfer method to other class...!)
 */
export function viaSharedPrefs(g: TypedGraph, algo: Function, cfg: SimPerSharedPrefConfig ) {
	const cutoff = cfg.co == null ? 1e-6 : cfg.co;
	const sims = [];
	const t1Set = g.getNodesT(cfg.t1);
	const t2Set = g.getNodesT(cfg.t2);

	for ( let [t1Name, t1Node] of t1Set.entries() ) {
		for ( let [t2Name, t2Node] of t2Set.entries() ) {
			const prefSet1 = g[cfg.d1](t1Node, cfg.e1.toUpperCase());
			const prefSet2 = g[cfg.d2](t2Node, cfg.e2.toUpperCase());
			const sim = algo(prefSet1, prefSet2);
			if ( sim.sim >= cutoff ) {
				sims.push({from: t1Name, to: t2Name, ...sim})
			}
		}
	}
	return sims.sort(simSort);
}





/**
 * @description works, but we would have to completely re-vamp $G typed traversals
 * 				 			in order to speed the code up by a factor of ~2...
 * @todo Fuck speed for the moment -> concern yourself with optimization ->
 * 						!!! AFTER THE FUCKING DEMO !!!
 * @todo I think this doesn't pay off in any way...
 */
// function simUint32(a: Uint32Array, b: Uint32Array) : Similarity {
// 	a = a.sort();
// 	b = b.sort();
// 	const union = [];
// 	let
// 		i = 0,
// 		j = 0;
// 	while ( i < a.length || j < b.length ) {
// 		if ( i >= a.length ) {
// 			union.push(b[j++]);
// 		}
// 		else if ( j >= b.length ) {
// 			union.push(a[i++]);
// 		}
// 		else {
// 			union.push(a[i]);
// 			if (a[i++] !== b[j]) {
// 				union.push(b[j++]);
// 			}
// 			else {
// 				j++;
// 			}
// 		}
// 	}
// 	const intersectSize = a.length + b.length - union.length;
// 	return {isect: intersectSize, sim: intersectSize / union.length};
// }
