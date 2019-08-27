
export function jaccard(a: Set<any> | Map<any, any>, b: Set<any> | Map<any, any>) {
	const unionSize = new Set([...a, ...b]).size;
	const intersectSize = a.size + b.size - unionSize;
	return intersectSize / unionSize;
}


/**
 * @todo implement jaccard from particular node to all others
 * @param set set of nodes to consider
 * @param n node to compute similarity to
 * @param cutoff similarity value below which a pair is omitted from the return struct
 * @param k top-k similar neighbors
 */


/**
 * @todo implement pairwise jaccard
 * @param set of nodes to consider
 * @param cutoff similarity value below which a pair is omitted from the return struct
 * @param k top-k similar neighbors
 */



/**
 * @works, but we would have to completely re-vamp Graphinius typed edge traversals
 * 				 in order to speed the code up by a factor of ~2...
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