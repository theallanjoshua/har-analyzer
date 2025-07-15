import useLocalStorageState from 'use-local-storage-state';

export default function useLocalStorage<T>(localStorageKey: string, defaultValue: T) {
	return useLocalStorageState(localStorageKey, {
		defaultValue,
	});
}
