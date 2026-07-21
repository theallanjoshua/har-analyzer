import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import { createUserPreferencesContext } from '~/context/user-preferences';

export interface EnhancedTablePreferences {
	collectionPreferences: CollectionPreferencesProps.Preferences | undefined;
	preferredColumnWidths: { id: string; width?: number }[];
}

export const DEFAULT_ENHANCED_TABLE_PREFERENCES: EnhancedTablePreferences = {
	collectionPreferences: undefined,
	preferredColumnWidths: [],
};

export function createTablePreferencesContext(key: string) {
	return createUserPreferencesContext(
		key,
		DEFAULT_ENHANCED_TABLE_PREFERENCES,
	);
}
