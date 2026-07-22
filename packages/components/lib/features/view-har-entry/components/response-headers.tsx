import { useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import CollapsibleKeyValueList from '~/components/collapsible-key-value-list';

export default function ResponseHeaders({ harEntry }: { harEntry: HAREntry }) {
	const items = useMemo(() => harEntry.response.headers.map((item, index) => ({
		...item,
		id: `${index}`,
	})), [harEntry.response.headers]);

	return (
		<CollapsibleKeyValueList
			items={items}
			sectionTitle='Response Headers'
		/>
	);
}
