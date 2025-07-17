import { type PropertyFilterProperty, useCollection } from '@cloudscape-design/collection-hooks';
import CollectionPreferences, {
	type CollectionPreferencesProps,
} from '@cloudscape-design/components/collection-preferences';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Table, { type TableProps } from '@cloudscape-design/components/table';
import { type ReactNode, useMemo } from 'react';
import { useTablePreferences, useTablePreferredColumnWidths } from '~/hooks/table-preferences';
import { objectEntries } from '~/utils/common';

interface BaseColumnDefinition {
	header: string;
	width?: number;
	isVisibleByDefault?: boolean;
	isSortable?: boolean;
}

type DefaultColumnDefinition<TItem> = {
	type?: 'string';
	cell: (item: TItem) => {
		value: string;
		content?: ReactNode;
	};
};

type NumericColumnDefinition<TItem> = {
	type: 'number';
	cell: (item: TItem) => {
		value: number;
		content?: ReactNode;
	};
};

type DateColumnDefinition<TItem> = {
	type: 'date';
	cell: (item: TItem) => {
		value: Date;
		content?: ReactNode;
	};
};

type ListColumnDefinition<TItem> = {
	type: 'list';
	cell: (item: TItem) => {
		value: string[];
		content?: ReactNode;
	};
};

type EnhancedColumnDefinition<TItem> = BaseColumnDefinition &
	(
		| DefaultColumnDefinition<TItem>
		| NumericColumnDefinition<TItem>
		| DateColumnDefinition<TItem>
		| ListColumnDefinition<TItem>
	);

export type EnhancedTableColumnsDefinition<TItem> = Record<string, EnhancedColumnDefinition<TItem>>;

type SearchableSortableItem<TItem> = {
	[K in keyof EnhancedTableColumnsDefinition<TItem>]: ReturnType<
		EnhancedTableColumnsDefinition<TItem>[K]['cell']
	>['value'];
};

function getEnhancedTableItems<TItem>(
	originalItems: TItem[],
	enhancedColumnDefinitions: EnhancedTableColumnsDefinition<TItem>,
) {
	return originalItems.map((__originalItem__) => {
		const searchableSortableItems = objectEntries(enhancedColumnDefinitions).reduce<SearchableSortableItem<TItem>>(
			(acc, [column, { cell }]) => {
				const { value } = cell(__originalItem__);
				acc[column] = value;
				return acc;
			},
			{},
		);
		return {
			...searchableSortableItems,
			__originalItem__,
		};
	});
}

type EnhancedTableItem<TItem> = ReturnType<typeof getEnhancedTableItems<TItem>>[number];

type FilteringProperties<TItem> = readonly PropertyFilterProperty<TItem>[];

function getFilteringProperties<TItem>(
	enhancedColumnDefinitions: EnhancedTableColumnsDefinition<TItem>,
): FilteringProperties<TItem> {
	return objectEntries(enhancedColumnDefinitions).map(([column, { header, type }]) => {
		const filteringProperty = {
			key: column,
			groupValuesLabel: `${header} values`,
			propertyLabel: header,
			operators: ['=', '!=', ':', '!:', '^', '!^'],
		};
		if (type === 'number') {
			return {
				...filteringProperty,
				operators: ['=', '!=', '>', '>=', '<', '<='],
			};
		}
		if (type === 'date') {
			return {
				...filteringProperty,
				operators: [
					{ operator: '=', match: 'datetime' },
					{ operator: '!=', match: 'datetime' },
					{ operator: '>', match: 'datetime' },
					{ operator: '>=', match: 'datetime' },
					{ operator: '<', match: 'datetime' },
					{ operator: '<=', match: 'datetime' },
				],
			};
		}
		if (type === 'list') {
			return {
				...filteringProperty,
				operators: ['=', '!=', ':', '!:'],
			};
		}
		return filteringProperty;
	});
}

function getColumnDefinitions<TItem>(enhancedColumnDefinitions: EnhancedTableColumnsDefinition<TItem>) {
	return objectEntries(enhancedColumnDefinitions).map(([id, { header, width, isSortable = true, cell }]) => {
		return {
			id,
			header,
			width,
			sortingField: isSortable ? id : undefined,
			cell: (item: EnhancedTableItem<TItem>) => {
				const { value, content } = cell(item.__originalItem__);
				if (content) {
					return content;
				}
				if (value instanceof Date) {
					return value.getTime();
				}
				if (Array.isArray(value)) {
					return value.join(', ');
				}
				return value;
			},
		};
	});
}

function getColumnDisplayPreferenceOptions<TItem>(columnsDefinition: EnhancedTableColumnsDefinition<TItem>) {
	return objectEntries(columnsDefinition).map(([column, { header, isVisibleByDefault = true }]) => ({
		id: column,
		label: header,
		visible: isVisibleByDefault,
	}));
}

function getColumnDefinitionsWithPreferredWidths<TItem>(
	columnDefinitions: TableProps.ColumnDefinition<TItem>[],
	preferredColumnWidths: { id: string; width?: number }[],
) {
	return columnDefinitions.map((column) => {
		const preferredColumnWidth = preferredColumnWidths.find((columnWidth) => columnWidth.id === column.id)?.width;
		return {
			...column,
			width: preferredColumnWidth ?? column.width,
		};
	});
}

function getTablePreferencesWithoutStaleColumns<TItem>(
	tablePreferences: CollectionPreferencesProps.Preferences,
	columnDefinitions: TableProps.ColumnDefinition<TItem>[],
) {
	if (!tablePreferences.contentDisplay) {
		return tablePreferences;
	}
	const currentAvailableColumns = columnDefinitions.map(({ id }) => id);
	const contentDisplay = tablePreferences.contentDisplay.filter(({ id }) => currentAvailableColumns.includes(id));
	return {
		...tablePreferences,
		contentDisplay,
	};
}

interface EnhancedTableProps<TItem> {
	id: string;
	items: TItem[];
	columnsDefinition: EnhancedTableColumnsDefinition<TItem>;
	empty?: ReactNode;
	selectionType?: 'single' | 'multi';
	onSelectionChange?: (selectedItems: TItem[]) => void;
}

export default function EnhancedTable<TItem>({
	id,
	items: originalItems,
	columnsDefinition: enhancedColumnDefinitions,
	empty,
	selectionType,
	onSelectionChange,
}: EnhancedTableProps<TItem>) {
	const filteringProperties = useMemo(
		() => getFilteringProperties(enhancedColumnDefinitions),
		[enhancedColumnDefinitions],
	);

	const enhancedTableItems = useMemo(
		() => getEnhancedTableItems(originalItems, enhancedColumnDefinitions),
		[originalItems, enhancedColumnDefinitions],
	);

	const { items, collectionProps, propertyFilterProps, filteredItemsCount } = useCollection(enhancedTableItems, {
		propertyFiltering: {
			filteringProperties,
		},
		sorting: {},
		selection: { keepSelection: true },
	});

	const columnDisplayPreferenceOptions = useMemo(
		() => getColumnDisplayPreferenceOptions(enhancedColumnDefinitions),
		[enhancedColumnDefinitions],
	);

	const [tablePreferences, setTablePreferences] = useTablePreferences(id, {
		contentDisplay: columnDisplayPreferenceOptions,
		wrapLines: false,
	});

	const columnDefinitions = useMemo(() => getColumnDefinitions(enhancedColumnDefinitions), [enhancedColumnDefinitions]);

	const tablePreferencesWithoutStaleColumns = useMemo(
		() => getTablePreferencesWithoutStaleColumns(tablePreferences, columnDefinitions),
		[tablePreferences, columnDefinitions],
	);

	const [preferredColumnWidths, setPreferredColumnWidths] = useTablePreferredColumnWidths(id);

	const columnDefinitionsWithPreferredWidths = useMemo(
		() => getColumnDefinitionsWithPreferredWidths(columnDefinitions, preferredColumnWidths),
		[columnDefinitions, preferredColumnWidths],
	);

	return (
		<Table
			{...collectionProps}
			variant="borderless"
			resizableColumns
			stripedRows
			stickyHeader
			wrapLines={tablePreferencesWithoutStaleColumns?.wrapLines}
			columnDefinitions={columnDefinitionsWithPreferredWidths}
			columnDisplay={tablePreferencesWithoutStaleColumns?.contentDisplay}
			onColumnWidthsChange={({ detail }) => {
				const newPreferredColumnWidths = columnDefinitions.map(({ id }, index) => ({
					id,
					width: detail.widths[index],
				}));
				setPreferredColumnWidths(newPreferredColumnWidths);
			}}
			items={items}
			empty={empty}
			selectionType={selectionType}
			onSelectionChange={(event) => {
				if (collectionProps.onSelectionChange) {
					collectionProps.onSelectionChange(event);
				}
				if (onSelectionChange) {
					onSelectionChange(event.detail.selectedItems.map((item) => item.__originalItem__));
				}
			}}
			filter={
				<PropertyFilter
					countText={filteredItemsCount ? `${filteredItemsCount} matches` : undefined}
					{...propertyFilterProps}
				/>
			}
			preferences={
				<CollectionPreferences
					wrapLinesPreference={{}}
					contentDisplayPreference={{ options: columnDisplayPreferenceOptions, enableColumnFiltering: true }}
					preferences={tablePreferencesWithoutStaleColumns}
					onConfirm={({ detail }) => setTablePreferences(detail)}
				/>
			}
		/>
	);
}
