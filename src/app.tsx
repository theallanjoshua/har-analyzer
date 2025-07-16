import AppLayout, { type AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { useCallback, useState } from 'react';
import HAREntriesViewer from '~/components/har-entries-viewer';
import HAREntryViewer from '~/components/har-entry-viewer';
import HARFileUploader from '~/components/har-file-uploader';
import TopNavigation, { TOP_NAVIGATION_ID } from '~/components/top-navigation';
import useLocalStorage from '~/hooks/use-local-storage';
import type { HAREntry, HarContent } from '~/utils/har';
import VerticalGap from './components/vertical-gap';
import useContentWidth from './hooks/use-content-width';

export default function App() {
	const [isFullContentWidth] = useContentWidth();
	const [harContent, setHarContent] = useState<HarContent>();
	const [selectedHAREntry, setSelectedHAREntry] = useState<HAREntry>();
	const [isSplitPanelOpen, setIsSplitPanelOpen] = useState(false);
	const [splitPanelSize, setSplitPanelSize] = useLocalStorage('splitPanelSize', 480);
	const [splitPanelPreferences, setSplitPanelPreferences] = useLocalStorage<AppLayoutProps.SplitPanelPreferences>(
		'splitPanelPreferences',
		{ position: 'side' },
	);

	const onHarContentChange = useCallback((newHarContent: HarContent) => {
		setSelectedHAREntry(undefined);
		setHarContent(newHarContent);
	}, []);

	const onSelectedHAREntryChange = useCallback((harEntry: HAREntry) => {
		setIsSplitPanelOpen(true);
		setSelectedHAREntry(harEntry);
	}, []);

	return (
		<>
			<TopNavigation />
			<AppLayout
				headerSelector={`#${TOP_NAVIGATION_ID}`}
				navigationHide
				toolsHide
				maxContentWidth={isFullContentWidth ? Number.MAX_VALUE : undefined}
				content={
					<VerticalGap>
						<HARFileUploader onChange={onHarContentChange} />
						<HAREntriesViewer harContent={harContent} onChange={onSelectedHAREntryChange} />
					</VerticalGap>
				}
				splitPanel={selectedHAREntry && <HAREntryViewer harEntry={selectedHAREntry} />}
				splitPanelOpen={isSplitPanelOpen}
				onSplitPanelToggle={({ detail }) => setIsSplitPanelOpen(detail.open)}
				splitPanelSize={splitPanelSize}
				onSplitPanelResize={({ detail }) => setSplitPanelSize(detail.size)}
				splitPanelPreferences={splitPanelPreferences}
				onSplitPanelPreferencesChange={({ detail }) => setSplitPanelPreferences(detail)}
			/>
		</>
	);
}
