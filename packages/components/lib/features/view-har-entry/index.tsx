import type { NonCancelableCustomEvent } from '@cloudscape-design/components';
import type { TabsProps } from '@cloudscape-design/components/tabs';
import type { PropsWithChildren } from 'react';
import Box from '@cloudscape-design/components/box';
import Tabs from '@cloudscape-design/components/tabs';
import {
	lazy,
	useCallback,
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

function TabActionContent({ children }: PropsWithChildren) {
	return <Box
		fontSize='body-s'
		fontWeight='light'
	>
		{children}
	</Box>;
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

	const onActiveTabIdChange = useCallback(({ detail }: NonCancelableCustomEvent<TabsProps.ChangeDetail>) => {
		const { activeTabId } = detail;
		setActiveTabId(activeTabId);
		if (onSelectedTabIdChange) {
			onSelectedTabIdChange(activeTabId);
		}
	}, [onSelectedTabIdChange]);

	const tabs: TabsProps.Tab[] = useMemo(() => {
		const stringifiedHAREntry = JSON.stringify(harEntry);

		return [
			{
				label: 'Headers',
				id: DEFAULT_SELECTED_TAB_ID,
				content: <TabContent><RequestHeaders harEntry={harEntry} /></TabContent>,
				action: <TabActionContent>(req)</TabActionContent>,
			},
			{
				label: 'Payload',
				id: 'request-payload',
				content: <TabContent><RequestPayload harEntry={harEntry} /></TabContent>,
				action: <TabActionContent>(req)</TabActionContent>,
			},
			{
				label: 'Headers',
				id: 'response-headers',
				content: <TabContent><ResponseHeaders harEntry={harEntry} /></TabContent>,
				action: <TabActionContent>(res)</TabActionContent>,
			},
			{
				label: 'Payload',
				id: 'response-payload',
				content: <TabContent><ResponsePayload harEntry={harEntry} /></TabContent>,
				action: <TabActionContent>(res)</TabActionContent>,
			},
			{
				label: 'Raw',
				id: 'har-entry',
				content: <TabContent><ContentViewer content={stringifiedHAREntry} mimeType='json' /></TabContent>,
			},
		].map((tab) => ({
			...tab,
			contentRenderStrategy: 'lazy',
		}));
	}, [harEntry]);

	return (
		<Tabs
			activeTabId={activeTabId}
			onChange={onActiveTabIdChange}
			tabs={tabs}
		/>
	);
}
