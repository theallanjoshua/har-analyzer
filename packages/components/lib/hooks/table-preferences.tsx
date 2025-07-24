import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import useLocalStorage from './local-storage.js';

export function useTablePreferences(tableId: string, defaultPreferences: CollectionPreferencesProps.Preferences) {
	return useLocalStorage(`tablePreferences_${tableId}`, defaultPreferences);
}

export function useTablePreferredColumnWidths(tableId: string, defaultWidths: { id: string; width?: number }[] = []) {
	return useLocalStorage(`tableColumnWidths_${tableId}`, defaultWidths);
}
