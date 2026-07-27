import type { PropsWithChildren } from 'react';

export interface SpaceBetweenProps extends PropsWithChildren {
	alignItems?: 'flex-start' | 'center' | 'flex-end';
}

export default function SpaceBetween(props: SpaceBetweenProps) {
	const { children, alignItems = 'flex-start' } = props;

	return (
		<div style={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems,
			flexWrap: 'wrap',
			gap: '1rem',
		}}>
			{children}
		</div>
	);
}
