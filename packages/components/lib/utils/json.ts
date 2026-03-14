export function safeDeserialize<T>(jsonString: string) {
	try {
		const json = JSON.parse(jsonString) as T;
		return [json, undefined] as const;
	} catch (error) {
		console.warn('Failed to parse JSON string:', jsonString, 'Error:', error);
		return [undefined, error] as const;
	}
}
