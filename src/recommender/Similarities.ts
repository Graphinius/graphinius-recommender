import {TypedNode, ITypedNode} from 'graphinius/lib/core/typed/TypedNode';
import {TypedGraph} from 'graphinius/lib/core/typed/TypedGraph';

type TypedNodeSet = {[key: string]: TypedNode};

export function jaccard(a: Set<any>, b: Set<any>) {
	const unionSize = new Set([...a, ...b]).size;
	const intersectSize = a.size + b.size - unionSize;
	return intersectSize / unionSize;
}


/**
 * @description expansion from source to targets, ONE step
 * @todo refactor out into recommender class... but at the moment this is very suitable
 * 			 for iterative
 *
 * @param g graph
 * @param n node from which to expand
 * @param d direction
 * @param r relationship type to follow (only one at a time..)
 * @param t target node type to filter (only one at a time..)
 */
export function expand(g: TypedGraph, n: ITypedNode, d:string, r :string, t? :string) {
	switch(d) {
		case 'in':
			return g.ins(n, r);
		case 'out':
			return g.outs(n, r);
		case 'conn':
			return g.conns(n, r);
		default:
			throw new Error('unsupported edge direction');
	}
}


// export type Source = [string, Set<any>];
export type Source = Set<any>;
export type Targets = {[key: string]: Set<any>};

/**
 * @description jaccard between set & particular node
 * @param s source set
 * @param t target sets to measure similarity to
 * @param c
 * @param k
 */
export function jaccardSetNode(s: Source, t: Targets, c?: number, k?: number) {
	const result = {};
	for ( let [k,v] of Object.entries(t)) {
		result[k] = jaccard(s, v);
	}
	return result;
}


/**
 * @todo implement pairwise jaccard
 * @param set of nodes to consider
 * @param cutoff similarity value below which a pair is omitted from the return struct
 * @param k top-k similar neighbors
 */
export function jaccardSetAll() {

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