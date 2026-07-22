import type { HAREntry } from '~/utils/har';
import CollapsibleSection from '~/components/collapsible-section';
import ContentViewer from './content-viewer';

interface ResponsePayloadProps {
	harEntry: HAREntry;
}

export default function ResponsePayload({ harEntry }: ResponsePayloadProps) {
	const content = harEntry.response.content.text ?? '';
	const encoding = harEntry.response.content.encoding;
	const mimeType = harEntry.response.content.mimeType;

	return (
		<CollapsibleSection title='Response Payload'>
			<ContentViewer content={content} encoding={encoding} mimeType={mimeType} />
		</CollapsibleSection>
	);
}
