import Tabs from '@cloudscape-design/components/tabs';
import type { HAREntry } from '~/utils/har';
import ContentViewer from './content-viewer';
import HeadersViewer from './headers-viewer';
import PayloadViewer from './payload-viewer';
import ResponseViewer from './response-viewer';

export interface HAREntryViewerProps {
	harEntry: HAREntry;
}
export default function HAREntryViewer({ harEntry }: HAREntryViewerProps) {
	return (
		<Tabs
			tabs={[
				{
					label: 'Headers',
					id: 'headers',
					content: <HeadersViewer harEntry={harEntry} />,
				},
				{
					label: 'Payload',
					id: 'payload',
					content: <PayloadViewer harEntry={harEntry} />,
				},
				{
					label: 'Response',
					id: 'response',
					content: <ResponseViewer harEntry={harEntry} />,
				},
				{
					label: 'HAR Entry',
					id: 'har-entry',
					content: <ContentViewer content={JSON.stringify(harEntry)} mimeType="json" />,
				},
			]}
		/>
	);
}
