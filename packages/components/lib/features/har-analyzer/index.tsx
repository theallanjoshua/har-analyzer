import { useState } from 'react';
import type { HARFileUploaderProps } from '~/features/har-file-uploader';
import type { HAREntry } from '~/utils/har';
import SimpleAppLayout from '~/components/simple-app-layout';
import VerticalGap from '~/components/vertical-gap';
import HAREntriesViewer from '~/features/har-entries-viewer';
import HARFileUploader from '~/features/har-file-uploader';

const DEFAULT_HAR_FILE_NAME = 'unknown.har';

export interface HARAnalyzerProps {
	logo?: React.ReactNode;
	appName?: string;
}

export default function HARAnalyzer({ logo, appName = 'HAR Analyzer' }: HARAnalyzerProps) {
	const [harFileName, setHARFileName] = useState<string>(DEFAULT_HAR_FILE_NAME);
	const [harEntries, setHAREntries] = useState<HAREntry[]>([]);

	const onHARUpload: HARFileUploaderProps['onChange'] = ({ harEntries, harFileName }) => {
		setHAREntries(harEntries);
		setHARFileName(harFileName ?? DEFAULT_HAR_FILE_NAME);
	};

	return (
		<SimpleAppLayout
			logo={logo}
			appName={appName}
			content={
				<VerticalGap>
					<HARFileUploader onChange={onHARUpload} />
					<HAREntriesViewer title={harFileName} harEntries={harEntries} />
				</VerticalGap>
			}
		/>
	);
}
