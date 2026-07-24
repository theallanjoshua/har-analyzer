import { createExternalState } from '~/features/external-state/factory';
import { objectKeys } from '~/utils/common';
import { DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP } from '~/utils/har';

const PREFERENCES_GROUP_NAME = 'har-entries-viewer';

export const {
	useExternalState: useCompareModePreference,
	Provider: CompareModePreferenceProvider,
} = createExternalState(`${PREFERENCES_GROUP_NAME}.isCompareMode`, false);

const DEFAULT_HAR_ENTRY_HEADERS_PREFERENCE = objectKeys(DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP)[0]!;

export const {
	useExternalState: useHAREntryHeadersPreference,
	Provider: HAREntryHeadersPreferenceProvider,
} = createExternalState<string[]>(`${PREFERENCES_GROUP_NAME}.harEntryHeaders`, [DEFAULT_HAR_ENTRY_HEADERS_PREFERENCE]);
