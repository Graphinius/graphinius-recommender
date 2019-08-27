import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';

type TypedNodeSet = {[key: string]: TypedNode};

export function jaccard(a: Set<any>, b: Set<any>) {
	const unionSize = new Set([...a, ...b]).size;
	const intersectSize = a.size + b.size - unionSize;
	return intersectSize / unionSize;
}


// export type Source = [string, Set<any>];
export type Source = Set<any>;
export type Sets = {[key: string]: Set<any>};

/**
 * @description jaccard between set & particular node
 * @param s source set
 * @param t target sets to measure similarity to
 * @param c
 * @param k
 */
export function jaccardSource(s: string, t: Sets, c?: number, k?: number) {
	const result = {};
	const start = t[s];
	for ( let [k,v] of Object.entries(t)) {
		if ( k !== s ) {
			result[k] = jaccard(start, v);
		}
	}
	return result;
}


/**
 * @todo implement pairwise jaccard
 * @param s all sets
 * @param cutoff similarity value below which a pair is omitted from the return struct
 * @param k top-k similar neighbors
 */
export function jaccardPairwise(s: Sets) {
	const result = {};
	for ( let [k,v] of Object.entries(s)) {
		result[k] = jaccardSource(k, s);
	}
	return result;
}


/**
 * @description works, but we would have to completely re-vamp $G typed traversals
 * 				 			in order to speed the code up by a factor of ~2...
 * @todo Fuck speed for the moment -> concern yourself with optimization ->
 * 					!!! AFTER THE FUCKING DEMO !!!
 * @todo I think this doesn't pay off in any way...
 */
export function jaccardI32(a: Uint32Array, b: Uint32Array) {
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
	return (a.length + b.length - union.length) / union.length;
}