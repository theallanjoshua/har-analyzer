import CollapsibleKeyValueList from '~/components/collapsible-key-value-list';
import withCustomErrorBoundary from '~/components/error-boundary';
import VerticalGap from '~/components/vertical-gap';
import type { HAREntry } from '~/utils/har';

interface HeadersViewerProps {
	harEntry: HAREntry;
}

function HeadersViewer({ harEntry }: HeadersViewerProps) {
	return (
		<VerticalGap>
			<CollapsibleKeyValueList
				title="General"
				items={[
					{
						name: 'URL',
						value: harEntry.request.url,
					},
					{
						name: 'Method',
						value: harEntry.request.method,
					},
					{
						name: 'Status',
						value: `${harEntry.response.status}`,
					},
				]}
			/>
			<CollapsibleKeyValueList title="Request Headers" items={harEntry.request.headers} />
			<CollapsibleKeyValueList title="Response Headers" items={harEntry.response.headers} />
		</VerticalGap>
	);
}

export default withCustomErrorBoundary(HeadersViewer);
