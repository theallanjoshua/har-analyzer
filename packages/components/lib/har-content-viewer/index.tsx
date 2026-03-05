import {
	useEffect,
	useMemo,
	useState,
} from 'react';
import type { EnhancedBoardProps } from '~/components/enhanced-board';
import type { HARContent, HAREntry } from '~/utils/har';
import EnhancedBoard from '~/components/enhanced-board';
import useHAREntriesFilters from '~/har-entries-filters';
import HAREntriesViewer from '~/har-entries-viewer';
import HAREntryViewer from '~/har-entry-viewer';
import useBoardDefinitionsPreference from '~/hooks/board-preferences';
import { getEntriesFromHAR } from '~/utils/har';

const DEFAULT_ROW_SPAN = 6;
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

interface HARContentViewerProps {
	harFileName: string;
	harContent: HARContent;
}

export default function HARContentViewer(props: HARContentViewerProps) {
	const { harFileName, harContent } = props;

	const harEntries = useMemo(() => getEntriesFromHAR(harContent), [harContent]);

	const [selectedHAREntry, setSelectedHAREntry] = useState<HAREntry>();
	const [definitions, setDefinitions] = useState<EnhancedBoardProps['definitions']>(DEFAULT_BOARD_DEFINITIONS);

	useEffect(() => {
		// eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
		setSelectedHAREntry(undefined);
	}, [harEntries]);

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

	const onSelectedHAREntryChange = (harEntry: HAREntry) => {
		setSelectedHAREntry(harEntry);
		if (definitions.length === 1) {
			setDefinitions(savedDefinitions);
		}
	};

	const {
		HAREntriesFilters,
		filteredHAREntries,
	} = useHAREntriesFilters(harEntries);

	const components = {
		[TABLE_ID]: {
			title: harFileName,
			counter: `(${filteredHAREntries.length} / ${harEntries.length})`,
			actions: <HAREntriesFilters />,
			content: (
				<HAREntriesViewer
					harEntries={filteredHAREntries}
					onChange={onSelectedHAREntryChange}
				/>
			),
		},
		[DETAILS_PANEL_ID]: selectedHAREntry
			? {
					title: 'Details',
					content: <HAREntryViewer harEntry={selectedHAREntry} />,
					canRemove: true,
				}
			: {
					title: 'Select an entry to see details',
					content: null,
					canRemove: true,
				},
	};

	return (
		<EnhancedBoard
			components={components}
			definitions={definitions}
			onDefinitionsChange={onDefinitionsChange}
		/>
	);
}
