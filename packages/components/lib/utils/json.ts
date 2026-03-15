export function safeDeserialize<T>(jsonString: string) {
	try {
		const json = JSON.parse(jsonString) as T;
		return [undefined, json] as const;
	} catch (error) {
		console.warn('Failed to parse JSON string:', jsonString, 'Error:', error);
		return [error, undefined] as const;
	}
}
