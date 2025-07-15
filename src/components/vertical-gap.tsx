import SpaceBetween, { type SpaceBetweenProps } from '@cloudscape-design/components/space-between';

type VerticalGapProps = Omit<SpaceBetweenProps, 'size' | 'direction'> & { size?: SpaceBetweenProps['size'] };

export default function VerticalGap({ children, ...props }: VerticalGapProps) {
	return (
		<SpaceBetween size="xxl" {...props}>
			{children}
		</SpaceBetween>
	);
}
