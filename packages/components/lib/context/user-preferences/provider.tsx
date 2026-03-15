import type { Context, PropsWithChildren } from 'react';
import Spinner from '@cloudscape-design/components/spinner';
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useUserPreferencesStore } from '~/context/user-preferences-store/hooks';

export type UserPreferencesContextValue<T> = [T, (preference: T) => void];

interface UserPreferencesProviderProps<T> {
	context: Context<UserPreferencesContextValue<T>>;
	preferenceKey: string;
	defaultPreferenceValue: T;
}

export function UserPreferencesProvider<T>(props: PropsWithChildren<UserPreferencesProviderProps<T>>) {
	const {
		context: Provider,
		preferenceKey,
		defaultPreferenceValue,
		children,
	} = props;

	const [isLoading, setIsLoading] = useState(false);
	const [preference, setPreference] = useState(defaultPreferenceValue);

	const userPreferencesStore = useUserPreferencesStore();

	const loadPreferenceFromStore = useCallback(async () => {
		if (!userPreferencesStore) {
			return;
		}

		setIsLoading(true);

		try {
			const preferenceFromStore = await userPreferencesStore.getPreference(preferenceKey);
			if (!preferenceFromStore) {
				return;
			}
			const preference = JSON.parse(preferenceFromStore);
			setPreference(preference);
		} catch (error) {
			console.error('Failed to load theme preference:', error);
		} finally {
			setIsLoading(false);
		}
	}, [userPreferencesStore, preferenceKey]);

	useEffect(() => {
		loadPreferenceFromStore();
	}, [loadPreferenceFromStore]);

	const persistPreferenceInStore = useCallback(async (preference: T) => {
		if (!userPreferencesStore) {
			return;
		}

		try {
			await userPreferencesStore.setPreference(preferenceKey, JSON.stringify(preference));
		} catch (error) {
			console.error('Failed to save theme preference:', error);
		}
	}, [userPreferencesStore, preferenceKey]);

	const onPreferenceChange = useCallback((preference: T) => {
		setPreference(preference);
		persistPreferenceInStore(preference);
	}, [persistPreferenceInStore]);

	const contextValue: UserPreferencesContextValue<T> = useMemo(() => {
		return [preference, onPreferenceChange];
	}, [preference, onPreferenceChange]);

	if (isLoading) {
		return <Spinner size="large" />;
	}

	return <Provider value={contextValue}>
		{children}
	</Provider>;
}
