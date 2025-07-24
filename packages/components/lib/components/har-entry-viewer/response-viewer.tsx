import CollapsibleSection from '~/components/shared/collapsible-section';
import type { HAREntry } from '~/utils/har';
import ContentViewer from './content-viewer';

interface ResponseViewerProps {
	harEntry: HAREntry;
}

export default function ResponseViewer({ harEntry }: ResponseViewerProps) {
	const content = harEntry.response.content.text || '';
	const encoding = harEntry.response.content.encoding;
	const mimeType = harEntry.response.content.mimeType;

	return (
		<CollapsibleSection title="Response">
			<ContentViewer content={content} encoding={encoding} mimeType={mimeType} />
		</CollapsibleSection>
	);
}
