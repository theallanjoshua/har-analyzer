import type { HAREntry } from '~/utils/har';
import CollapsibleKeyValueList from '~/components/collapsible-key-value-list';
import VerticalGap from '~/components/vertical-gap';

interface HeadersViewerProps {
	harEntry: HAREntry;
}

export default function HeadersViewer({ harEntry }: HeadersViewerProps) {
	return (
		<VerticalGap size='xxxs'>
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
