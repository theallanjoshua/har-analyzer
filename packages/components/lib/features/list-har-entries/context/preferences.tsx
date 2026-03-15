import type { EnhancedTablePreferences } from '~/components/enhanced-table';
import type { ContentTypeGroup } from '~/utils/content-type';
import { createUserPreferencesContext } from '~/context/user-preferences';

const DEFAULT_TABLE_PREFERENCES: EnhancedTablePreferences = {
	collectionPreferences: undefined,
	preferredColumnWidths: [],
};

const PREFERENCES_GROUP_NAME = 'list-har-entries';

export const {
	useUserPreferences: useTablePreferences,
	Provider: TablePreferencesProvider,
} = createUserPreferencesContext(`${PREFERENCES_GROUP_NAME}.harEntriesTablePreferences`, DEFAULT_TABLE_PREFERENCES);

export const {
	useUserPreferences: useCompareModePreference,
	Provider: CompareModeProvider,
} = createUserPreferencesContext(`${PREFERENCES_GROUP_NAME}.isCompareMode`, false);

export const {
	useUserPreferences: useErrorsFilterPreference,
	Provider: ErrorsFilterProvider,
} = createUserPreferencesContext(`${PREFERENCES_GROUP_NAME}.shouldFilterErrors`, false);

const DEFAULT_CONTENT_TYPE_FILTERS_PREFERENCE: ContentTypeGroup[] = [];

export const {
	useUserPreferences: useContentTypeFiltersPreference,
	Provider: ContentTypeFiltersProvider,
} = createUserPreferencesContext(`${PREFERENCES_GROUP_NAME}.contentTypeFilters`, DEFAULT_CONTENT_TYPE_FILTERS_PREFERENCE);
