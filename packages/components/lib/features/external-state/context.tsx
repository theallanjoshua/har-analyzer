/* eslint-disable react-refresh/only-export-components */
import type { PropsWithChildren } from 'react';
import { createContext, use } from 'react';

export interface ExternalStore {
	get: (key: string) => Promise<string | undefined>;
	set: (key: string, value: string) => Promise<void>;
}

const ExternalStoreContext = createContext<ExternalStore | undefined>(undefined);

export function useExternalStore() {
	return use(ExternalStoreContext);
}

export function ExternalStoreProvider(props: PropsWithChildren<{ store: ExternalStore }>) {
	const { store, children } = props;

	return <ExternalStoreContext value={store}>
		{children}
	</ExternalStoreContext>;
}
