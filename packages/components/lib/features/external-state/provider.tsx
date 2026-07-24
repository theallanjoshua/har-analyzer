import type { Context, PropsWithChildren } from 'react';
import Spinner from '@cloudscape-design/components/spinner';
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useExternalStore } from './context';

const NO_EXTERNAL_STORE_WARNING = `
  No external store provided. Using local state only.
  If this is unintentional wrap the entire app in an ExternalStoreProvider with a valid external store.
  if this is intentional, it's recommended to use the useState hook directly instead of useExternalState.
`;

export type ExternalState<T> = [T, (preference: T) => void];

interface ExternalStateProviderProps<T> {
	context: Context<ExternalState<T>>;
	stateKey: string;
	defaultStateValue: T;
}

export default function ExternalStateProvider<T>(props: PropsWithChildren<ExternalStateProviderProps<T>>) {
	const {
		context: Provider,
		stateKey,
		defaultStateValue,
		children,
	} = props;

	const [isLoading, setIsLoading] = useState(false);
	const [state, setState] = useState(defaultStateValue);

	const externalStore = useExternalStore();

	const loadStateFromExternalStore = useCallback(async () => {
		if (!externalStore) {
			console.warn(NO_EXTERNAL_STORE_WARNING);
			return;
		}

		setIsLoading(true);

		try {
			const preferenceFromStore = await externalStore.get(stateKey);
			if (!preferenceFromStore) {
				return;
			}
			const preference = JSON.parse(preferenceFromStore);
			setState(preference);
		} catch (error) {
			console.error(`Failed to load external state for key: ${stateKey}`, error);
		} finally {
			setIsLoading(false);
		}
	}, [externalStore, stateKey]);

	useEffect(() => {
		loadStateFromExternalStore();
	}, [loadStateFromExternalStore]);

	const persistStateInExternalStore = useCallback(async (state: T) => {
		if (!externalStore) {
			console.warn(NO_EXTERNAL_STORE_WARNING);
			return;
		}

		try {
			await externalStore.set(stateKey, JSON.stringify(state));
		} catch (error) {
			console.error(`Failed to save external state for key: ${stateKey} preference:`, error);
		}
	}, [externalStore, stateKey]);

	const onStateChange = useCallback((state: T) => {
		setState(state);
		persistStateInExternalStore(state);
	}, [persistStateInExternalStore]);

	const contextValue: ExternalState<T> = useMemo(() => [state, onStateChange], [state, onStateChange]);

	if (isLoading) {
		return <Spinner size='large' />;
	}

	return <Provider value={contextValue}>
		{children}
	</Provider>;
}
