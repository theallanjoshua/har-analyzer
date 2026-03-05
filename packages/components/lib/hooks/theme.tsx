import useLocalStorage from './local-storage';

export default function useTheme() {
	return useLocalStorage('isDarkTheme', false);
}
