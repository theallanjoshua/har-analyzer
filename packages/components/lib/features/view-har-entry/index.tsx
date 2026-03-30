import type { TabsProps } from '@cloudscape-design/components/tabs';
import type { PropsWithChildren } from 'react';
import Tabs from '@cloudscape-design/components/tabs';
import {
	lazy,
	useMemo,
	useState,
} from 'react';
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

export const DEFAULT_SELECTED_TAB_ID = 'headers';
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
					label: 'Headers',
					id: DEFAULT_SELECTED_TAB_ID,
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
