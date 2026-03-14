import type { PropsWithChildren } from 'react';
import Tabs from '@cloudscape-design/components/tabs';
import { lazy, useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import { HorizontalPadding } from '~/components/horizontal-padding';
import LazyLoad from '~/components/lazy-load';

const HeadersViewer = lazy(() => import('./components/headers-viewer'));
const PayloadViewer = lazy(() => import('./components/payload-viewer'));
const ResponseViewer = lazy(() => import('./components/response-viewer'));
const ContentViewer = lazy(() => import('./components/content-viewer'));

function TabContent({ children }: PropsWithChildren) {
	return <LazyLoad>
		<HorizontalPadding>
			{children}
		</HorizontalPadding>
	</LazyLoad>;
};

export interface ViewHAREntryProps {
	harEntry: HAREntry;
}

export default function ViewHAREntry({ harEntry }: ViewHAREntryProps) {
	const stringifiedHAREntry = useMemo(() => JSON.stringify(harEntry), [harEntry]);

	return (
		<Tabs
			tabs={[
				{
					label: 'Headers',
					id: 'headers',
					content: <TabContent><HeadersViewer harEntry={harEntry} /></TabContent>,
				},
				{
					label: 'Payload',
					id: 'payload',
					content: <TabContent><PayloadViewer harEntry={harEntry} /></TabContent>,
				},
				{
					label: 'Response',
					id: 'response',
					content: <TabContent><ResponseViewer harEntry={harEntry} /></TabContent>,
				},
				{
					label: 'HAR Entry',
					id: 'har-entry',
					content: <TabContent><ContentViewer content={stringifiedHAREntry} mimeType="json" /></TabContent>,
				},
			]}
		/>
	);
}
