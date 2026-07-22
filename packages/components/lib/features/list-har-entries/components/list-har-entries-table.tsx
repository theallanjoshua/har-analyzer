import prettyBytes from 'pretty-bytes';
import { useMemo } from 'react';
import type { EnhancedTableColumnsDefinition } from '~/components/enhanced-table';
import type { HAREntry } from '~/utils/har';
import EnhancedTable from '~/components/enhanced-table';
import { HAREntryResponseStatus } from '~/components/har-entry-response-status';
import { objectEntries } from '~/utils/common';
import { getFormattedCurrentTimeZone, getFormattedDateTime } from '~/utils/date';
import {
	DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP,
	getHAREntryHeadersToValuesMap,
	getHAREntryId,
} from '~/utils/har';
import { TablePreferencesProvider, useTablePreferences } from '../context/preferences';
import { useFilteredHAREntries } from '../hooks/filter-har-entries';

const DEFAULT_COLUMNS_DEFINITION: EnhancedTableColumnsDefinition<HAREntry> = {
	shortUrl: {
		header: 'Short URL',
		cell: (item) => {
			const value = DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP['request.shortUrl'](item);
			return { value };
		},
	},
	url: {
		header: 'URL',
		isVisibleByDefault: false,
		cell: (item) => {
			const value = DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP['request.url'](item);
			return { value };
		},
	},
	method: {
		header: 'Method',
		width: 140,
		cell: (item) => {
			const value = DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP['request.method'](item);
			return { value };
		},
	},
	status: {
		header: 'Status',
		type: 'number',
		width: 120,
		cell: (item) => {
			const value = DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP['response.status'](item);
			return { value, content: <HAREntryResponseStatus harEntry={item} /> };
		},
	},
	mimeType: {
		header: 'Mime type',
		width: 240,
		cell: (item) => {
			const value = item.response.content.mimeType;
			return { value };
		},
	},
	timeTaken: {
		header: 'Time taken',
		type: 'number',
		width: 160,
		cell: (item) => {
			const value = item.time;
			const content = `${Math.ceil(value)} ms`;
			return { value, content };
		},
	},
	size: {
		header: 'Size',
		type: 'number',
		width: 120,
		cell: (item) => {
			const value = item.response.content.size;
			const content = prettyBytes(value);
			return { value, content };
		},
	},
	localStartTime: {
		header: `Started on (${getFormattedCurrentTimeZone()})`,
		type: 'date',
		width: 280,
		cell: ({ startedDateTime }) => {
			const value = new Date(startedDateTime);
			const content = getFormattedDateTime(startedDateTime);
			return { value, content };
		},
	},
	UTCStartTime: {
		header: 'Started on (UTC)',
		type: 'date',
		width: 280,
		isVisibleByDefault: false,
		cell: ({ startedDateTime }) => {
			const value = new Date(startedDateTime);
			const content = getFormattedDateTime(startedDateTime, 'UTC');
			return { value, content };
		},
	},
};

export interface ListHAREntriesTableProps {
	harEntries: HAREntry[];
	selectedHAREntries: HAREntry[];
	onSelectionChange: (selectedHAREntries: HAREntry[]) => void;
	enableMultiSelect?: boolean;
}

export default function ListHAREntriesTable({
	harEntries,
	selectedHAREntries,
	onSelectionChange,
	enableMultiSelect = false,
}: ListHAREntriesTableProps) {
	const columnsDefinition = useMemo(() => {
		const harEntryHeadersToValuesMap = getHAREntryHeadersToValuesMap(harEntries);
		return objectEntries(harEntryHeadersToValuesMap).reduce((acc, [key, getValue]) => {
			acc[key] = {
				header: key,
				width: 200,
				isVisibleByDefault: false,
				type: 'list',
				cell: (item) => {
					const value = getValue(item);
					return { value };
				},
			};
			return acc;
		}, DEFAULT_COLUMNS_DEFINITION);
	}, [harEntries]);

	const filteredHAREntries = useFilteredHAREntries(harEntries);

	return <TablePreferencesProvider>
		<EnhancedTable
			useTablePreferences={useTablePreferences}
			contentDensity='compact'
			columnsDefinition={columnsDefinition}
			items={filteredHAREntries}
			getRowId={getHAREntryId}
			empty='No HAR entries found'
			selectionType={enableMultiSelect ? 'multi' : 'single'}
			isEntireRowSelectable
			selectedItems={selectedHAREntries}
			onSelectionChange={onSelectionChange}
		/>
	</TablePreferencesProvider>;
}
