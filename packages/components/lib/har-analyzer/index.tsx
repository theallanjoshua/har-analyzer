import { useState } from 'react';
import type { HARFileUploaderProps } from '~/har-file-uploader';
import type { HARContent } from '~/utils/har';
import SimpleAppLayout from '~/components/simple-app-layout';
import VerticalGap from '~/components/vertical-gap';
import HARFileUploader from '~/har-file-uploader';
import HarContentViewer from '../har-content-viewer/index.js';

const DEFAULT_HAR_FILE_NAME = 'unknown.har';

export interface HARAnalyzerProps {
	logo?: React.ReactNode;
	appName?: string;
}

export default function HARAnalyzer({ logo, appName = 'HAR Analyzer' }: HARAnalyzerProps) {
	const [harFileName, setHARFileName] = useState<string>(DEFAULT_HAR_FILE_NAME);
	const [harContent, setHARContent] = useState<HARContent>();

	const onHARUpload: HARFileUploaderProps['onChange'] = ({ harContent, harFileName }) => {
		setHARContent(harContent);
		setHARFileName(harFileName ?? DEFAULT_HAR_FILE_NAME);
	};

	return (
		<SimpleAppLayout
			logo={logo}
			appName={appName}
			content={
				<VerticalGap>
					<HARFileUploader onChange={onHARUpload} />
					{harContent && <HarContentViewer harFileName={harFileName} harContent={harContent} />}
				</VerticalGap>
			}
		/>
	);
}
