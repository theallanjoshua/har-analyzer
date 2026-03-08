import { useHARAnalyzerPreferences } from '~/features/har-analyzer-preferences';

export function useAppContentWidthPreference() {
	return useHARAnalyzerPreferences('isFullContentWidth', true);
}

export function useThemePreference() {
	return useHARAnalyzerPreferences('isDarkTheme', false);
}
