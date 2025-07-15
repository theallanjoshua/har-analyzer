import useLocalStorage from './use-local-storage';

export default function useTheme() {
	return useLocalStorage('isDarkTheme', false);
}
