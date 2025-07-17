import AppLayout from '@cloudscape-design/components/app-layout';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import { useState } from 'react';
import HAREntriesViewer from '~/components/har-entries-viewer';
import HAREntryViewer from '~/components/har-entry-viewer';
import HARFileUploader from '~/components/har-file-uploader';
import TopNavigation, { TOP_NAVIGATION_ID } from '~/components/top-navigation';
import type { HAREntry, HarContent } from '~/utils/har';
import VerticalGap from './components/vertical-gap';
import useAppContentWidth from './hooks/app-content-width';
import '@cloudscape-design/global-styles/index.css';
import { FALLBACK_HAR_FILE_NAME } from './constants/har';
import { useSplitPanelPreferences, useSplitPanelSize } from './hooks/split-panel-preferences';

export default function App() {
	const [isFullContentWidth] = useAppContentWidth();
	const [splitPanelSize, setSplitPanelSize] = useSplitPanelSize();
	const [splitPanelPreferences, setSplitPanelPreferences] = useSplitPanelPreferences();

	const [harFileName, setHarFileName] = useState<string>();
	const [harContent, setHarContent] = useState<HarContent>();
	const [selectedHAREntry, setSelectedHAREntry] = useState<HAREntry>();
	const [isSplitPanelOpen, setIsSplitPanelOpen] = useState(false);

	const onHarContentChange = (newHarContent: HarContent, newHarFileName?: string) => {
		setHarContent(newHarContent);
		setHarFileName(newHarFileName || FALLBACK_HAR_FILE_NAME);
		setSelectedHAREntry(undefined);
	};

	const onSelectedHAREntryChange = (harEntry: HAREntry) => {
		setSelectedHAREntry(harEntry);
		setIsSplitPanelOpen(true);
	};

	return (
		<I18nProvider locale="en" messages={[enMessages]}>
			<TopNavigation />
			<AppLayout
				headerSelector={`#${TOP_NAVIGATION_ID}`}
				navigationHide
				toolsHide
				maxContentWidth={isFullContentWidth ? Number.MAX_VALUE : undefined}
				content={
					<VerticalGap>
						<HARFileUploader onChange={onHarContentChange} />
						<HAREntriesViewer harFileName={harFileName} harContent={harContent} onChange={onSelectedHAREntryChange} />
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
		</I18nProvider>
	);
}
