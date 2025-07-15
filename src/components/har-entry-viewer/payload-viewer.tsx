import type { HAREntry } from '~/utils/har';
import CollapsibleSection from '../collapsible-section';
import VerticalGap from '../vertical-gap';
import ContentViewer from './content-viewer';
import ListItems from './list-items';

interface PayloadViewerProps {
	harEntry: HAREntry;
}

export default function PayloadViewer({ harEntry }: PayloadViewerProps) {
	const content = harEntry.request.postData?.text || '';
	const mimeType = harEntry.request.postData?.mimeType;

	return (
		<VerticalGap>
			<ListItems title="Query Parameters" items={harEntry.request.queryString} />
			<CollapsibleSection title="Request Payload">
				<ContentViewer content={content} mimeType={mimeType} />
			</CollapsibleSection>
		</VerticalGap>
	);
}
