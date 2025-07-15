import SplitPanel from '@cloudscape-design/components/split-panel';
import Tabs from '@cloudscape-design/components/tabs';
import type { HAREntry } from '~/utils/har';
import HeadersViewer from './headers-viewer';
import PayloadViewer from './payload-viewer';
import ResponseViewer from './response-viewer';

interface HAREntryViewerProps {
	harEntry: HAREntry;
}
export default function HAREntryViewer({ harEntry }: HAREntryViewerProps) {
	return (
		<SplitPanel header="Details">
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
				]}
			/>
		</SplitPanel>
	);
}
