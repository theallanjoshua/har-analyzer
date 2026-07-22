import { useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import CollapsibleKeyValueList from '~/components/collapsible-key-value-list';
import CollapsibleSection from '~/components/collapsible-section';
import VerticalGap from '~/components/vertical-gap';
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
			<CollapsibleKeyValueList
				sectionTitle='Query Parameters'
				items={items}
			/>
			<CollapsibleSection title='Request Payload'>
				<ContentViewer content={content} mimeType={mimeType} />
			</CollapsibleSection>
		</VerticalGap>
	);
}
