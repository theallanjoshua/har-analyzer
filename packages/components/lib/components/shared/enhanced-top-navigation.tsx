import Header from '@cloudscape-design/components/header';
import { borderWidthAlert, colorBorderDividerDefault } from '@cloudscape-design/design-tokens';
import HorizontalGap from './horizontal-gap';

export const ENHANCED_TOP_NAVIGATION_ID = 'top-navigation';

const BLUR_CSS = 'blur(16px)';

export interface EnhancedTopNavigationProps {
	logo?: React.ReactNode;
	appName: string;
	utilities?: React.ReactNode;
}
export default function EnhancedTopNavigation({ logo, appName, utilities }: EnhancedTopNavigationProps) {
	return (
		<nav
			id={ENHANCED_TOP_NAVIGATION_ID}
			style={{
				position: 'sticky',
				top: 0,
				zIndex: 1002,
				padding: '0.5rem 1rem',
				borderBlockEnd: `${borderWidthAlert} solid ${colorBorderDividerDefault}`,
				backdropFilter: BLUR_CSS,
				WebkitBackdropFilter: BLUR_CSS, // for Safari
			}}
		>
			<Header actions={utilities}>
				<HorizontalGap>
					{logo}
					{appName}
				</HorizontalGap>
			</Header>
		</nav>
	);
}
