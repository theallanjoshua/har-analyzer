import { createTablePreferencesContext } from '~/components/enhanced-table/preferences';

const PREFERENCES_GROUP_NAME = 'view-har-entry';

export const {
	useUserPreferences: useRequestHeadersTablePreferences,
	Provider: RequestHeadersTablePreferencesProvider,
} = createTablePreferencesContext(`${PREFERENCES_GROUP_NAME}.requestHeadersTablePreferences`);

export const {
	useUserPreferences: useRequestQueryParamsTablePreferences,
	Provider: RequestQueryParamsTablePreferencesProvider,
} = createTablePreferencesContext(`${PREFERENCES_GROUP_NAME}.requestQueryParamsTablePreferences`);

export const {
	useUserPreferences: useResponseHeadersTablePreferences,
	Provider: ResponseHeadersTablePreferencesProvider,
} = createTablePreferencesContext(`${PREFERENCES_GROUP_NAME}.responseHeadersTablePreferences`);
