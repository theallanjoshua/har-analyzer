import type { PropsWithChildren } from 'react';
import {
	createContext,
	use,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { browserStorage } from '~/utils/browser-storage';
import { safeDeserialize } from '~/utils/json';

interface PreferencesStore {
	getPreference: (key: string) => Promise<string | undefined>;
	setPreference: (key: string, value: string) => Promise<void>;
}

const HARAnalyzerPreferencesContext = createContext<PreferencesStore | undefined>(undefined);

export default function HARAnalyzerPreferencesProvider({ store, children }: PropsWithChildren<{ store: PreferencesStore }>) {
	return (
		<HARAnalyzerPreferencesContext value={store}>
			{children}
		</HARAnalyzerPreferencesContext>
	);
}

const CONTEXT_FALLBACK = {
	getPreference: browserStorage.get,
	setPreference: browserStorage.set,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useHARAnalyzerPreferences<T>(preferenceKey: string, defaultValue: T) {
	const context = use(HARAnalyzerPreferencesContext);

	const preferencesStore = useMemo(() => {
		if (!context) {
			console.warn('Invoked outside of HARAnalyzerPreferencesProvider. Falling back to use fallback preferences store.');
			return CONTEXT_FALLBACK;
		}
		return context;
	}, [context]);

	const [preference, setPreference] = useState(defaultValue);

	const syncExternalPreference = useCallback(async () => {
		const externalPreference = await preferencesStore.getPreference(preferenceKey);
		const preference = safeDeserialize(externalPreference, defaultValue);
		setPreference(preference);
	}, [preferencesStore, preferenceKey, defaultValue]);

	useEffect(() => {
		syncExternalPreference();
	}, [syncExternalPreference]);

	const updateExternalPreference = useCallback(async () => {
		try {
			await preferencesStore.setPreference(preferenceKey, JSON.stringify(preference));
		}
		catch (error) {
			console.error(`Failed to update preference for key ${preferenceKey}:`, error);
		}
	}, [preferencesStore, preferenceKey, preference]);

	useEffect(() => {
		updateExternalPreference();
	}, [updateExternalPreference]);

	return [preference, setPreference] as const;
}
