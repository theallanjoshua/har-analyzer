import Multiselect from '@cloudscape-design/components/multiselect';
import { CONTENT_TYPE_GROUPS, type ContentTypeGroup } from '~/utils/content-type';

const CONTENT_TYPE_FILTER_OPTIONS = CONTENT_TYPE_GROUPS.map((group) => ({
	value: group,
	label: group,
}));

type ContentTypeFilterOptions = typeof CONTENT_TYPE_FILTER_OPTIONS;

interface ContentTypeFilterProps {
	contentTypeFilters: ContentTypeGroup[];
	onChange: (contentTypeFilters: ContentTypeGroup[]) => void;
}

export default function ContentTypeFilter({ contentTypeFilters, onChange }: ContentTypeFilterProps) {
	const selectedContentTypeFilterOptions = CONTENT_TYPE_FILTER_OPTIONS.filter(({ value }) =>
		contentTypeFilters.includes(value),
	);

	const onContentTypeFilterChange = (newSelectedContentTypeFilterOptions: ContentTypeFilterOptions) => {
		const contentTypeFilters = newSelectedContentTypeFilterOptions.map(({ value }) => value);
		onChange(contentTypeFilters);
	};

	return (
		<Multiselect
			placeholder={'Filter by content type'}
			selectedOptions={selectedContentTypeFilterOptions}
			onChange={({ detail }) => onContentTypeFilterChange(detail.selectedOptions as ContentTypeFilterOptions)}
			options={CONTENT_TYPE_FILTER_OPTIONS}
		/>
	);
}
