import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import CollapsibleSection from '~/components/collapsible-section';

interface CollapsibleKeyValueListProps {
	title: string;
	items: { name: string; value: string }[];
}
export default function CollapsibleKeyValueList({ title, items = [] }: CollapsibleKeyValueListProps) {
	return (
		<CollapsibleSection title={title}>
			<ColumnLayout borders="horizontal" columns={2}>
				{items.reduce<React.ReactElement[]>((acc, { name, value }) => {
					acc.push(<Box variant="awsui-key-label">{name}</Box>);
					acc.push(<Box variant="p">{value || '-'}</Box>);
					return acc;
				}, [])}
			</ColumnLayout>
		</CollapsibleSection>
	);
}
