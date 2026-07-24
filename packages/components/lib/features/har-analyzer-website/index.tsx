import type { ReactNode } from 'react';
import { useState } from 'react';
import type { HARFileUploaderProps } from '~/features/har-file-uploader';
import type { HAREntry } from '~/utils/har';
import VerticalGap from '~/components/spacing/vertical-gap';
import HAREntriesViewer from '~/features/har-entries-viewer';
import HARFileUploader from '~/features/har-file-uploader';
import AppLayout from './components/app-layout';
import { AppContentWidthPreferenceProvider, ThemePreferenceProvider } from './user-preferences';

export interface HARAnalyzerWebsiteProps {
	logo?: ReactNode;
	appName?: string;
}

export default function HARAnalyzerWebsite({ logo, appName = 'HAR Analyzer' }: HARAnalyzerWebsiteProps) {
	const [harFileName, setHARFileName] = useState<string>();
	const [harEntries, setHAREntries] = useState<HAREntry[]>([]);

	const onHARUpload: HARFileUploaderProps['onChange'] = ({ harEntries, harFileName }) => {
		setHAREntries(harEntries);
		setHARFileName(harFileName);
	};

	return <AppContentWidthPreferenceProvider>
		<ThemePreferenceProvider>
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
		</ThemePreferenceProvider>
	</AppContentWidthPreferenceProvider>;
}
