import CSAppLayout from '@cloudscape-design/components/app-layout';
import { ThemeProvider, useAppContentWidthPreference } from '../context/preferences';
import AppPreferences from './preferences';
import TopNavigation, { TOP_NAVIGATION_ID } from './top-navigation';

interface AppLayoutProps {
	logo?: React.ReactNode;
	appName: string;
	content: React.ReactNode;
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
		/>
	</>;
}
