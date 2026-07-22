import type { ReactNode } from 'react';
import Box from '@cloudscape-design/components/box';
import { useMemo } from 'react';
import CollapsibleSection from '~/components/collapsible-section';
import type { EnhancedTableProps } from './enhanced-table';
import EnhancedTable from './enhanced-table';
import InlineCopyToClipboard from './inline-copy-to-clipboard';

interface CollapsibleKeyValueListItem {
	id: string;
	name: string;
	value: string;
	content?: ReactNode;
}

interface CollapsibleKeyValueListProps {
	items: CollapsibleKeyValueListItem[];
	sectionTitle: string;
	keyTitle?: string;
	valueTitle?: string;
}

export default function CollapsibleKeyValueList(props: CollapsibleKeyValueListProps) {
	const {
		items,
		sectionTitle,
		keyTitle = 'Name',
		valueTitle = 'Value',
	} = props;

	const columnsDefinition: EnhancedTableProps<CollapsibleKeyValueListItem>['columnsDefinition'] = useMemo(() => ({
		key: {
			header: keyTitle,
			cell: ({ name }) => {
				return {
					value: name,
				};
			},
		},
		value: {
			header: valueTitle,
			cell: ({ value, content }) => {
				if (!value) {
					return {
						value: '-',
						content: content ?? <Box variant='span'>-</Box>,
					};
				}

				return {
					value,
					content: content ?? <InlineCopyToClipboard textToCopy={value} />,
				};
			},
		},
	}), [keyTitle, valueTitle]);

	return (
		<CollapsibleSection variant='footer' title={sectionTitle}>
			<EnhancedTable
				contentDensity='compact'
				items={items}
				getRowId={({ id }) => id}
				columnsDefinition={columnsDefinition}
			/>
		</CollapsibleSection>
	);
}
