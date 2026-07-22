import type { ReactNode } from 'react';
import Box from '@cloudscape-design/components/box';
import { useMemo } from 'react';
import CollapsibleSection from '~/components/collapsible-section';
import type { EnhancedTableProps } from './enhanced-table/index';
import EnhancedTable from './enhanced-table/index';
import InlineCopyToClipboard from './inline-copy-to-clipboard';

interface CollapsibleKeyValueTableItem {
	id: string;
	name: string;
	value: string;
	content?: ReactNode;
}

interface CollapsibleKeyValueTableProps extends Pick<EnhancedTableProps<CollapsibleKeyValueTableItem>, 'useTablePreferences'> {
	items: CollapsibleKeyValueTableItem[];
	sectionTitle: string;
	keyTitle?: string;
	valueTitle?: string;
}

export default function CollapsibleKeyValueTable(props: CollapsibleKeyValueTableProps) {
	const {
		items,
		sectionTitle,
		keyTitle = 'Name',
		valueTitle = 'Value',
		useTablePreferences,
	} = props;

	const columnsDefinition: EnhancedTableProps<CollapsibleKeyValueTableItem>['columnsDefinition'] = useMemo(() => ({
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
				useTablePreferences={useTablePreferences}
			/>
		</CollapsibleSection>
	);
}
