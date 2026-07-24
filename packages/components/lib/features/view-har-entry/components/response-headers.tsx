import { useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import KeyValueTable from '~/components/key-value-table';
import { HorizontalPadding } from '~/components/spacing/horizontal-padding';
import { ResponseHeadersTablePreferencesProvider, useResponseHeadersTablePreferences } from '../user-preferences';

export default function ResponseHeaders({ harEntry }: { harEntry: HAREntry }) {
	const items = useMemo(() => harEntry.response.headers.map((item, index) => ({
		...item,
		id: `${index}`,
	})), [harEntry.response.headers]);

	return <HorizontalPadding>
		<ResponseHeadersTablePreferencesProvider>
			<KeyValueTable
				items={items}
				useTablePreferences={useResponseHeadersTablePreferences}
			/>
		</ResponseHeadersTablePreferencesProvider>
	</HorizontalPadding>;
}
