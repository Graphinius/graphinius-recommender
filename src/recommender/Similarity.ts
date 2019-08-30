import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';


/*----------------------------------*/
/*		INTERFACES, TYPES & ENUMS			*/
/*----------------------------------*/

export type SetOfSets = {[key: string]: Set<any>};

export interface Similarity {
	isect : number; // intersection (# of items)
	sim		: number; // similarity
}

export interface SimilarityEntry extends Similarity {
	from	: string;
	to 		: string;
}

export type SimilarityResult = SimilarityEntry[];

export interface TopKEntry extends Similarity {
	from: string;
	to: string;
}
export type TopKArray = TopKEntry[];
export type TopKDict = {[key:string]: TopKEntry[]};

export interface SimilarityConfig {
	cutoff?: number;
	knn?: number;
	dup?: boolean;
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
	overlap,
	cosine
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


/**
 * @description commonly used to detect sub/super relationships
 * @param a 
 * @param b 
 */
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


/**
 * 
 * @param a 
 * @param b 
 */
export function cosine(a: number[], b: number[]) {
	if ( a.length !== b.length ) {
		throw new Error('Vectors must be of same size');
	}
	const fa1 = new Float32Array(a);
	const fa2 = new Float32Array(b);
	let numerator = 0;
	for ( let i = 0; i < fa1.length; i++ ) {
			numerator += fa1[i] * fa2[i];
	}
	let dena = 0, denb = 0;
	for ( let i = 0; i < fa1.length; i++ ) {
		dena += fa1[i] * fa1[i];
		denb += fa2[i] * fa2[i];
	}
	dena = Math.sqrt(dena);
	denb = Math.sqrt(denb);
	return +(numerator / (dena * denb)).toPrecision(PRECISION);
}


export function cosineSets(a: Set<string>, b: Set<string>) {
	let aa = Array.from(a).map(l => {
		const larr = l.split('#');
		return +larr[larr.length-1]
	});
	let ba = Array.from(b).map(l => {
		const larr = l.split('#');
		return +larr[larr.length-1]
	});
	console.log(aa);
	console.log(ba);
	return cosine(aa, ba);
}



/*----------------------------------*/
/*			SIMILARITY FUNCTIONS				*/
/*----------------------------------*/

export function sim(algo: Function, a: Set<any>, b: Set<any>) {
	const sim = algo(a, b);
	return {...sim};
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
export function simSource(algo: Function, s: string, t: SetOfSets, config: SimilarityConfig = {}) : SimilarityResult {
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
export function simPairwise(algo: Function, s: SetOfSets, config: SimilarityConfig = {}) : SimilarityResult {
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
 * @description similarity of individuals of one subset to another
 * 
 * @param algo 
 * @param s1 
 * @param s2 
 * @param config
 * 
 * @returns an array of Similarity entries
 */
export function simSubsets(algo: Function, s1: SetOfSets, s2: SetOfSets, config: SimilarityConfig = {}) : SimilarityResult {
	let result: SimilarityResult = [];	
	const keys1 = Object.keys(s1);
	const keys2 = Object.keys(s2);
	for ( let i in keys1 ) {
		for ( let j in keys2 ) {
			const from = keys1[i];
			const to = keys2[j];
			const sim = algo(s1[keys1[i]], s2[keys2[j]]);
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
 * @description similarity of two groups to one another
 * 							just collects sets & calls sim()
 * 
 * @param algo
 * @param s1 
 * @param s2 
 * @param config
 * 
 * @returns an array of Similarity entries
 */
export function simGroups(algo: Function, s1: SetOfSets, s2: SetOfSets, config: SimilarityConfig = {}) : Similarity {
	throw new Error('not implemented yet');
	return {isect: 0, sim: 0};
}


/**
 * @description top-K per node
 * 
 * @param algo similarity function to use
 * @param s all sets
 * 
 * @returns most similar neighbor per node
 */
export function knnNodeArray(algo: Function, s: SetOfSets, cfg: SimilarityConfig) : TopKArray {
	const c = cfg.cutoff || 0;
	const topK: TopKArray = [];
	const dupes = {};
	for ( let node of Object.keys(s) ) {
		const topKEntries: SimilarityEntry[] = simSource(algo, node, s, {knn: cfg.knn || 1});
		topKEntries.forEach(e => {
			// console.log(e);
			if ( c == null || e.sim < c ) {
				return;
			}
			if (!cfg.dup && ( dupes[e.from] && dupes[e.from][e.to] || dupes[e.to] && dupes[e.to][e.from] ) ) {
				return;
			}		
			topK.push(e);
			dupes[e.from] = dupes[e.from] || {};
			dupes[e.from][e.to] = true;
		});
	}
	return topK.sort(simSort);
}


export function knnNodeDict(algo: Function, s: SetOfSets, cfg: SimilarityConfig) {
	const c = cfg.cutoff || 0;
	const topK: TopKDict = {};
	for ( let node of Object.keys(s) ) {
		const topKEntries: SimilarityEntry[] = simSource(algo, node, s, {knn: cfg.knn || 1});
		topKEntries.forEach(e => {
			// console.log(e);
			if ( c == null || e.sim < c) {
				return;
			}
			delete e.from;
			topK[node] = topK[node] || [];
			topK[node].push(e);
		});
		for ( let arr of Object.values(topK) ) {
			arr.sort(simSort);
		} 
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
