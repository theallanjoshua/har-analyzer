import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import CollapsibleSection from '~/components/collapsible-section';
import InlineCopyToClipboard from './inline-copy-to-clipboard';

interface CollapsibleKeyValueListProps {
	title: string;
	items: { name: string; value: string }[];
}
export default function CollapsibleKeyValueList({ title, items = [] }: CollapsibleKeyValueListProps) {
	return (
		<CollapsibleSection title={title}>
			<ColumnLayout borders='horizontal' columns={2} disableGutters>
				{items.reduce<React.ReactElement[]>((acc, { name, value }) => {
					acc.push(<Box variant='awsui-key-label'>{name}</Box>);
					acc.push(value ? <InlineCopyToClipboard textToCopy={value} /> : <Box variant='span'>-</Box>);
					return acc;
				}, [])}
			</ColumnLayout>
		</CollapsibleSection>
	);
}
