import type { HAREntry } from '~/utils/har';
import VerticalGap from '../vertical-gap';
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
						value: harEntry?.request?.url,
					},
					{
						name: 'Method',
						value: harEntry?.request?.method,
					},
					{
						name: 'Status',
						value: `${harEntry?.response?.status}`,
					},
				]}
			/>
			<ListItems title="Response Headers" items={harEntry?.response?.headers} />
			<ListItems title="Request Headers" items={harEntry?.request?.headers} />
		</VerticalGap>
	);
}
