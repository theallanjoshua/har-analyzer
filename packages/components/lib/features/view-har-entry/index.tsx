import type { TabsProps } from '@cloudscape-design/components/tabs';
import type { PropsWithChildren } from 'react';
import Tabs from '@cloudscape-design/components/tabs';
import {
	lazy,
	useMemo,
	useState,
} from 'react';
import type { HAREntry } from '~/utils/har';
import LazyLoad from '~/components/lazy-load';

const RequestHeaders = lazy(() => import('./components/request-headers'));
const RequestPayload = lazy(() => import('./components/request-payload'));
const ResponseHeaders = lazy(() => import('./components/response-headers'));
const ResponsePayload = lazy(() => import('./components/response-payload'));
const ContentViewer = lazy(() => import('./components/content-viewer'));

function TabContent({ children }: PropsWithChildren) {
	return <LazyLoad>
		{children}
	</LazyLoad>;
};

export const DEFAULT_SELECTED_TAB_ID = 'request-headers';
export interface ViewHAREntryProps {
	harEntry: HAREntry;
	initialSelectedTabId?: string;
	onSelectedTabIdChange?: (tabId: string) => void;
}

export default function ViewHAREntry(props: ViewHAREntryProps) {
	const {
		harEntry,
		initialSelectedTabId = DEFAULT_SELECTED_TAB_ID,
		onSelectedTabIdChange,
	} = props;

	const [activeTabId, setActiveTabId] = useState(initialSelectedTabId);

	const stringifiedHAREntry = useMemo(() => JSON.stringify(harEntry), [harEntry]);

	const onActiveTabIdChange: TabsProps['onChange'] = ({ detail }) => {
		const { activeTabId } = detail;
		setActiveTabId(activeTabId);
		if (onSelectedTabIdChange) {
			onSelectedTabIdChange(activeTabId);
		}
	};

	return (
		<Tabs
			activeTabId={activeTabId}
			onChange={onActiveTabIdChange}
			tabs={[
				{
					label: 'Request Headers',
					id: DEFAULT_SELECTED_TAB_ID,
					content: <TabContent><RequestHeaders harEntry={harEntry} /></TabContent>,
				},
				{
					label: 'Request Payload',
					id: 'request-payload',
					content: <TabContent><RequestPayload harEntry={harEntry} /></TabContent>,
				},
				{
					label: 'Response Headers',
					id: 'response-headers',
					content: <TabContent><ResponseHeaders harEntry={harEntry} /></TabContent>,
				},
				{
					label: 'Response Payload',
					id: 'response-payload',
					content: <TabContent><ResponsePayload harEntry={harEntry} /></TabContent>,
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
