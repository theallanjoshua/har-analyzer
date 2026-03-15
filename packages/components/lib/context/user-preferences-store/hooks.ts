import { use } from 'react';
import { UserPreferencesStoreContext } from './context';

export function useUserPreferencesStore() {
	const userPreferencesStore = use(UserPreferencesStoreContext);
	return userPreferencesStore;
}
