import type { ReactNode } from 'react';
import CSAppLayout from '@cloudscape-design/components/app-layout';
import { ThemeProvider, useAppContentWidthPreference } from '../context/preferences';
import AppPreferences from './preferences';
import TopNavigation, { TOP_NAVIGATION_ID } from './top-navigation';

interface AppLayoutProps {
	logo?: ReactNode;
	appName: string;
	content: ReactNode;
}

export default function AppLayout({
	logo,
	appName,
	content,
}: AppLayoutProps) {
	const [isFullContentWidth] = useAppContentWidthPreference();

	return <>
		<TopNavigation
			logo={logo}
			appName={appName}
			utilities={<ThemeProvider>
				<AppPreferences />
			</ThemeProvider>}
		/>
		<CSAppLayout
			headerSelector={`#${TOP_NAVIGATION_ID}`}
			navigationHide
			toolsHide
			maxContentWidth={isFullContentWidth ? Number.MAX_VALUE : undefined}
			content={content}
			contentType='dashboard'
		/>
	</>;
}
