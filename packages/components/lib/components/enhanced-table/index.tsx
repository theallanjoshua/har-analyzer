import type { PropertyFilterProperty } from '@cloudscape-design/collection-hooks';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';
import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import type { TableProps } from '@cloudscape-design/components/table';
import type { ReactNode } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Table from '@cloudscape-design/components/table';
import {
	useCallback,
	useMemo,
	useState,
} from 'react';
import { objectEntries } from '~/utils/common';
import type { EnhancedTablePreferences } from './preferences';
import { DEFAULT_ENHANCED_TABLE_PREFERENCES } from './preferences';

interface BaseColumnDefinition {
	header: string;
	width?: number;
	isVisibleByDefault?: boolean;
	isSortable?: boolean;
}

interface DefaultColumnDefinition<TItem> {
	type?: 'string';
	cell: (item: TItem) => {
		value: string;
		content?: ReactNode;
	};
}

interface NumericColumnDefinition<TItem> {
	type: 'number';
	cell: (item: TItem) => {
		value: number;
		content?: ReactNode;
	};
}

interface DateColumnDefinition<TItem> {
	type: 'date';
	cell: (item: TItem) => {
		value: Date;
		content?: ReactNode;
	};
}

interface ListColumnDefinition<TItem> {
	type: 'list';
	cell: (item: TItem) => {
		value: string[];
		content?: ReactNode;
	};
}

type EnhancedColumnDefinition<TItem> = BaseColumnDefinition
	& (
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

function getColumnDefinitions<TItem>(enhancedColumnsDefinition: EnhancedTableColumnsDefinition<TItem>) {
	return objectEntries(enhancedColumnsDefinition).map(([id, {
		header,
		width,
		isSortable = true,
		cell,
	}]) => {
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

function getColumnDisplayPreferenceOptions<TItem>(enhancedColumnsDefinition: EnhancedTableColumnsDefinition<TItem>) {
	return objectEntries(enhancedColumnsDefinition).map(([column, { header, isVisibleByDefault = true }]) => ({
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

function getTableCollectionPreferencesWithoutStaleColumns<TItem>(
	tableCollectionPreferences: CollectionPreferencesProps.Preferences,
	columnDefinitions: TableProps.ColumnDefinition<TItem>[],
) {
	if (!tableCollectionPreferences.contentDisplay) {
		return tableCollectionPreferences;
	}
	const currentAvailableColumns = columnDefinitions.map(({ id }) => id);
	const contentDisplay = tableCollectionPreferences.contentDisplay.filter(({ id }) => currentAvailableColumns.includes(id));
	return {
		...tableCollectionPreferences,
		contentDisplay,
	};
}

export interface EnhancedTableProps<TItem> {
	items: TItem[];
	getRowId: (item: TItem) => string;
	columnsDefinition: EnhancedTableColumnsDefinition<TItem>;
	useTablePreferences?: () => [EnhancedTablePreferences, (preferences: EnhancedTablePreferences) => void];
	empty?: ReactNode;
	selectionType?: 'single' | 'multi';
	isEntireRowSelectable?: boolean;
	selectedItems?: TItem[];
	onSelectionChange?: (selectedItems: TItem[]) => void;
	contentDensity?: 'compact' | 'comfortable';
	header?: ReactNode;
	variant?: TableProps['variant'];
}

export default function EnhancedTable<TItem>({
	items: originalItems,
	getRowId,
	columnsDefinition: enhancedColumnsDefinition,
	useTablePreferences = () => useState(DEFAULT_ENHANCED_TABLE_PREFERENCES),
	empty,
	selectionType,
	isEntireRowSelectable = false,
	selectedItems = [],
	onSelectionChange,
	contentDensity = 'comfortable',
	header,
	variant = 'borderless',
}: EnhancedTableProps<TItem>) {
	const enhancedTableItems = useMemo(() => getEnhancedTableItems(originalItems, enhancedColumnsDefinition), [originalItems, enhancedColumnsDefinition]);

	const columnDefinitions = useMemo(() => getColumnDefinitions(enhancedColumnsDefinition), [enhancedColumnsDefinition]);

	const enhancedSelectedTableItems = useMemo(
		() => {
			const selectedItemIds = new Set(selectedItems.map((item) => getRowId(item)));

			return enhancedTableItems.filter((enhancedItem) =>
				selectedItemIds.has(getRowId(enhancedItem.__originalItem__)),
			);
		},
		[selectedItems, enhancedTableItems, getRowId],
	);

	const columnDisplayPreferenceOptions = useMemo(
		() => getColumnDisplayPreferenceOptions(enhancedColumnsDefinition),
		[enhancedColumnsDefinition],
	);

	const initialCollectionPreferences = useMemo(() => ({
		contentDisplay: columnDisplayPreferenceOptions,
		wrapLines: false,
	}), [columnDisplayPreferenceOptions]);

	const [{ collectionPreferences = initialCollectionPreferences, preferredColumnWidths }, setTablePreferences] = useTablePreferences();

	const tableCollectionPreferencesWithoutStaleColumns = useMemo(
		() => getTableCollectionPreferencesWithoutStaleColumns(collectionPreferences, columnDefinitions),
		[collectionPreferences, columnDefinitions],
	);

	const columnDefinitionsWithPreferredWidths = useMemo(
		() => getColumnDefinitionsWithPreferredWidths(columnDefinitions, preferredColumnWidths),
		[columnDefinitions, preferredColumnWidths],
	);

	const onCollectionPreferencesChange = useCallback((collectionPreferences: EnhancedTablePreferences['collectionPreferences']) => {
		setTablePreferences({
			collectionPreferences,
			preferredColumnWidths,
		});
	}, [setTablePreferences, preferredColumnWidths]);

	const onPreferredColumnWidthsChange = useCallback((preferredColumnWidths: EnhancedTablePreferences['preferredColumnWidths']) => {
		setTablePreferences({
			collectionPreferences,
			preferredColumnWidths,
		});
	}, [setTablePreferences, collectionPreferences]);

	const onRowClick = useCallback(({ detail: { item } }: NonCancelableCustomEvent<TableProps.OnRowClickDetail<EnhancedTableItem<TItem>>>) => {
		if (!onSelectionChange || !selectionType)
			return;

		const originalItem = item.__originalItem__;

		if (selectionType === 'single') {
			onSelectionChange([originalItem]);
			return;
		}

		const itemId = getRowId(originalItem);
		const isAlreadySelected = selectedItems.some((selected) => getRowId(selected) === itemId);
		if (isAlreadySelected) {
			onSelectionChange(selectedItems.filter((selected) => getRowId(selected) !== itemId));
		} else {
			onSelectionChange([...selectedItems, originalItem]);
		}
	}, [onSelectionChange, selectionType, selectedItems, getRowId]);

	const onColumnWidthsChange = useCallback(({ detail }: NonCancelableCustomEvent<TableProps.ColumnWidthsChangeDetail>) => {
		const newPreferredColumnWidths = columnDefinitions.map(({ id }, index) => ({
			id,
			width: detail.widths[index],
		}));
		onPreferredColumnWidthsChange(newPreferredColumnWidths);
	}, [onPreferredColumnWidthsChange, columnDefinitions]);

	const onTableSelectionChange = useCallback(({ detail }: NonCancelableCustomEvent<TableProps.SelectionChangeDetail<EnhancedTableItem<TItem>>>) => {
		if (!onSelectionChange)
			return;

		const selectedOriginalItems = detail.selectedItems.map((item) => item.__originalItem__);
		onSelectionChange(selectedOriginalItems);
	}, [onSelectionChange]);

	const onCollectionPreferencesConfirm = useCallback(({ detail }: NonCancelableCustomEvent<CollectionPreferencesProps.Preferences>) => {
		onCollectionPreferencesChange(detail);
	}, [onCollectionPreferencesChange]);

	const trackBy = useCallback((item: EnhancedTableItem<TItem>) => getRowId(item.__originalItem__), [getRowId]);

	const filteringProperties = useMemo(
		() => getFilteringProperties(enhancedColumnsDefinition),
		[enhancedColumnsDefinition],
	);

	const {
		items,
		collectionProps,
		propertyFilterProps,
		filteredItemsCount,
	} = useCollection(enhancedTableItems, {
		propertyFiltering: {
			filteringProperties,
		},
		sorting: {},
		selection: { keepSelection: true, trackBy },
	});

	return (
		<Table
			{...collectionProps}
			header={header}
			variant={variant}
			contentDensity={contentDensity}
			resizableColumns
			stripedRows
			stickyHeader
			wrapLines={tableCollectionPreferencesWithoutStaleColumns.wrapLines}
			columnDefinitions={columnDefinitionsWithPreferredWidths}
			columnDisplay={tableCollectionPreferencesWithoutStaleColumns.contentDisplay}
			onColumnWidthsChange={onColumnWidthsChange}
			items={items}
			trackBy={trackBy}
			empty={empty}
			selectionType={selectionType}
			onRowClick={isEntireRowSelectable ? onRowClick : undefined}
			selectedItems={enhancedSelectedTableItems}
			onSelectionChange={onTableSelectionChange}
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
					preferences={tableCollectionPreferencesWithoutStaleColumns}
					onConfirm={onCollectionPreferencesConfirm}
				/>
			}
		/>
	);
}
