/* eslint-disable react-refresh/only-export-components */
import type { PropsWithChildren } from 'react';
import HorizontalGap from '~/components/spacing/horizontal-gap';
import ContentTypeFilter from './components/content-type-filter';
import ErrorsFilter from './components/errors-filter';
import { ContentTypeFiltersPreferenceProvider, ErrorsFilterPreferenceProvider } from './user-preferences';

export default function HAREntriesFilters() {
	return <HorizontalGap>
		<ErrorsFilter />
		<ContentTypeFilter />
	</HorizontalGap>;
}

export { useFilteredHAREntries } from './hooks';

export function HAREntriesFiltersProvider({ children }: PropsWithChildren) {
	return <ErrorsFilterPreferenceProvider>
		<ContentTypeFiltersPreferenceProvider>
			{children}
		</ContentTypeFiltersPreferenceProvider>
	</ErrorsFilterPreferenceProvider>;
}
