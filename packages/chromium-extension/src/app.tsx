import Box from '@cloudscape-design/components/box';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import { ExternalStoreProvider } from '@har-analyzer/components/external-state';
import HARAnalyzerExtension from '@har-analyzer/components/har-analyzer-extension';
import useBrowserTheme from './hooks/browser-theme';
import usePageHAREntries from './hooks/page-har-entries';
import { chromeLocalStore } from './utils/storage';

export default function HARAnalyzerPanel() {
	useBrowserTheme();

	const [pageHAREntries, { onClear, onReload }] = usePageHAREntries();

	return <I18nProvider locale="en" messages={[enMessages]}>
		<ExternalStoreProvider store={chromeLocalStore}>
			<Box padding={'s'}>
				<HARAnalyzerExtension
					pageHAREntries={pageHAREntries}
					onClear={onClear}
					onReload={onReload}
				/>
			</Box>
		</ExternalStoreProvider>
	</I18nProvider>;
}
