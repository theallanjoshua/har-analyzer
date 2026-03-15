import type { PropsWithChildren } from 'react';
import type { UserPreferencesStore } from './context';
import { UserPreferencesStoreContext } from './context';

export function UserPreferencesStoreProvider({
	userPreferencesStore,
	children,
}: PropsWithChildren<{
	userPreferencesStore: UserPreferencesStore;
}>) {
	return <UserPreferencesStoreContext value={userPreferencesStore}>
		{children}
	</UserPreferencesStoreContext>;
}
