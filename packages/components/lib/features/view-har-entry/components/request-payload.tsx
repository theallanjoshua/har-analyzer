import { useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import CollapsibleSection from '~/components/collapsible-section';
import KeyValueTable from '~/components/key-value-table';
import VerticalGap from '~/components/spacing/vertical-gap';
import { RequestQueryParamsTablePreferencesProvider, useRequestQueryParamsTablePreferences } from '../user-preferences';
import ContentViewer from './content-viewer';

interface RequestPayloadProps {
	harEntry: HAREntry;
}

export default function RequestPayload({ harEntry }: RequestPayloadProps) {
	const content = harEntry.request.postData?.text ?? '';
	const mimeType = harEntry.request.postData?.mimeType;

	const items = useMemo(() => harEntry.request.queryString.map((item, index) => ({
		...item,
		id: `${index}`,
	})), [harEntry.request.queryString]);

	return (
		<VerticalGap>
			<CollapsibleSection title='Query Params'>
				<RequestQueryParamsTablePreferencesProvider>
					<KeyValueTable
						items={items}
						useTablePreferences={useRequestQueryParamsTablePreferences}
					/>
				</RequestQueryParamsTablePreferencesProvider>
			</CollapsibleSection>
			<CollapsibleSection title='Request Payload'>
				<ContentViewer content={content} mimeType={mimeType} />
			</CollapsibleSection>
		</VerticalGap>
	);
}
