import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import dbStorage from 'local-db-storage';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { UserPreferencesStore } from '@har-analyzer/components/har-analyzer-preferences-store';
import HARAnalyzer from '@har-analyzer/components/har-analyzer';
import HARAnalyzerPreferencesStore from '@har-analyzer/components/har-analyzer-preferences-store';
import '@cloudscape-design/global-styles/index.css';
import './index.scss';

const ROOT_ID = 'root';
const domNode = document.getElementById(ROOT_ID);

if (!domNode) {
	const errorMessage = `Root element not found. HTML does not contain an element with ID: "${ROOT_ID}"`;
	console.error(errorMessage);
	throw new Error(errorMessage);
}

const userPreferencesStore: UserPreferencesStore = {
	getPreference: (key: string) => dbStorage.getItem(key),
	setPreference: (key: string, value: string) => dbStorage.setItem(key, value),
};

const root = createRoot(domNode);
root.render(
	<StrictMode>
		<I18nProvider locale="en" messages={[enMessages]}>
			<HARAnalyzerPreferencesStore userPreferencesStore={userPreferencesStore}>
				<HARAnalyzer appName='Haroscope' />
			</HARAnalyzerPreferencesStore>
		</I18nProvider>
	</StrictMode>,
);
