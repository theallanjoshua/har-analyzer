import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import { useHARAnalyzerPreferences } from '~/features/har-analyzer-preferences';

export function useTablePreferences(tableId: string, defaultPreferences: CollectionPreferencesProps.Preferences) {
	return useHARAnalyzerPreferences(`tablePreferences_${tableId}`, defaultPreferences);
}

const DEFAULT_COLUMN_WIDTHS: { id: string; width?: number }[] = [];

export function useTablePreferredColumnWidths(tableId: string, defaultWidths = DEFAULT_COLUMN_WIDTHS) {
	return useHARAnalyzerPreferences(`tableColumnWidths_${tableId}`, defaultWidths);
}
