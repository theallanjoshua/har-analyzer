import AppLayout from '@cloudscape-design/components/app-layout';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import SplitPanel from '@cloudscape-design/components/split-panel';
import useAppContentWidth from '~/hooks/app-content-width';
import { useSplitPanelPreferences, useSplitPanelSize } from '~/hooks/split-panel-preferences';
import EnhancedTopNavigation, { ENHANCED_TOP_NAVIGATION_ID } from './enhanced-top-navigation';
import SimpleAppPreferences from './simple-app-preferences';

export interface SimpleAppLayoutProps {
	logo?: React.ReactNode;
	appName: string;
	content: React.ReactNode;
	splitPanelTitle?: string;
	splitPanelContent?: React.ReactNode;
	isSplitPanelOpen?: boolean;
	onSplitPanelToggle?: (isOpen: boolean) => void;
}

export default function SimpleAppLayout({
	logo,
	appName,
	content,
	splitPanelTitle = 'Details',
	splitPanelContent,
	isSplitPanelOpen,
	onSplitPanelToggle,
}: SimpleAppLayoutProps) {
	const [isFullContentWidth] = useAppContentWidth();
	const [splitPanelSize, setSplitPanelSize] = useSplitPanelSize();
	const [splitPanelPreferences, setSplitPanelPreferences] = useSplitPanelPreferences();

	return (
		<I18nProvider locale="en" messages={[enMessages]}>
			<EnhancedTopNavigation logo={logo} appName={appName} utilities={<SimpleAppPreferences />} />
			<AppLayout
				headerSelector={`#${ENHANCED_TOP_NAVIGATION_ID}`}
				navigationHide
				toolsHide
				maxContentWidth={isFullContentWidth ? Number.MAX_VALUE : undefined}
				content={content}
				splitPanel={splitPanelContent && <SplitPanel header={splitPanelTitle}>{splitPanelContent}</SplitPanel>}
				splitPanelOpen={isSplitPanelOpen}
				onSplitPanelToggle={onSplitPanelToggle ? ({ detail }) => onSplitPanelToggle(detail.open) : undefined}
				splitPanelSize={splitPanelSize}
				onSplitPanelResize={({ detail }) => setSplitPanelSize(detail.size)}
				splitPanelPreferences={splitPanelPreferences}
				onSplitPanelPreferencesChange={({ detail }) => setSplitPanelPreferences(detail)}
			/>
		</I18nProvider>
	);
}
