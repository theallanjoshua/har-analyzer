import { createContext } from 'react';

export interface UserPreferencesStore {
	getPreference: (key: string) => Promise<string | undefined>;
	setPreference: (key: string, value: string) => Promise<void>;
}

export const UserPreferencesStoreContext = createContext<UserPreferencesStore | undefined>(undefined);
