import { useMemo, useState } from 'react';
import type { EnhancedBoardProps } from '~/components/enhanced-board';
import type { HAREntry } from '~/utils/har';
import EnhancedBoard from '~/components/enhanced-board';
import ListHAREntries from '~/features/list-har-entries';
import ViewHAREntry from '~/features/view-har-entry';
import {
	getHAREntriesFilteredByContentType,
	getHAREntriesWithErrorResponse,
	getHAREntryId,
} from '~/utils/har';
import HAREntriesFilters from './components/har-entries-filters/index.js';
import { useContentTypeFiltersPreference, useErrorsFilterPreference } from './hooks/preferences.js';

const DEFAULT_BOARD_ITEM_DEFINITION = {
	rowSpan: 4,
	columnSpan: 12,
};

const TABLE_ID = 'har-entries-viewer';

const DEFAULT_BOARD_DEFINITIONS: EnhancedBoardProps['definitions'] = [
	{
		...DEFAULT_BOARD_ITEM_DEFINITION,
		id: TABLE_ID,
	},
];

interface HAREntriesViewerProps {
	title?: string;
	harEntries: HAREntry[];
}

export default function HAREntriesViewer(props: HAREntriesViewerProps) {
	const { title = 'HAR Entries', harEntries: incomingHAREntries } = props;

	const [harEntries, setHAREntries] = useState<HAREntry[]>(incomingHAREntries);
	const [selectedHAREntries, setSelectedHAREntries] = useState<HAREntry[]>([]);
	const [definitions, setDefinitions] = useState<EnhancedBoardProps['definitions']>(DEFAULT_BOARD_DEFINITIONS);

	if (incomingHAREntries !== harEntries) {
		setHAREntries(incomingHAREntries);

		const incomingHAREntryIds = incomingHAREntries.map(getHAREntryId);
		const validSelectedHAREntries = selectedHAREntries.filter((entry) => incomingHAREntryIds.includes(getHAREntryId(entry)));

		if (validSelectedHAREntries.length !== selectedHAREntries.length) {
			setSelectedHAREntries(validSelectedHAREntries);
		}
	}

	const onDefinitionsChange = (newDefinitions: EnhancedBoardProps['definitions']) => {
		setDefinitions(newDefinitions);
	};

	const onSelectedHAREntryChange = (newSelectedHAREntries: HAREntry[]) => {
		setSelectedHAREntries(newSelectedHAREntries);
		const selectedHAREntryIds = newSelectedHAREntries.map(getHAREntryId);
		setDefinitions((prevDefinitions) => {
			const validDefinitionsFromPrev = prevDefinitions.filter(({ id }) => selectedHAREntryIds.includes(id) || id === TABLE_ID);
			const validDefinitionIdsFromPrev = validDefinitionsFromPrev.map(({ id }) => id);
			const newDefinitionIds = selectedHAREntryIds.filter((id) => !validDefinitionIdsFromPrev.includes(id));
			const { rowSpan, columnSpan } = validDefinitionsFromPrev.at(1) ?? DEFAULT_BOARD_ITEM_DEFINITION;
			const newDefinitions = newDefinitionIds.map((id) => ({
				rowSpan,
				columnSpan,
				id,
			}));
			const definitionsToSet = [...validDefinitionsFromPrev, ...newDefinitions];
			return definitionsToSet;
		});
	};

	const harEntriesWithErrorResponse = useMemo(() => getHAREntriesWithErrorResponse(harEntries), [harEntries]);

	const [contentTypeFilters] = useContentTypeFiltersPreference();
	const [shouldFilterErrors] = useErrorsFilterPreference();

	const filteredHAREntries = useMemo(() => {
		const contentTypeFilterReadyHAREntries = shouldFilterErrors ? harEntriesWithErrorResponse : harEntries;
		return getHAREntriesFilteredByContentType(contentTypeFilterReadyHAREntries, contentTypeFilters);
	}, [shouldFilterErrors, harEntriesWithErrorResponse, harEntries, contentTypeFilters]);

	const selectedComponents = selectedHAREntries.reduce((acc, harEntry) => {
		const id = getHAREntryId(harEntry);
		return {
			...acc,
			[id]: {
				title: 'Details',
				content: <ViewHAREntry harEntry={harEntry} />,
			},
		};
	}, {});

	const components = {
		[TABLE_ID]: {
			title,
			counter: `(${filteredHAREntries.length}/${harEntries.length})`,
			actions: <HAREntriesFilters />,
			content: (
				<ListHAREntries
					harEntries={filteredHAREntries}
					onChange={onSelectedHAREntryChange}
				/>
			),
		},
		...selectedComponents,
	};

	return (
		<EnhancedBoard
			components={components}
			definitions={definitions}
			onDefinitionsChange={onDefinitionsChange}
		/>
	);
}
