import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import dbStorage from 'local-db-storage';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { ExternalStore } from '@har-analyzer/components/external-state';
import { ExternalStoreProvider } from '@har-analyzer/components/external-state';
import HARAnalyzerWebsite from '@har-analyzer/components/har-analyzer-website';
import '@cloudscape-design/global-styles/index.css';
import './index.scss';

const ROOT_ID = 'root';
const domNode = document.getElementById(ROOT_ID);

if (!domNode) {
	const errorMessage = `Root element not found. HTML does not contain an element with ID: "${ROOT_ID}"`;
	console.error(errorMessage);
	throw new Error(errorMessage);
}

const store: ExternalStore = {
	get: (key: string) => dbStorage.getItem(key),
	set: (key: string, value: string) => dbStorage.setItem(key, value),
};

const root = createRoot(domNode);

root.render(
	<StrictMode>
		<I18nProvider locale="en" messages={[enMessages]}>
			<ExternalStoreProvider store={store}>
				<HARAnalyzerWebsite appName='Haroscope' />
			</ExternalStoreProvider>
		</I18nProvider>
	</StrictMode>,
);
