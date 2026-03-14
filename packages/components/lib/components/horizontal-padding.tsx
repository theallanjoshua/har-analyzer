import type { PropsWithChildren } from 'react';
import Box from '@cloudscape-design/components/box';

export function HorizontalPadding({ children }: PropsWithChildren) {
	return (
		<Box padding={{ horizontal: 'm' }}>
			{children}
		</Box>
	);
}
