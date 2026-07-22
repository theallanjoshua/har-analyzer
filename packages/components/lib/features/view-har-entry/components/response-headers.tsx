import { useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import CollapsibleKeyValueTable from '~/components/collapsible-key-value-table';
import { ResponseHeadersTablePreferencesProvider, useResponseHeadersTablePreferences } from '../context/preferences';

export default function ResponseHeaders({ harEntry }: { harEntry: HAREntry }) {
	const items = useMemo(() => harEntry.response.headers.map((item, index) => ({
		...item,
		id: `${index}`,
	})), [harEntry.response.headers]);

	return <ResponseHeadersTablePreferencesProvider>
		<CollapsibleKeyValueTable
			items={items}
			sectionTitle='Response Headers'
			useTablePreferences={useResponseHeadersTablePreferences}
		/>
	</ResponseHeadersTablePreferencesProvider>;
}
