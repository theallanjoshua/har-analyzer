import AppLayout from '@cloudscape-design/components/app-layout';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import useAppContentWidth from '~/hooks/app-content-width';
import EnhancedTopNavigation, { ENHANCED_TOP_NAVIGATION_ID } from './enhanced-top-navigation';
import SimpleAppPreferences from './simple-app-preferences';

export interface SimpleAppLayoutProps {
	logo?: React.ReactNode;
	appName: string;
	content: React.ReactNode;
}

export default function SimpleAppLayout({
	logo,
	appName,
	content,
}: SimpleAppLayoutProps) {
	const [isFullContentWidth] = useAppContentWidth();

	return (
		<I18nProvider locale="en" messages={[enMessages]}>
			<EnhancedTopNavigation logo={logo} appName={appName} utilities={<SimpleAppPreferences />} />
			<AppLayout
				headerSelector={`#${ENHANCED_TOP_NAVIGATION_ID}`}
				navigationHide
				toolsHide
				maxContentWidth={isFullContentWidth ? Number.MAX_VALUE : undefined}
				content={content}
			/>
		</I18nProvider>
	);
}
