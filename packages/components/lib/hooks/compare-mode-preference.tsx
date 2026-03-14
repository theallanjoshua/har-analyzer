import { useHARAnalyzerPreferences } from '~/features/har-analyzer-preferences';

export function useCompareModePreference() {
	return useHARAnalyzerPreferences('isCompareMode', false);
}
