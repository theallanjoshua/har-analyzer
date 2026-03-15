import type { HAREntriesTableProps } from './components/har-entries-table';
import HAREntriesTable from './components/har-entries-table';
import {
	CompareModeProvider,
	ContentTypeFiltersProvider,
	ErrorsFilterProvider,
} from './context/preferences';

export interface ListHAREntriesProps extends HAREntriesTableProps {}

export default function ListHAREntries(props: ListHAREntriesProps) {
	return <CompareModeProvider>
		<ContentTypeFiltersProvider>
			<ErrorsFilterProvider>
				<HAREntriesTable {...props} />
			</ErrorsFilterProvider>
		</ContentTypeFiltersProvider>
	</CompareModeProvider>;
}
