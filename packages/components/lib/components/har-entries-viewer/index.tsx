import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import { useMemo, useState } from 'react';
import HorizontalGap from '~/components/shared/horizontal-gap';
import type { ContentTypeGroup } from '~/utils/content-type';
import {
	getEntriesFromHAR,
	getHAREntriesFilteredByContentType,
	getHAREntriesWithErrorResponse,
	getUniqueHeaderNames,
	type HAREntry,
	type HarContent,
} from '~/utils/har';
import ContentTypeFilter from './content-type-filter';
import ErrorsFilter from './errors-filter';
import ListHAREntries from './list-har-entries';

export interface HAREntriesViewerProps {
	harFileName?: string;
	harContent?: HarContent;
	onChange: (selectedHAREntry: HAREntry) => void;
}

export default function HAREntriesViewer({ harFileName, harContent, onChange }: HAREntriesViewerProps) {
	const [contentTypeFilters, setContentTypeFilters] = useState<ContentTypeGroup[]>([]);
	const [shouldFilterErrors, setShouldFilterErrors] = useState(false);

	const harEntries = useMemo(() => getEntriesFromHAR(harContent), [harContent]);

	const requestHeaders = useMemo(() => getUniqueHeaderNames(harEntries, 'request'), [harEntries]);
	const responseHeaders = useMemo(() => getUniqueHeaderNames(harEntries, 'response'), [harEntries]);

	const harEntriesWithErrorResponse = useMemo(() => getHAREntriesWithErrorResponse(harEntries), [harEntries]);

	const harEntriesFilteredByContentType = useMemo(() => {
		const contentTypeFilterReadyHAREntries = shouldFilterErrors ? harEntriesWithErrorResponse : harEntries;
		return getHAREntriesFilteredByContentType(contentTypeFilterReadyHAREntries, contentTypeFilters);
	}, [shouldFilterErrors, harEntriesWithErrorResponse, harEntries, contentTypeFilters]);

	if (!harEntries.length) {
		return;
	}

	return (
		<Container
			header={
				<Header
					counter={`(${harEntriesFilteredByContentType.length}/${harEntries.length})`}
					actions={
						<HorizontalGap>
							<ContentTypeFilter contentTypeFilters={contentTypeFilters} onChange={setContentTypeFilters} />
							<ErrorsFilter shouldFilterErrors={shouldFilterErrors} onChange={setShouldFilterErrors} />
						</HorizontalGap>
					}
				>
					{harFileName}
				</Header>
			}
		>
			<ListHAREntries
				harEntries={harEntriesFilteredByContentType}
				requestHeaders={requestHeaders}
				responseHeaders={responseHeaders}
				onChange={onChange}
			/>
		</Container>
	);
}
