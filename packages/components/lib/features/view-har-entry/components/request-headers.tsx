import { useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import CollapsibleKeyValueList from '~/components/collapsible-key-value-list';
import { HAREntryResponseStatus } from '~/components/har-entry-response-status';

export default function RequestHeaders({ harEntry }: { harEntry: HAREntry }) {
	const items = useMemo(() => {
		const DEFAULT_REQUEST_HEADERS = [
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
				content: <HAREntryResponseStatus harEntry={harEntry} />,
			},
		];

		const allRequestHeaders = [...DEFAULT_REQUEST_HEADERS, ...harEntry.request.headers];

		return allRequestHeaders.map((item, index) => ({
			...item,
			id: `${index}`,
		}));
	}, [harEntry]);

	return (
		<CollapsibleKeyValueList
			items={items}
			sectionTitle='Request Headers'
		/>
	);
}
