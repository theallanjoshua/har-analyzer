import type { PropsWithChildren } from 'react';
import {
	createContext,
	use,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { safeDeserialize } from '~/utils/json';
import { localStorage } from '~/utils/local-storage';

interface UserPreferenceStore {
	getPreference: (key: string) => Promise<string | undefined>;
	setPreference: (key: string, value: string) => Promise<void>;
}

const HARAnalyzerPreferencesContext = createContext<UserPreferenceStore | undefined>(undefined);

export default function HARAnalyzerPreferencesProvider({ store, children }: PropsWithChildren<{ store: UserPreferenceStore }>) {
	return (
		<HARAnalyzerPreferencesContext value={store}>
			{children}
		</HARAnalyzerPreferencesContext>
	);
}

const CONTEXT_FALLBACK = {
	getPreference: localStorage.get,
	setPreference: localStorage.set,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useHARAnalyzerPreferences<T>(preferenceKey: string, defaultValue: T) {
	let context = use(HARAnalyzerPreferencesContext);

	if (!context) {
		console.warn('Invoked outside of HARAnalyzerPreferencesProvider. Falling back to use fallback preferences store.');
		context = CONTEXT_FALLBACK;
	}

	const [preference, setPreference] = useState(defaultValue);

	const syncExternalPreference = useCallback(async () => {
		const externalPreference = await context.getPreference(preferenceKey);
		const preference = safeDeserialize(externalPreference, defaultValue);
		setPreference(preference);
	}, [context, preferenceKey, defaultValue]);

	useEffect(() => {
		syncExternalPreference();
	}, [syncExternalPreference]);

	const updateExternalPreference = useCallback(async () => {
		try {
			await context.setPreference(preferenceKey, JSON.stringify(preference));
		}
		catch (error) {
			console.error(`Failed to update preference for key ${preferenceKey}:`, error);
		}
	}, [context, preferenceKey, preference]);

	useEffect(() => {
		updateExternalPreference();
	}, [updateExternalPreference]);

	return [preference, setPreference] as const;
}
