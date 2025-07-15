import Header from '@cloudscape-design/components/header';
import { borderWidthAlert, colorBorderDividerDefault } from '@cloudscape-design/design-tokens/index.js';
import AppLevelUserPreferences from './app-level-user-preferences';

export const TOP_NAVIGATION_ID = 'footer';

const BLUR_CSS = 'blur(16px)';

export default function TopNavigation() {
	return (
		<div
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
			<Header actions={<AppLevelUserPreferences />}>HAR File Viewer</Header>
		</div>
	);
}
