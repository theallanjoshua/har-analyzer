import useLocalStorage from './local-storage.js';

export default function useTheme() {
	return useLocalStorage('isDarkTheme', false);
}
