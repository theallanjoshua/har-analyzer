import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import { useMemo, useState } from 'react';
import withCustomErrorBoundary from '~/components/error-boundary';
import HorizontalGap from '~/components/horizontal-gap';
import type { ContentTypeGroup } from '~/utils/content-type';
import {
	getHAREntriesFilteredByContentType,
	getHAREntriesWithErrorResponse,
	getUniqueHeaderNames,
	type HAREntry,
} from '~/utils/har';
import ContentTypeFilter from './content-type-filter';
import ErrorsFilter from './errors-filter';
import ListHAREntries from './list-har-entries';

export interface HAREntriesViewerProps {
	harFileName: string;
	harEntries: HAREntry[];
	onChange: (selectedHAREntry: HAREntry) => void;
}

function HAREntriesViewer({ harFileName, harEntries, onChange }: HAREntriesViewerProps) {
	const [contentTypeFilters, setContentTypeFilters] = useState<ContentTypeGroup[]>([]);
	const [shouldFilterErrors, setShouldFilterErrors] = useState(false);

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

export default withCustomErrorBoundary(HAREntriesViewer);
