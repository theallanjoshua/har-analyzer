import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';
import type { ExternalState } from './provider';
import ExternalStateProvider from './provider';

export function createExternalState<T>(preferenceKey: string, defaultPreferenceValue: T) {
	const ExternalStateContext = createContext<ExternalState<T>>([defaultPreferenceValue, () => {}]);

	const Provider = ({ children }: PropsWithChildren) => {
		return <ExternalStateProvider
			context={ExternalStateContext}
			stateKey={preferenceKey}
			defaultStateValue={defaultPreferenceValue}
		>
			{children}
		</ExternalStateProvider>;
	};

	const useExternalState = () => use(ExternalStateContext);

	return {
		useExternalState,
		Provider,
	};
}
