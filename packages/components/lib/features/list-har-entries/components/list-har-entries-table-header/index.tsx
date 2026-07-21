import Header from '@cloudscape-design/components/header';
import type { HAREntry } from '~/utils/har';
import HorizontalGap from '~/components/horizontal-gap';
import { useFilteredHAREntries } from '../../hooks/filter-har-entries';
import ContentTypeFilter from './content-type-filter';
import ErrorsFilter from './errors-filter';

export interface ListHAREntriesTableHeaderProps {
	harEntries: HAREntry[];
	title?: string;
}

export default function ListHAREntriesTableHeader(props: ListHAREntriesTableHeaderProps) {
	const { harEntries, title = 'Network requests' } = props;
	const filteredHAREntries = useFilteredHAREntries(harEntries);

	return <Header
		counter={`(${filteredHAREntries.length}/${harEntries.length})`}
		actions={<HorizontalGap>
			<ErrorsFilter />
			<ContentTypeFilter />
		</HorizontalGap>}
	>
		{title}
	</Header>;
}
