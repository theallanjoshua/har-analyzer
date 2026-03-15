import Multiselect from '@cloudscape-design/components/multiselect';
import { CONTENT_TYPE_GROUPS } from '~/utils/content-type';
import { useContentTypeFiltersPreference } from '../context/preferences';

const CONTENT_TYPE_FILTER_OPTIONS = CONTENT_TYPE_GROUPS.map((group) => ({
	value: group,
	label: group,
}));

type ContentTypeFilterOptions = typeof CONTENT_TYPE_FILTER_OPTIONS;

export default function ContentTypeFilter() {
	const [contentTypeFilters, setContentTypeFilters] = useContentTypeFiltersPreference();

	const selectedContentTypeFilterOptions = CONTENT_TYPE_FILTER_OPTIONS.filter(({ value }) =>
		contentTypeFilters.includes(value),
	);

	const onContentTypeFilterChange = (newSelectedContentTypeFilterOptions: ContentTypeFilterOptions) => {
		const contentTypeFilters = newSelectedContentTypeFilterOptions.map(({ value }) => value);
		setContentTypeFilters(contentTypeFilters);
	};

	return (
		<Multiselect
			placeholder={'Filter by content type'}
			options={CONTENT_TYPE_FILTER_OPTIONS}
			selectedOptions={selectedContentTypeFilterOptions}
			onChange={({ detail }) => { onContentTypeFilterChange(detail.selectedOptions as ContentTypeFilterOptions); }}
		/>
	);
}
