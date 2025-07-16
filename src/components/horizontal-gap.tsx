import SpaceBetween, { type SpaceBetweenProps } from '@cloudscape-design/components/space-between';

type HorizontalGapProps = Omit<SpaceBetweenProps, 'size' | 'direction'> & { size?: SpaceBetweenProps['size'] };

export default function HorizontalGap({ children, ...props }: HorizontalGapProps) {
	return (
		<SpaceBetween direction="horizontal" size="s" {...props}>
			{children}
		</SpaceBetween>
	);
}
