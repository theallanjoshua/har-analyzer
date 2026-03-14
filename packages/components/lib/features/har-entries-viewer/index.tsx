import {
	useCallback,
	useEffect,
	useState,
} from 'react';
import type { EnhancedBoardProps } from '~/components/enhanced-board';
import type { HAREntry } from '~/utils/har';
import EnhancedBoard from '~/components/enhanced-board';
import { HorizontalPadding } from '~/components/horizontal-padding';
import ListHAREntries from '~/features/list-har-entries';
import ViewHAREntry from '~/features/view-har-entry';
import { getHAREntryId } from '~/utils/har';

const DEFAULT_BOARD_ITEM_DEFINITION = {
	rowSpan: 4,
	columnSpan: 12,
};

const COMPONENT_TYPE_LIST_HAR_ENTRIES = 'har-entries-viewer';
const COMPONENT_TYPE_VIEW_HAR_ENTRY = 'view-har-entry';

const DEFAULT_BOARD_DEFINITIONS: EnhancedBoardProps['definitions'] = [
	{
		...DEFAULT_BOARD_ITEM_DEFINITION,
		id: COMPONENT_TYPE_LIST_HAR_ENTRIES,
		data: {
			componentKey: COMPONENT_TYPE_LIST_HAR_ENTRIES,
			instanceId: COMPONENT_TYPE_LIST_HAR_ENTRIES,
		},
	},
];

interface HAREntriesViewerProps {
	harEntries: HAREntry[];
	tableId: string;
	tableTitle?: string;
}

export default function HAREntriesViewer(props: HAREntriesViewerProps) {
	const {
		harEntries,
		tableId,
		tableTitle,
	} = props;

	const [selectedHAREntries, setSelectedHAREntries] = useState<HAREntry[]>([]);
	const [definitions, setDefinitions] = useState<EnhancedBoardProps['definitions']>(DEFAULT_BOARD_DEFINITIONS);

	useEffect(() => {
		const harEntryIds = new Set(harEntries.map(getHAREntryId));
		// eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
		setSelectedHAREntries((prevSelectedHAREntries) => {
			if (!prevSelectedHAREntries.length) {
				return prevSelectedHAREntries;
			}

			const validSelectedHAREntries = prevSelectedHAREntries.filter((entry) =>
				harEntryIds.has(getHAREntryId(entry)),
			);

			if (validSelectedHAREntries.length !== prevSelectedHAREntries.length) {
				return validSelectedHAREntries;
			}

			return prevSelectedHAREntries;
		});
	}, [harEntries]);

	const onSelectedHAREntryChange = useCallback((newSelectedHAREntries: HAREntry[]) => {
		setSelectedHAREntries(newSelectedHAREntries);

		const selectedHAREntryIds = newSelectedHAREntries.map(getHAREntryId);
		const selectedHAREntryIdsSet = new Set(selectedHAREntryIds);

		setDefinitions((prevDefinitions) => {
			const prevValidDefinitions = prevDefinitions.filter(({ data: { instanceId } }) => selectedHAREntryIdsSet.has(instanceId) || instanceId === COMPONENT_TYPE_LIST_HAR_ENTRIES);
			const prevSelectedHAREntryIds = new Set(prevValidDefinitions.map(({ data: { instanceId } }) => instanceId));

			const newSelectedHAREntryIds = selectedHAREntryIds.filter((id) => !prevSelectedHAREntryIds.has(id));

			if (!newSelectedHAREntryIds.length) {
				return prevValidDefinitions;
			}

			const prevDefinition = prevDefinitions.at(-1);
			const rowSpan = prevDefinition?.rowSpan ?? DEFAULT_BOARD_ITEM_DEFINITION.rowSpan;
			const columnSpan = prevDefinition?.columnSpan ?? DEFAULT_BOARD_ITEM_DEFINITION.columnSpan;

			const newDefinitions = newSelectedHAREntryIds.map((harEntryId) => ({
				rowSpan,
				columnSpan,
				data: {
					componentKey: COMPONENT_TYPE_VIEW_HAR_ENTRY,
					instanceId: harEntryId,
				},
			}));

			//  Using index as id to ensure we don't lose active selected tab in ViewHAREntry
			const definitions = [...prevValidDefinitions, ...newDefinitions].map((definitions, index) => {
				return {
					...definitions,
					id: String(index),
				};
			});

			return definitions;
		});
	}, []);

	const components = {
		[COMPONENT_TYPE_LIST_HAR_ENTRIES]: {
			content: <HorizontalPadding>
				<ListHAREntries
					id={tableId}
					title={tableTitle}
					harEntries={harEntries}
					selectedHAREntries={selectedHAREntries}
					onSelectionChange={onSelectedHAREntryChange}
				/>
			</HorizontalPadding>,
		},
		[COMPONENT_TYPE_VIEW_HAR_ENTRY]: (harEntryId: string) => {
			const harEntry = selectedHAREntries.find((entry) => getHAREntryId(entry) === harEntryId);
			return {
				content: harEntry ? <ViewHAREntry harEntry={harEntry} /> : undefined,
				onRemove: () => {
					setDefinitions((prevDefinitions) => prevDefinitions.filter((definition) => definition.data.instanceId !== harEntryId));
					setSelectedHAREntries((prevSelectedHAREntries) =>
						prevSelectedHAREntries.filter((entry) => getHAREntryId(entry) !== harEntryId),
					);
				},
			};
		},
	};

	return (
		<EnhancedBoard
			components={components}
			definitions={definitions}
			onDefinitionsChange={setDefinitions}
		/>
	);
}
