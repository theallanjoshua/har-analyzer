export function objectKeys<T extends object>(obj: T): Array<keyof T> {
	return Object.keys(obj) as Array<keyof T>;
}

export function objectEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
	return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

export function objectFromEntries<K extends PropertyKey, V>(entries: Iterable<readonly [K, V]>): { [key in K]: V } {
	return Object.fromEntries(entries) as { [key in K]: V };
}
