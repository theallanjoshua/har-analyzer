import Box from '@cloudscape-design/components/box';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { useEffect } from 'react';
import { HARAnalyzerPreferencesProvider, HAREntriesViewer } from '@har-analyzer/components';
import VerticalGap from '~/components/vertical-gap';
import HARAnalyzerActions from './components/har-analyzer-actions';
import useHAREntries from './hooks/har-entries';
import { usePreference } from './hooks/preferences.js';

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
		<HARAnalyzerPreferencesProvider usePreferenceStore={usePreference}>
			<Box padding={'s'}>
				<VerticalGap>
					<HARAnalyzerActions onClear={() => { setHAREntries([]); }} />
					<HAREntriesViewer tableId="haroscope" tableTitle="Requests" harEntries={harEntries} />
				</VerticalGap>
			</Box>
		</HARAnalyzerPreferencesProvider>
	</I18nProvider>;
}
