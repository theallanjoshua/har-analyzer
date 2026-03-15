import { useState } from 'react';
import type { HARFileUploaderProps } from '~/features/har-file-uploader';
import type { HAREntry } from '~/utils/har';
import VerticalGap from '~/components/vertical-gap';
import HAREntriesViewer from '~/features/har-entries-viewer';
import HARFileUploader from '~/features/har-file-uploader';
import AppLayout from './components/app-layout';
import { AppContentWidthProvider } from './context/preferences';

export interface HARAnalyzerProps {
	logo?: React.ReactNode;
	appName?: string;
}

export default function HARAnalyzer({ logo, appName = 'HAR Analyzer' }: HARAnalyzerProps) {
	const [harFileName, setHARFileName] = useState<string>();
	const [harEntries, setHAREntries] = useState<HAREntry[]>([]);

	const onHARUpload: HARFileUploaderProps['onChange'] = ({ harEntries, harFileName }) => {
		setHAREntries(harEntries);
		setHARFileName(harFileName);
	};

	return <AppContentWidthProvider>
		<AppLayout
			logo={logo}
			appName={appName}
			content={
				<VerticalGap>
					<HARFileUploader onChange={onHARUpload} />
					<HAREntriesViewer
						tableTitle={harFileName}
						harEntries={harEntries}
					/>
				</VerticalGap>
			}
		/>
	</AppContentWidthProvider>;
}
