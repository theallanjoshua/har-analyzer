import { useMemo, useState } from 'react';
import type { ContentTypeGroup } from '~/utils/content-type';
import { getEntriesFromHAR, getHAREntriesFilteredByContentType, type HAREntry, type HarContent } from '~/utils/har';
import VerticalGap from '../vertical-gap';
import ContentTypeFilter from './content-type-filter';
import ListHAREntries from './list-har-entries';

interface HAREntriesViewerProps {
	harContent?: HarContent;
	onChange: (selectedHAREntry: HAREntry) => void;
}

export default function HAREntriesViewer({ harContent, onChange }: HAREntriesViewerProps) {
	const [contentTypeFilters, setContentTypeFilters] = useState<ContentTypeGroup[]>([]);

	const harEntries = useMemo(() => getEntriesFromHAR(harContent), [harContent]);

	const harEntriesFilteredByContentType = useMemo(
		() => getHAREntriesFilteredByContentType(harEntries, contentTypeFilters),
		[harEntries, contentTypeFilters],
	);

	if (!harEntries.length) {
		return;
	}

	return (
		<VerticalGap>
			<ContentTypeFilter contentTypeFilters={contentTypeFilters} onChange={setContentTypeFilters} />
			<ListHAREntries harEntries={harEntriesFilteredByContentType} onChange={onChange} />
		</VerticalGap>
	);
}
