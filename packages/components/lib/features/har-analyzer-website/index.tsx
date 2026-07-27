import type { ReactNode } from 'react';
import HAREntriesViewer from '~/features/har-entries-viewer';
import { HARFileUploader, useFileHAREntries } from '~/features/har-file-uploader';
import AppLayout from './components/app-layout';
import { AppContentWidthPreferenceProvider, ThemePreferenceProvider } from './user-preferences';

export interface HARAnalyzerWebsiteProps {
	logo?: ReactNode;
	appName?: string;
}

export default function HARAnalyzerWebsite({ logo, appName = 'HAR Analyzer' }: HARAnalyzerWebsiteProps) {
	const [{ harEntries }, { onUpload, onRemove }] = useFileHAREntries();

	return <AppContentWidthPreferenceProvider>
		<ThemePreferenceProvider>
			<AppLayout
				logo={logo}
				appName={appName}
				content={
					<HAREntriesViewer
						harEntries={harEntries}
						additionalActions={<HARFileUploader
							onUpload={onUpload}
							onRemove={onRemove}
						/>}
					/>
				}
			/>
		</ThemePreferenceProvider>
	</AppContentWidthPreferenceProvider>;
}
