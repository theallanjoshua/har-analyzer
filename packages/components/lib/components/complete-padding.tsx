import type { PropsWithChildren } from 'react';
import Box from '@cloudscape-design/components/box';

export function CompletePadding({ children }: PropsWithChildren) {
	return (
		<Box padding="m">
			{children}
		</Box>
	);
}
