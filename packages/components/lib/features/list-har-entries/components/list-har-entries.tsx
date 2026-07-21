import type { ListHAREntriesTableProps } from './list-har-entries-table';
import type { ListHAREntriesTableHeaderProps } from './list-har-entries-table-header';
import ListHAREntriesProvider from './list-har-entries-provider';
import ListHAREntriesTable from './list-har-entries-table';
import ListHAREntriesTableHeader from './list-har-entries-table-header';

export interface ListHAREntriesProps extends ListHAREntriesTableProps, ListHAREntriesTableHeaderProps {}

export default function ListHAREntries(props: ListHAREntriesProps) {
	const {
		harEntries,
		title,
		selectedHAREntries,
		onSelectionChange,
	} = props;
	return <ListHAREntriesProvider>
		<ListHAREntriesTableHeader
			harEntries={harEntries}
			title={title}
		/>
		<ListHAREntriesTable
			harEntries={harEntries}
			selectedHAREntries={selectedHAREntries}
			onSelectionChange={onSelectionChange}
		/>
	</ListHAREntriesProvider>;
}
