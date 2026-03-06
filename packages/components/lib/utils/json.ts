export function safeDeserialize<T>(jsonString: string | undefined, defaultValue: T): T {
	try {
		return JSON.parse(jsonString ?? '') as T;
	}
	catch (error) {
		console.warn('Failed to parse JSON string:', jsonString, 'Error:', error);
		return defaultValue;
	}
}
