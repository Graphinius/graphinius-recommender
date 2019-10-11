export interface HistEntry {
	freq: number;
	item: any;
}


export function kFromHist<T>(hist: Array<Set<T>>, k: number, asc: boolean = false): Array<HistEntry> {
	const result = [];
	let cnt = 0;

	function addItems(i: number) {
		const items: Set<T> = hist[i];
		if (!items) {
			return;
		}
		if (items.size === 1) {
			cnt++;
			result.push({
				freq: i,
				item: Array.from(items)[0]
			});
		} else {
			items.forEach(item => {
				if (cnt++ < k) {
					result.push({
						freq: i,
						item: item
					});
				}
			});
		}
	}

	if (asc) {
		for (let i = 0; cnt < k && i < hist.length; i++) {
			addItems(i);
		}
	} else {
		for (let i = hist.length; cnt < k && i > 0; i--) {
			addItems(i);
		}
	}
	return result;
}
