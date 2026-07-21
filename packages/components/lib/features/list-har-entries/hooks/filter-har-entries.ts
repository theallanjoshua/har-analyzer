import { useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import { getHAREntriesFilteredByContentType, getHAREntriesWithErrorResponse } from '~/utils/har';
import { useContentTypeFiltersPreference, useErrorsFilterPreference } from '../context/preferences';

export function useFilteredHAREntries(harEntries: HAREntry[]) {
	const [contentTypeFilters] = useContentTypeFiltersPreference();
	const [shouldFilterErrors] = useErrorsFilterPreference();

	const harEntriesWithErrorResponse = useMemo(() => getHAREntriesWithErrorResponse(harEntries), [harEntries]);

	const filteredHAREntries = useMemo(() => {
		const contentTypeFilterReadyHAREntries = shouldFilterErrors ? harEntriesWithErrorResponse : harEntries;
		return getHAREntriesFilteredByContentType(contentTypeFilterReadyHAREntries, contentTypeFilters);
	}, [shouldFilterErrors, harEntriesWithErrorResponse, harEntries, contentTypeFilters]);

	return filteredHAREntries;
}
