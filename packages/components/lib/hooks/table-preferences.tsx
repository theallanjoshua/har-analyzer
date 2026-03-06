import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import { useHARAnalyzerPreferences } from '~/har-analyzer-preferences';

export function useTablePreferences(tableId: string, defaultPreferences: CollectionPreferencesProps.Preferences) {
	return useHARAnalyzerPreferences(`tablePreferences_${tableId}`, defaultPreferences);
}

export function useTablePreferredColumnWidths(tableId: string, defaultWidths: { id: string; width?: number }[] = []) {
	return useHARAnalyzerPreferences(`tableColumnWidths_${tableId}`, defaultWidths);
}
