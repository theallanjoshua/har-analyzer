import { useHARAnalyzerPreferences } from '~/har-analyzer-preferences';

export function useAppContentWidthPreference() {
	return useHARAnalyzerPreferences('isFullContentWidth', false);
}

export function useThemePreference() {
	return useHARAnalyzerPreferences('isDarkTheme', false);
}
