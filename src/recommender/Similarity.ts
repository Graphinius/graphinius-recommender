import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';

export type Sets = {[key: string]: Set<any>};

export interface Similarity {
	isect : number; // intersection (# of items)
	sim		: number; // similarity
}

export interface SimilarityEntry extends Similarity {
	from	: string;
	to 		: string;
}

export type SimilarityResult = SimilarityEntry[];

const simSort = (se1: SimilarityEntry, se2: SimilarityEntry) => se2.sim - se1.sim;

const PRECISION = 5;

/**
 * ----- JACCARD -----
 *
 * @param a set A
 * @param b set B
 */
export function jaccard(a: Set<any>, b: Set<any>) : Similarity {
	const unionSize = new Set([...a, ...b]).size;
	const intersectSize = a.size + b.size - unionSize;
	return {isect: intersectSize, sim: +(intersectSize / unionSize).toPrecision(PRECISION)};
}


export const simFuncs = {
	jaccard
}



/**
 * @description jaccard between set & particular node
 * 							sorted by similarity DESC
 * @param s source set
 * @param t target sets to measure similarity to
 * @param c cutoff parameter
 * @param k kNN to consider
 */
export function simSource(algo: Function, s: string, t: Sets, c?: number, k?: number) : SimilarityResult {
	const result: SimilarityResult = [];
	const start = t[s];
	for ( let [k,v] of Object.entries(t)) {
		if ( k !== s ) {
			result.push({from: s, to: k, ...algo(start, v)});
		}
	}
	return result.sort(simSort);
}


/**
 * @description pairwise is a *symmetrical* algorithm, so we only need to
 * 							compute similarities in one direction
 * 
 * @param s all sets
 * @param cutoff similarity value below which a pair is omitted from the return struct
 * @param k top-k similar neighbors
 */
export function simPairwise(algo: Function, s: Sets) : SimilarityResult {
	const result: SimilarityResult = [];
	const done = {};

	const keys = Object.keys(s);
	for ( let i in keys ) {
		// console.log(i);
		// console.log(result);
		for ( let j = 0; j < +i; j++) {
			const from = keys[i];
			const to = keys[j];
			const jres = jaccard(s[keys[i]], s[keys[j]]);
			result.push({from, to, ...jres});
		}
	}
	return result.sort(simSort);
}






/**
 * @description works, but we would have to completely re-vamp $G typed traversals
 * 				 			in order to speed the code up by a factor of ~2...
 * @todo Fuck speed for the moment -> concern yourself with optimization ->
 * 						!!! AFTER THE FUCKING DEMO !!!
 * @todo I think this doesn't pay off in any way...
 */
export function jaccardI32(a: Uint32Array, b: Uint32Array) : Similarity {
	a = a.sort();
	b = b.sort();
	const union = [];
	let
		i = 0,
		j = 0;
	while ( i < a.length || j < b.length ) {
		if ( i >= a.length ) {
			union.push(b[j++]);
		}
		else if ( j >= b.length ) {
			union.push(a[i++]);
		}
		else {
			union.push(a[i]);
			if (a[i++] !== b[j]) {
				union.push(b[j++]);
			}
			else {
				j++;
			}
		}
	}
	const intersectSize = a.length + b.length - union.length;
	return {isect: intersectSize, sim: intersectSize / union.length};
}