import { type PropertyFilterProperty, useCollection } from '@cloudscape-design/collection-hooks';
import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Table from '@cloudscape-design/components/table';
import { type ReactNode, useMemo } from 'react';
import { useTableColumnWidths, useTablePreferences } from '~/hooks/use-table-preferences';
import { objectEntries } from '~/utils/common';

interface BaseColumnDefinition {
	header: string;
	width?: number;
	isVisible?: boolean;
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

function getColumnDefinitions<TItem>(enhancedColumnDefinitions: EnhancedTableColumnsDefinition<TItem>) {
	return objectEntries(enhancedColumnDefinitions).map(([id, { header, width, cell }]) => ({
		id,
		header,
		width,
		sortingField: id,
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
	}));
}

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

function getContentDisplay<TItem>(columnsDefinition: EnhancedTableColumnsDefinition<TItem>) {
	return objectEntries(columnsDefinition).map(([column, { header, isVisible }]) => ({
		id: column,
		label: header,
		visible: isVisible ?? true,
	}));
}

export default function EnhancedTable<TItem>({
	id,
	items: originalItems,
	columnsDefinition: enhancedColumnDefinitions,
	empty,
	selectionType,
	onSelectionChange,
}: {
	id: string;
	items: TItem[];
	columnsDefinition: EnhancedTableColumnsDefinition<TItem>;
	empty?: ReactNode;
	selectionType?: 'single' | 'multi';
	onSelectionChange?: (selectedItems: TItem[]) => void;
}) {
	const filteringProperties = useMemo(
		() => getFilteringProperties(enhancedColumnDefinitions),
		[enhancedColumnDefinitions],
	);

	const enhancedTableItems = useMemo(
		() => getEnhancedTableItems(originalItems, enhancedColumnDefinitions),
		[originalItems, enhancedColumnDefinitions],
	);

	const { items, collectionProps, propertyFilterProps } = useCollection(enhancedTableItems, {
		propertyFiltering: {
			filteringProperties,
		},
		sorting: {},
		selection: { keepSelection: true },
	});

	const contentDisplay = useMemo(() => getContentDisplay(enhancedColumnDefinitions), [enhancedColumnDefinitions]);

	const [tablePreferences, setTablePreferences] = useTablePreferences(id, {
		contentDisplay,
	});

	const columnDefinitions = useMemo(() => getColumnDefinitions(enhancedColumnDefinitions), [enhancedColumnDefinitions]);

	const [columnWidths, setColumnWidths] = useTableColumnWidths(id);

	const columnDefinitionsWithWidths = useMemo(
		() =>
			columnDefinitions.map((column) => {
				const width = columnWidths.find((columnWidth) => columnWidth.id === column.id)?.width;
				return {
					...column,
					width: width ?? column.width,
				};
			}),
		[columnDefinitions, columnWidths],
	);

	return (
		<Table
			{...collectionProps}
			wrapLines
			resizableColumns
			stripedRows
			stickyHeader
			columnDefinitions={columnDefinitionsWithWidths}
			columnDisplay={tablePreferences?.contentDisplay}
			onColumnWidthsChange={({ detail }) => {
				const newColumnWidths = columnDefinitions.map(({ id }, index) => ({
					id,
					width: detail.widths[index],
				}));
				setColumnWidths(newColumnWidths);
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
			filter={<PropertyFilter {...propertyFilterProps} />}
			preferences={
				<CollectionPreferences
					contentDisplayPreference={{ options: contentDisplay, enableColumnFiltering: true }}
					preferences={tablePreferences}
					onConfirm={({ detail }) => setTablePreferences(detail)}
				/>
			}
		/>
	);
}
