import { useMemo, useState } from 'react';
import { FALLBACK_HAR_FILE_NAME } from '~/constants/har';
import type { ContentTypeGroup } from '~/utils/content-type';
import {
	getEntriesFromHAR,
	getHAREntriesFilteredByContentType,
	getUniqueHeaderNames,
	type HAREntry,
	type HarContent,
} from '~/utils/har';
import VerticalGap from '../vertical-gap';
import ContentTypeFilter from './content-type-filter';
import ListHAREntries from './list-har-entries';

interface HAREntriesViewerProps {
	harFileName?: string;
	harContent?: HarContent;
	onChange: (selectedHAREntry: HAREntry) => void;
}

export default function HAREntriesViewer({ harFileName, harContent, onChange }: HAREntriesViewerProps) {
	const [contentTypeFilters, setContentTypeFilters] = useState<ContentTypeGroup[]>([]);

	const harEntries = useMemo(() => getEntriesFromHAR(harContent), [harContent]);

	const requestHeaders = useMemo(() => getUniqueHeaderNames(harEntries, 'request'), [harEntries]);
	const responseHeaders = useMemo(() => getUniqueHeaderNames(harEntries, 'response'), [harEntries]);

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
			<ListHAREntries
				harFileName={harFileName || FALLBACK_HAR_FILE_NAME}
				harEntries={harEntriesFilteredByContentType}
				totalCount={harEntries.length}
				requestHeaders={requestHeaders}
				responseHeaders={responseHeaders}
				onChange={onChange}
			/>
		</VerticalGap>
	);
}
