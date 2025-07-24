import Box from '@cloudscape-design/components/box';
import ExpandableSection from '@cloudscape-design/components/expandable-section';

type CollapsibleSectionProps = React.PropsWithChildren<{
	title: string;
}>;

export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
	return (
		<ExpandableSection variant="container" headerText={title} defaultExpanded>
			<Box margin={{ top: 's' }} />
			{children}
		</ExpandableSection>
	);
}
