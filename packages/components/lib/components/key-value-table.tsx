import type { ReactNode } from 'react';
import Box from '@cloudscape-design/components/box';
import { useMemo } from 'react';
import type { EnhancedTableProps } from './enhanced-table/index';
import EnhancedTable from './enhanced-table/index';
import InlineCopyToClipboard from './inline-copy-to-clipboard';

interface KeyValueTableItem {
	id: string;
	name: string;
	value: string;
	content?: ReactNode;
}

interface KeyValueTableProps extends Pick<EnhancedTableProps<KeyValueTableItem>, 'useTablePreferences'> {
	items: KeyValueTableItem[];
	keyTitle?: string;
	valueTitle?: string;
}

export default function KeyValueTable(props: KeyValueTableProps) {
	const {
		items,
		keyTitle = 'Name',
		valueTitle = 'Value',
		useTablePreferences,
	} = props;

	const columnsDefinition: EnhancedTableProps<KeyValueTableItem>['columnsDefinition'] = useMemo(() => ({
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
		<EnhancedTable
			contentDensity='compact'
			items={items}
			getRowId={({ id }) => id}
			columnsDefinition={columnsDefinition}
			useTablePreferences={useTablePreferences}
		/>
	);
}
