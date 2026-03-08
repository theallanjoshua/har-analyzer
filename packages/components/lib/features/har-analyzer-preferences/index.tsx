import type { PropsWithChildren } from 'react';
import {
	createContext,
	use,
	useMemo,
} from 'react';
import { safeDeserialize } from '~/utils/json';

type UsePreferenceStore = (key: string) => readonly [string | undefined, (preference: string) => void];

const HARAnalyzerPreferencesContext = createContext<UsePreferenceStore | undefined>(undefined);

export default function HARAnalyzerPreferencesProvider({ usePreferenceStore, children }: PropsWithChildren<{ usePreferenceStore: UsePreferenceStore }>) {
	return (
		<HARAnalyzerPreferencesContext value={usePreferenceStore}>
			{children}
		</HARAnalyzerPreferencesContext>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHARAnalyzerPreferences<T>(preferenceKey: string, defaultValue: T) {
	const usePreferenceStore = use(HARAnalyzerPreferencesContext);

	if (!usePreferenceStore) {
		throw new Error('useHARAnalyzerPreferences must be used within a HARAnalyzerPreferencesProvider');
	}

	const [preferenceString, setPreference] = usePreferenceStore(preferenceKey);

	const preference = useMemo(() => {
		if (!preferenceString) {
			return;
		}
		const [deserializedPreference] = safeDeserialize<T>(preferenceString);
		return deserializedPreference;
	}, [preferenceString]);

	const onPreferenceChange = (newPreference: T) => {
		setPreference(JSON.stringify(newPreference));
	};

	return [preference ?? defaultValue, onPreferenceChange] as const;
}
