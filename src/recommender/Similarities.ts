export function jaccard(a: Set<any>, b: Set<any>) {
	const unionSize = new Set([...a, ...b]).size;
	const intersectSize = a.size + b.size - unionSize;
	return intersectSize / unionSize;
}

