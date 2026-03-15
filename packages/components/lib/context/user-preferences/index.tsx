import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';
import type { UserPreferencesContextValue } from './provider';
import { UserPreferencesProvider } from './provider';

export function createUserPreferencesContext<T>(preferenceKey: string, defaultPreferenceValue: T) {
	const UserPreferencesContext = createContext<UserPreferencesContextValue<T>>([defaultPreferenceValue, () => {}]);

	const Provider = ({ children }: PropsWithChildren) => {
		return <UserPreferencesProvider
			context={UserPreferencesContext}
			preferenceKey={preferenceKey}
			defaultPreferenceValue={defaultPreferenceValue}
		>
			{children}
		</UserPreferencesProvider>;
	};

	const useUserPreferences = () => use(UserPreferencesContext);

	return { useUserPreferences, Provider };
}
