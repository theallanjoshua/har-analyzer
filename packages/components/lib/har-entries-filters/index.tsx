import {
	useCallback,
	useMemo,
	useState,
} from 'react';
import type { ContentTypeGroup } from '~/utils/content-type';
import type { HAREntry } from '~/utils/har';
import HorizontalGap from '~/components/horizontal-gap';
import { getHAREntriesFilteredByContentType, getHAREntriesWithErrorResponse } from '~/utils/har';
import ContentTypeFilter from './components/content-type-filter.js';
import ErrorsFilter from './components/errors-filter.js';

export default function useHAREntriesFilters(harEntries: HAREntry[]) {
	const [contentTypeFilters, setContentTypeFilters] = useState<ContentTypeGroup[]>([]);
	const [shouldFilterErrors, setShouldFilterErrors] = useState(false);

	const harEntriesWithErrorResponse = useMemo(() => getHAREntriesWithErrorResponse(harEntries), [harEntries]);

	const filteredHAREntries = useMemo(() => {
		const contentTypeFilterReadyHAREntries = shouldFilterErrors ? harEntriesWithErrorResponse : harEntries;
		return getHAREntriesFilteredByContentType(contentTypeFilterReadyHAREntries, contentTypeFilters);
	}, [shouldFilterErrors, harEntriesWithErrorResponse, harEntries, contentTypeFilters]);

	const HAREntriesFilters = useCallback(
		() => (
			<HorizontalGap>
				<ContentTypeFilter contentTypeFilters={contentTypeFilters} onChange={setContentTypeFilters} />
				<ErrorsFilter shouldFilterErrors={shouldFilterErrors} onChange={setShouldFilterErrors} />
			</HorizontalGap>
		),
		[contentTypeFilters, shouldFilterErrors],
	);

	return {
		filteredHAREntries,
		HAREntriesFilters,
	};
}
