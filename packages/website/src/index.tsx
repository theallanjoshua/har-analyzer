import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import useLocalStorageState from 'use-local-storage-state';
import HARAnalyzer from '@har-analyzer/components/har-analyzer';
import HARAnalyzerPreferencesProvider from '@har-analyzer/components/har-analyzer-preferences';
import '@cloudscape-design/global-styles/index.css';
import './index.scss';

const ROOT_ID = 'root';
const domNode = document.getElementById(ROOT_ID);

if (!domNode) {
	const errorMessage = `Root element not found. HTML does not contain an element with ID: "${ROOT_ID}"`;
	console.error(errorMessage);
	throw new Error(errorMessage);
}

function usePreferenceStore(key: string) {
	const [value, setValue] = useLocalStorageState<string>(key);
	return [value, setValue] as const;
}

const root = createRoot(domNode);
root.render(
	<StrictMode>
		<I18nProvider locale="en" messages={[enMessages]}>
			<HARAnalyzerPreferencesProvider usePreferenceStore={usePreferenceStore}>
				<HARAnalyzer appName='Haroscope' />
			</HARAnalyzerPreferencesProvider>
		</I18nProvider>
	</StrictMode>,
);
