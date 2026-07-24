import Box from '@cloudscape-design/components/box';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { useEffect } from 'react';
import { ExternalStoreProvider } from '@har-analyzer/components/external-state';
import HARAnalyzerExtension from '@har-analyzer/components/har-analyzer-extension';
import useHAREntries from './hooks/har-entries';
import { chromeLocalStore } from './utils/storage';

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
		<ExternalStoreProvider store={chromeLocalStore}>
			<Box padding={'s'}>
				<HARAnalyzerExtension
					tableTitle="Requests"
					harEntries={harEntries}
					onClear={() => {
						setHAREntries([]);
					}}
					onReload={({ ignoreCache }) => {
						chrome.devtools.inspectedWindow.reload({ ignoreCache });
					}}
				/>
			</Box>
		</ExternalStoreProvider>
	</I18nProvider>;
}
