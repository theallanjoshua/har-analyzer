interface SplitByResult<T> {
	satisfies: T[];
	misses: T[];
}

export function splitBy<T>(array: ReadonlyArray<T>, predicate: (item: T) => boolean): SplitByResult<T> {
	return array.reduce<SplitByResult<T>>(
		(acc, item) => {
			if (predicate(item)) {
				acc.satisfies.push(item);
			} else {
				acc.misses.push(item);
			}
			return acc;
		},
		{ satisfies: [], misses: [] },
	);
}

export function removeUndefined<T>(array: ReadonlyArray<T | undefined>): T[] {
	return array.filter((item): item is T => item !== undefined);
}
