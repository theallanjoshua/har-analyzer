import { useState } from 'react';
import withCustomErrorBoundary from '~/components/error-boundary';
import SimpleAppLayout from '~/components/simple-app-layout';
import VerticalGap from '~/components/vertical-gap';
import { getEntriesFromHAR, type HAREntry } from '~/utils/har';
import HAREntriesViewer from '../har-entries-viewer';
import HAREntryViewer from '../har-entry-viewer';
import HARFileUploader, { type HARFileUploaderProps } from '../har-file-uploader';

const DEFAULT_HAR_FILE_NAME = 'unknown.har';

export interface HarAnalyzerProps {
	logo?: React.ReactNode;
	appName?: string;
}

function HarAnalyzer({ logo, appName = 'HAR Analyzer' }: HarAnalyzerProps) {
	const [harFileName, setHARFileName] = useState<string>(DEFAULT_HAR_FILE_NAME);
	const [harEntries, setHAREntries] = useState<HAREntry[]>([]);
	const [selectedHAREntry, setSelectedHAREntry] = useState<HAREntry>();
	const [isSplitPanelOpen, setIsSplitPanelOpen] = useState(false);

	const onHARUpload: HARFileUploaderProps['onChange'] = ({ harContent, harFileName }) => {
		const harEntries = getEntriesFromHAR(harContent);
		setHAREntries(harEntries);
		setHARFileName(harFileName || DEFAULT_HAR_FILE_NAME);
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
					<HARFileUploader onChange={onHARUpload} />
					<HAREntriesViewer harFileName={harFileName} harEntries={harEntries} onChange={onSelectedHAREntryChange} />
				</VerticalGap>
			}
			isSplitPanelOpen={isSplitPanelOpen}
			onSplitPanelToggle={setIsSplitPanelOpen}
			splitPanelContent={selectedHAREntry && <HAREntryViewer harEntry={selectedHAREntry} />}
		/>
	);
}

export default withCustomErrorBoundary(HarAnalyzer);
