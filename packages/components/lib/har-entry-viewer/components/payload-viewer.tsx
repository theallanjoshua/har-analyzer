import type { HAREntry } from '~/utils/har';
import CollapsibleKeyValueList from '~/components/collapsible-key-value-list';
import CollapsibleSection from '~/components/collapsible-section';
import VerticalGap from '~/components/vertical-gap';
import ContentViewer from './content-viewer';

interface PayloadViewerProps {
	harEntry: HAREntry;
}

export default function PayloadViewer({ harEntry }: PayloadViewerProps) {
	const content = harEntry.request.postData?.text ?? '';
	const mimeType = harEntry.request.postData?.mimeType;

	return (
		<VerticalGap>
			<CollapsibleKeyValueList title="Query Parameters" items={harEntry.request.queryString} />
			<CollapsibleSection title="Request Payload">
				<ContentViewer content={content} mimeType={mimeType} />
			</CollapsibleSection>
		</VerticalGap>
	);
}
