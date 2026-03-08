import HorizontalGap from '~/components/horizontal-gap';
import { useContentTypeFiltersPreference, useErrorsFilterPreference } from '~/features/har-entries-viewer/hooks/preferences';
import ContentTypeFilter from './components/content-type-filter';
import ErrorsFilter from './components/errors-filter';

export default function HAREntriesFilters() {
	const [contentTypeFilters, setContentTypeFilters] = useContentTypeFiltersPreference();
	const [shouldFilterErrors, setShouldFilterErrors] = useErrorsFilterPreference();

	return <HorizontalGap>
		<ContentTypeFilter contentTypeFilters={contentTypeFilters} onChange={setContentTypeFilters} />
		<ErrorsFilter shouldFilterErrors={shouldFilterErrors} onChange={setShouldFilterErrors} />
	</HorizontalGap>;
}
