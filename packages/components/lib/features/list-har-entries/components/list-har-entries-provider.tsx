import type { PropsWithChildren } from 'react';
import {
	ContentTypeFiltersProvider,
	ErrorsFilterProvider,
} from '../context/preferences';

export default function ListHAREntriesProvider({ children }: PropsWithChildren) {
	return <ContentTypeFiltersProvider>
		<ErrorsFilterProvider>
			{children}
		</ErrorsFilterProvider>
	</ContentTypeFiltersProvider>;
}
