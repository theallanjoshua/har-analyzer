import { useState } from 'react';
import HAREntriesViewer from '~/components/har-entries-viewer';
import HAREntryViewer from '~/components/har-entry-viewer';
import HARFileUploader from '~/components/har-file-uploader';
import SimpleAppLayout from '~/components/shared/simple-app-layout';
import VerticalGap from '~/components/shared/vertical-gap';
import type { HAREntry, HarContent } from '~/utils/har';

export interface HarAnalyzerProps {
	logo?: React.ReactNode;
	appName: string;
}

export default function HarAnalyzer({ logo, appName }: HarAnalyzerProps) {
	const [harFileName, setHarFileName] = useState<string>();
	const [harContent, setHarContent] = useState<HarContent>();
	const [selectedHAREntry, setSelectedHAREntry] = useState<HAREntry>();
	const [isSplitPanelOpen, setIsSplitPanelOpen] = useState(false);

	const onHarContentChange = (newHarContent: HarContent, newHarFileName?: string) => {
		setHarContent(newHarContent);
		setHarFileName(newHarFileName || 'unknown.har');
		setSelectedHAREntry(undefined);
	};

	const onSelectedHAREntryChange = (harEntry: HAREntry) => {
		setSelectedHAREntry(harEntry);
		setIsSplitPanelOpen(true);
	};

	return (
		<SimpleAppLayout
			logo={logo}
			appName={appName}
			content={
				<VerticalGap>
					<HARFileUploader onChange={onHarContentChange} />
					<HAREntriesViewer harFileName={harFileName} harContent={harContent} onChange={onSelectedHAREntryChange} />
				</VerticalGap>
			}
			isSplitPanelOpen={isSplitPanelOpen}
			onSplitPanelToggle={setIsSplitPanelOpen}
			splitPanelContent={selectedHAREntry && <HAREntryViewer harEntry={selectedHAREntry} />}
		/>
	);
}
