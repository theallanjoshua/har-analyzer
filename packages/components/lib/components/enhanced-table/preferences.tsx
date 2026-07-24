import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import { createExternalState } from '~/features/external-state/factory';

export interface EnhancedTablePreferences {
	collectionPreferences: CollectionPreferencesProps.Preferences | undefined;
	preferredColumnWidths: { id: string; width?: number }[];
}

export const DEFAULT_ENHANCED_TABLE_PREFERENCES: EnhancedTablePreferences = {
	collectionPreferences: undefined,
	preferredColumnWidths: [],
};

export function createTablePreferencesExternalState(key: string) {
	return createExternalState(
		key,
		DEFAULT_ENHANCED_TABLE_PREFERENCES,
	);
}
