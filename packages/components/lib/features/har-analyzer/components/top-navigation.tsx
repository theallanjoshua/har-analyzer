import Header from '@cloudscape-design/components/header';
import { borderWidthAlert, colorBorderDividerDefault } from '@cloudscape-design/design-tokens';
import HorizontalGap from '~/components/horizontal-gap';

export const TOP_NAVIGATION_ID = 'top-navigation';

const BLUR_CSS = 'blur(16px)';

interface TopNavigationProps {
	logo?: React.ReactNode;
	appName: string;
	utilities?: React.ReactNode;
}

export default function TopNavigation({
	logo,
	appName,
	utilities,
}: TopNavigationProps) {
	return (
		<nav
			id={TOP_NAVIGATION_ID}
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
