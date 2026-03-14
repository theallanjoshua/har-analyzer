import type { PropsWithChildren } from 'react';

export default function SpaceBetween({ children }: PropsWithChildren) {
	return (
		<div style={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			flexWrap: 'wrap',
			gap: '1rem',
		}}>
			{children}
		</div>
	);
}
