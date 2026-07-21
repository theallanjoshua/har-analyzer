import type { ContentTypeGroup } from '~/utils/content-type';
import { createTablePreferencesContext } from '~/components/enhanced-table/preferences';
import { createUserPreferencesContext } from '~/context/user-preferences';

const PREFERENCES_GROUP_NAME = 'list-har-entries';

export const {
	useUserPreferences: useTablePreferences,
	Provider: TablePreferencesProvider,
} = createTablePreferencesContext(`${PREFERENCES_GROUP_NAME}.harEntriesTablePreferences`);

export const {
	useUserPreferences: useErrorsFilterPreference,
	Provider: ErrorsFilterProvider,
} = createUserPreferencesContext(`${PREFERENCES_GROUP_NAME}.shouldFilterErrors`, false);

const DEFAULT_CONTENT_TYPE_FILTERS_PREFERENCE: ContentTypeGroup[] = [];

export const {
	useUserPreferences: useContentTypeFiltersPreference,
	Provider: ContentTypeFiltersProvider,
} = createUserPreferencesContext(`${PREFERENCES_GROUP_NAME}.contentTypeFilters`, DEFAULT_CONTENT_TYPE_FILTERS_PREFERENCE);
