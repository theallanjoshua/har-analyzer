import { createUserPreferencesContext } from '~/context/user-preferences';
import { objectKeys } from '~/utils/common';
import { DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP } from '~/utils/har';

const PREFERENCES_GROUP_NAME = 'har-entries-viewer';

export const {
	useUserPreferences: useCompareModePreference,
	Provider: CompareModeProvider,
} = createUserPreferencesContext(`${PREFERENCES_GROUP_NAME}.isCompareMode`, false);

const DEFAULT_HAR_ENTRY_HEADERS_PREFERENCE = objectKeys(DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP)[0]!;

export const {
	useUserPreferences: useHAREntryHeadersPreference,
	Provider: HAREntryHeadersProvider,
} = createUserPreferencesContext<string[]>(`${PREFERENCES_GROUP_NAME}.harEntryHeaders`, [DEFAULT_HAR_ENTRY_HEADERS_PREFERENCE]);
