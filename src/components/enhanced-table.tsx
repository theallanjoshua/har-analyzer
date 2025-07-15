import { type PropertyFilterProperty, useCollection } from '@cloudscape-design/collection-hooks';
import PropertyFilter from '@cloudscape-design/components/property-filter';
import Table from '@cloudscape-design/components/table';
import { getTime } from 'date-fns';
import { type ReactNode, useEffect, useMemo } from 'react';
import { objectEntries } from '~/utils/common';

interface BaseColumnDefinition {
	header: string;
	width?: number;
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
				return getTime(value);
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

export default function EnhancedTable<TItem>({
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
	onSelectionChange: (selectedItems: TItem[]) => void;
}) {
	const enhancedTableItems = useMemo(
		() => getEnhancedTableItems(originalItems, enhancedColumnDefinitions),
		[originalItems, enhancedColumnDefinitions],
	);

	const filteringProperties = useMemo(
		() => getFilteringProperties(enhancedColumnDefinitions),
		[enhancedColumnDefinitions],
	);

	const { items, collectionProps, propertyFilterProps } = useCollection(enhancedTableItems, {
		propertyFiltering: {
			filteringProperties,
		},
		sorting: {},
		selection: { keepSelection: true },
	});

	console.log({ propertyFilterProps });
	const { selectedItems } = collectionProps;

	useEffect(() => {
		if (selectedItems) {
			console.log('useEffect');
			onSelectionChange(selectedItems.map((item) => item.__originalItem__));
		}
	}, [selectedItems, onSelectionChange]);

	const columnDefinitions = useMemo(() => getColumnDefinitions(enhancedColumnDefinitions), [enhancedColumnDefinitions]);

	return (
		<Table
			{...collectionProps}
			wrapLines
			resizableColumns
			stripedRows
			stickyHeader
			columnDefinitions={columnDefinitions}
			items={items}
			empty={empty}
			selectionType={selectionType}
			filter={<PropertyFilter {...propertyFilterProps} />}
		/>
	);
}
