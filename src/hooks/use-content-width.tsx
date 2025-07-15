import useLocalStorage from './use-local-storage';

export default function useContentWidth() {
	return useLocalStorage('isFullContentWidth', false);
}
