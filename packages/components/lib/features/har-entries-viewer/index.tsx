import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import type { EnhancedBoardProps } from '~/components/enhanced-board';
import type { HAREntry } from '~/utils/har';
import EnhancedBoard from '~/components/enhanced-board';
import ListHAREntries from '~/features/list-har-entries';
import ViewHAREntry from '~/features/view-har-entry';
import useBoardDefinitionsPreference from '~/hooks/board-preferences';
import {
	getHAREntriesFilteredByContentType,
	getHAREntriesWithErrorResponse,
	getHAREntryId,
} from '~/utils/har';
import HAREntriesFilters from './components/har-entries-filters/index.js';
import { useContentTypeFiltersPreference, useErrorsFilterPreference } from './hooks/preferences.js';

const DEFAULT_ROW_SPAN = 4;
const TABLE_ID = 'har-entries-viewer';
const DETAILS_PANEL_ID = 'selected-har-entry-viewer';

const DEFAULT_BOARD_DEFINITIONS: EnhancedBoardProps['definitions'] = [
	{
		id: TABLE_ID,
		rowSpan: DEFAULT_ROW_SPAN,
		columnSpan: 12,
	},
];
const DEFAULT_SAVED_BOARD_DEFINITIONS: EnhancedBoardProps['definitions'] = [
	...DEFAULT_BOARD_DEFINITIONS,
	{
		id: DETAILS_PANEL_ID,
		rowSpan: DEFAULT_ROW_SPAN,
		columnSpan: 12,
	},
];

interface HAREntriesViewerProps {
	title?: string;
	harEntries: HAREntry[];
}

export default function HAREntriesViewer(props: HAREntriesViewerProps) {
	const { title = 'HAR Entries', harEntries } = props;

	const [selectedHAREntry, setSelectedHAREntry] = useState<HAREntry>();
	const [definitions, setDefinitions] = useState<EnhancedBoardProps['definitions']>(DEFAULT_BOARD_DEFINITIONS);

	useEffect(() => {
		if (selectedHAREntry) {
			const harEntryIds = harEntries.map(getHAREntryId);
			if (!harEntryIds.includes(getHAREntryId(selectedHAREntry))) {
				setSelectedHAREntry(undefined);
			}
		}
	}, [harEntries, selectedHAREntry]);

	const [savedDefinitions, setSavedDefinitions] = useBoardDefinitionsPreference(
		'har-contents-viewer',
		DEFAULT_SAVED_BOARD_DEFINITIONS,
	);

	const onDefinitionsChange = (newDefinitions: EnhancedBoardProps['definitions']) => {
		setDefinitions(newDefinitions);
		if (newDefinitions.length > 1) {
			setSavedDefinitions(newDefinitions);
		}
	};

	const onSelectedHAREntryChange = useCallback((harEntry: HAREntry) => {
		setSelectedHAREntry(harEntry);
		if (definitions.length === 1) {
			setDefinitions(savedDefinitions);
		}
	}, [savedDefinitions, definitions]);

	const harEntriesWithErrorResponse = useMemo(() => getHAREntriesWithErrorResponse(harEntries), [harEntries]);

	const [contentTypeFilters] = useContentTypeFiltersPreference();
	const [shouldFilterErrors] = useErrorsFilterPreference();

	const filteredHAREntries = useMemo(() => {
		const contentTypeFilterReadyHAREntries = shouldFilterErrors ? harEntriesWithErrorResponse : harEntries;
		return getHAREntriesFilteredByContentType(contentTypeFilterReadyHAREntries, contentTypeFilters);
	}, [shouldFilterErrors, harEntriesWithErrorResponse, harEntries, contentTypeFilters]);

	const components = useMemo(() => {
		return {
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
			[DETAILS_PANEL_ID]: selectedHAREntry
				? {
						title: 'Details',
						content: <ViewHAREntry harEntry={selectedHAREntry} />,
						canRemove: true,
					}
				: {
						title: 'Select an entry to see details',
						content: null,
						canRemove: true,
					},
		};
	}, [filteredHAREntries, harEntries, onSelectedHAREntryChange, selectedHAREntry, title]);

	return (
		<EnhancedBoard
			components={components}
			definitions={definitions}
			onDefinitionsChange={onDefinitionsChange}
		/>
	);
}
