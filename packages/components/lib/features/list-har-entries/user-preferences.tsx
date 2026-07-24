import { createTablePreferencesExternalState } from '~/components/enhanced-table/preferences';

const PREFERENCES_GROUP_NAME = 'list-har-entries';

export const {
	useExternalState: useListHAREntriesTablePreferences,
	Provider: ListHAREntriesTablePreferencesProvider,
} = createTablePreferencesExternalState(`${PREFERENCES_GROUP_NAME}.harEntriesTablePreferences`);
