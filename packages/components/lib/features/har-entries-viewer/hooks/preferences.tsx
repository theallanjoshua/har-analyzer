import type { ContentTypeGroup } from '~/utils/content-type';
import { useHARAnalyzerPreferences } from '~/features/har-analyzer-preferences';

export function useErrorsFilterPreference() {
	return useHARAnalyzerPreferences('shouldFilterErrors', false);
}

const DEFAULT_CONTENT_TYPE_FILTERS_PREFERENCE: ContentTypeGroup[] = [];

export function useContentTypeFiltersPreference() {
	return useHARAnalyzerPreferences('contentTypeFilters', DEFAULT_CONTENT_TYPE_FILTERS_PREFERENCE);
}
