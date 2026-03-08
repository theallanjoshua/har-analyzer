import Tabs from '@cloudscape-design/components/tabs';
import type { HAREntry } from '~/utils/har';
import ContentViewer from './components/content-viewer';
import HeadersViewer from './components/headers-viewer';
import PayloadViewer from './components/payload-viewer';
import ResponseViewer from './components/response-viewer';

export interface ViewHAREntryProps {
	harEntry: HAREntry;
}

export default function ViewHAREntry({ harEntry }: ViewHAREntryProps) {
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
