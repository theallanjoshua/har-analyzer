import VerticalGap from '~/components/shared/vertical-gap';
import type { HAREntry } from '~/utils/har';
import ListItems from './list-items';

interface HeadersViewerProps {
	harEntry: HAREntry;
}

export default function HeadersViewer({ harEntry }: HeadersViewerProps) {
	return (
		<VerticalGap>
			<ListItems
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
			<ListItems title="Request Headers" items={harEntry.request.headers} />
			<ListItems title="Response Headers" items={harEntry.response.headers} />
		</VerticalGap>
	);
}
