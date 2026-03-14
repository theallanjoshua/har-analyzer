import { useState } from 'react';
import type { HARFileUploaderProps } from '~/features/har-file-uploader';
import type { HAREntry } from '~/utils/har';
import SimpleAppLayout from '~/components/simple-app-layout';
import VerticalGap from '~/components/vertical-gap';
import HAREntriesViewer from '~/features/har-entries-viewer';
import HARFileUploader from '~/features/har-file-uploader';

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

	return (
		<SimpleAppLayout
			logo={logo}
			appName={appName}
			content={
				<VerticalGap>
					<HARFileUploader onChange={onHARUpload} />
					<HAREntriesViewer
						tableId="har-entries-table"
						tableTitle={harFileName}
						harEntries={harEntries}
					/>
				</VerticalGap>
			}
		/>
	);
}
