import { useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import CollapsibleKeyValueTable from '~/components/collapsible-key-value-table';
import CollapsibleSection from '~/components/collapsible-section';
import VerticalGap from '~/components/spacing/vertical-gap';
import { RequestQueryParamsTablePreferencesProvider, useRequestQueryParamsTablePreferences } from '../context/preferences';
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
			<RequestQueryParamsTablePreferencesProvider>
				<CollapsibleKeyValueTable
					sectionTitle='Query Parameters'
					items={items}
					useTablePreferences={useRequestQueryParamsTablePreferences}
				/>
			</RequestQueryParamsTablePreferencesProvider>
			<CollapsibleSection title='Request Payload'>
				<ContentViewer content={content} mimeType={mimeType} />
			</CollapsibleSection>
		</VerticalGap>
	);
}
