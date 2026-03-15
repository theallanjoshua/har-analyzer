import Box from '@cloudscape-design/components/box';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { useEffect } from 'react';
import { HARAnalyzerPreferencesStore, HAREntriesViewer } from '@har-analyzer/components';
import HorizontalGap from '~/components/horizontal-gap';
import SpaceBetween from '~/components/space-between';
import VerticalGap from '~/components/vertical-gap';
import ClearHAREntries from './components/clear-har-entries';
import DownloadHARFile from './components/download-har-file';
import ReloadHAREntries from './components/reload-har-entries';
import UploadHARFile from './components/upload-har-file';
import useHAREntries from './hooks/har-entries';
import { userPreferencesStore } from './utils/storage';

export default function HARAnalyzerPanel() {
	const [harEntries, setHAREntries] = useHAREntries();

	const applyTheme = () => {
		const isDark = chrome.devtools.panels.themeName === 'dark';
		applyMode(isDark ? Mode.Dark : Mode.Light);
	};

	useEffect(() => {
		applyTheme();
		chrome.devtools.panels.setThemeChangeHandler(applyTheme);
		return () => {
			chrome.devtools.panels.setThemeChangeHandler();
		};
	}, []);

	return <I18nProvider locale="en" messages={[enMessages]}>
		<HARAnalyzerPreferencesStore userPreferencesStore={userPreferencesStore}>
			<Box padding={'s'}>
				<VerticalGap>
					<SpaceBetween>
						<HorizontalGap>
							<ReloadHAREntries />
							<ClearHAREntries onClear={() => { setHAREntries([]); }} />
						</HorizontalGap>
						<HorizontalGap>
							<UploadHARFile />
							<DownloadHARFile harEntries={harEntries} />
						</HorizontalGap>
					</SpaceBetween>
					<HAREntriesViewer
						tableTitle="Requests"
						harEntries={harEntries}
					/>
				</VerticalGap>
			</Box>
		</HARAnalyzerPreferencesStore>
	</I18nProvider>;
}
