import useLocalStorage from './local-storage';

export default function useAppContentWidth() {
	return useLocalStorage('isFullContentWidth', false);
}
