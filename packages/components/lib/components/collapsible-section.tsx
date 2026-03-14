import ExpandableSection from '@cloudscape-design/components/expandable-section';
import { HorizontalPadding } from './horizontal-padding';

type CollapsibleSectionProps = React.PropsWithChildren<{
	title: string;
	variant?: 'default' | 'container' | 'footer';
}>;

export default function CollapsibleSection({
	title,
	children,
	variant = 'default',
}: CollapsibleSectionProps) {
	return (
		<ExpandableSection
			variant={variant}
			headerText={title}
			defaultExpanded
			disableContentPaddings
		>
			<HorizontalPadding>
				{children}
			</HorizontalPadding>
		</ExpandableSection>
	);
}
