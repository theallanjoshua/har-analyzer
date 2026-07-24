import type { ContentTypeGroup } from '~/utils/content-type';
import { createExternalState } from '~/features/external-state/factory';

const PREFERENCES_GROUP_NAME = 'har-entries-filters';

export const {
	useExternalState: useErrorsFilterPreference,
	Provider: ErrorsFilterPreferenceProvider,
} = createExternalState(`${PREFERENCES_GROUP_NAME}.shouldFilterErrors`, false);

const DEFAULT_CONTENT_TYPE_FILTERS_PREFERENCE: ContentTypeGroup[] = [];

export const {
	useExternalState: useContentTypeFiltersPreference,
	Provider: ContentTypeFiltersPreferenceProvider,
} = createExternalState(`${PREFERENCES_GROUP_NAME}.contentTypeFilters`, DEFAULT_CONTENT_TYPE_FILTERS_PREFERENCE);
