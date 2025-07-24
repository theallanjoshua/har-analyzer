import useLocalStorage from './local-storage.js';

export default function useAppContentWidth() {
	return useLocalStorage('isFullContentWidth', false);
}
