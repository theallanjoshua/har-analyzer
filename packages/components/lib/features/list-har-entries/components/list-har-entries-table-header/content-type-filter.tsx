import Multiselect from '@cloudscape-design/components/multiselect';
import { CONTENT_TYPE_GROUPS } from '~/utils/content-type';
import { useContentTypeFiltersPreference } from '../../context/preferences';

const CONTENT_TYPE_FILTER_OPTIONS = CONTENT_TYPE_GROUPS.map((group) => ({
	value: group,
	label: group,
}));

type ContentTypeFilterOptions = typeof CONTENT_TYPE_FILTER_OPTIONS;

export default function ContentTypeFilter() {
	const [contentTypeFilters, setContentTypeFilters] = useContentTypeFiltersPreference();

	const selectedOptions = CONTENT_TYPE_FILTER_OPTIONS.filter(({ value }) =>
		contentTypeFilters.includes(value),
	);

	const onContentTypeFilterChange = (newSelectedOptions: ContentTypeFilterOptions) => {
		const contentTypeFilters = newSelectedOptions.map(({ value }) => value);
		setContentTypeFilters(contentTypeFilters);
	};

	let placeholder = 'Filter by content type';

	if (selectedOptions.length) {
		placeholder = `(${selectedOptions.length}) content types selected`;
	}

	return (
		<Multiselect
			enableSelectAll
			hideTokens
			placeholder={placeholder}
			options={CONTENT_TYPE_FILTER_OPTIONS}
			selectedOptions={selectedOptions}
			onChange={({ detail }) => { onContentTypeFilterChange(detail.selectedOptions as ContentTypeFilterOptions); }}
		/>
	);
}
