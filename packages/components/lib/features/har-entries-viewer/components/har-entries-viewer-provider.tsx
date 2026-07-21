import type { PropsWithChildren } from 'react';
import { ListHAREntriesProvider } from '~/features/list-har-entries';
import { CompareModeProvider, HAREntryHeadersProvider } from '../context/preferences';

export default function HAREntriesViewerProvider({ children }: PropsWithChildren) {
	return <CompareModeProvider>
		<HAREntryHeadersProvider>
			<ListHAREntriesProvider>
				{children}
			</ListHAREntriesProvider>
		</HAREntryHeadersProvider>
	</CompareModeProvider>;
}
