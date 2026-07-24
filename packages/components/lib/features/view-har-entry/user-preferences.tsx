import { createTablePreferencesExternalState } from '~/components/enhanced-table/preferences';

const PREFERENCES_GROUP_NAME = 'view-har-entry';

export const {
	useExternalState: useRequestHeadersTablePreferences,
	Provider: RequestHeadersTablePreferencesProvider,
} = createTablePreferencesExternalState(`${PREFERENCES_GROUP_NAME}.requestHeadersTablePreferences`);

export const {
	useExternalState: useRequestQueryParamsTablePreferences,
	Provider: RequestQueryParamsTablePreferencesProvider,
} = createTablePreferencesExternalState(`${PREFERENCES_GROUP_NAME}.requestQueryParamsTablePreferences`);

export const {
	useExternalState: useResponseHeadersTablePreferences,
	Provider: ResponseHeadersTablePreferencesProvider,
} = createTablePreferencesExternalState(`${PREFERENCES_GROUP_NAME}.responseHeadersTablePreferences`);
