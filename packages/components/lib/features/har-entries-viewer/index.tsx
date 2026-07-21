import { useEffect, useState } from 'react';
import type { EnhancedBoardProps } from '~/components/enhanced-board';
import type { HAREntry } from '~/utils/har';
import EnhancedBoard from '~/components/enhanced-board';
import { HorizontalPadding } from '~/components/horizontal-padding';
import VerticalGap from '~/components/vertical-gap';
import { ListHAREntriesTable, ListHAREntriesTableHeader } from '~/features/list-har-entries';
import ViewHAREntry from '~/features/view-har-entry';
import { removeUndefined } from '~/utils/array';
import { getHAREntryId } from '~/utils/har';
import HAREntriesViewerActionStripe from './components/har-entries-viewer-action-stripe';
import HAREntriesViewerProvider from './components/har-entries-viewer-provider';
import ViewHAREntryHeader from './components/view-har-entry-header';
import { useCompareModePreference } from './context/preferences';

const DEFAULT_BOARD_ITEM_DEFINITION = {
	rowSpan: 4,
	columnSpan: 12,
};

const COMPONENT_TYPE_LIST_HAR_ENTRIES = 'har-entries-viewer';
const COMPONENT_TYPE_VIEW_HAR_ENTRY = 'view-har-entry';

const DEFAULT_BOARD_DEFINITIONS: EnhancedBoardProps['definitions'] = [
	{
		...DEFAULT_BOARD_ITEM_DEFINITION,
		data: {
			componentType: COMPONENT_TYPE_LIST_HAR_ENTRIES,
			instanceId: COMPONENT_TYPE_LIST_HAR_ENTRIES,
		},
	},
];

interface HAREntriesViewerProps {
	harEntries: HAREntry[];
	tableTitle?: string;
}

function HAREntriesViewer(props: HAREntriesViewerProps) {
	const {
		harEntries,
		tableTitle,
	} = props;

	const [selectedHAREntries, setSelectedHAREntries] = useState<HAREntry[]>([]);
	const [definitions, setDefinitions] = useState<EnhancedBoardProps['definitions']>(DEFAULT_BOARD_DEFINITIONS);
	const [initialSelectedTabId, setInitialSelectedTabId] = useState<string>();

	const [isCompareMode] = useCompareModePreference();

	useEffect(() => {
		if (!isCompareMode && selectedHAREntries.length > 1) {
			// eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
			setSelectedHAREntries([]);
		}
	}, [isCompareMode, selectedHAREntries.length]);

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

	useEffect(() => {
		const selectedHAREntryIds = selectedHAREntries.map(getHAREntryId);
		const validDefinitionInstanceIds = new Set([...selectedHAREntryIds, COMPONENT_TYPE_LIST_HAR_ENTRIES]);

		// eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
		setDefinitions((prevDefinitions) => {
			const prevDefinitionInstanceIds = prevDefinitions.map(({ data: { instanceId } }) => instanceId);
			const prevValidDefinitionInstanceIds = new Set(prevDefinitionInstanceIds.filter((id) => validDefinitionInstanceIds.has(id)));
			const newSelectedHAREntryIds = selectedHAREntryIds.filter((id) => !prevValidDefinitionInstanceIds.has(id));

			if (!newSelectedHAREntryIds.length && prevDefinitionInstanceIds.length === prevValidDefinitionInstanceIds.size) {
				return prevDefinitions;
			}

			const prevValidDefinitions = prevDefinitions.map((prevDefinition) => {
				const { data: { instanceId } } = prevDefinition;

				if (validDefinitionInstanceIds.has(instanceId)) {
					return prevDefinition;
				}

				const newSelectedHAREntryId = newSelectedHAREntryIds.shift();

				if (!newSelectedHAREntryId) {
					return undefined;
				}

				return {
					...prevDefinition,
					data: {
						componentType: COMPONENT_TYPE_VIEW_HAR_ENTRY,
						instanceId: newSelectedHAREntryId,
					},
				};
			});

			const lastValidDefinition = prevValidDefinitions.at(-1);
			const rowSpan = lastValidDefinition?.rowSpan ?? DEFAULT_BOARD_ITEM_DEFINITION.rowSpan;
			const columnSpan = lastValidDefinition?.columnSpan ?? DEFAULT_BOARD_ITEM_DEFINITION.columnSpan;

			const newDefinitions = newSelectedHAREntryIds.map((harEntryId) => ({
				rowSpan,
				columnSpan,
				data: {
					componentType: COMPONENT_TYPE_VIEW_HAR_ENTRY,
					instanceId: harEntryId,
				},
			}));

			return removeUndefined([...prevValidDefinitions, ...newDefinitions]);
		});
	}, [selectedHAREntries]);

	const removeSelectedHAREntry = (harEntryId: string) => {
		setSelectedHAREntries((prevSelectedHAREntries) =>
			prevSelectedHAREntries.filter((entry) => getHAREntryId(entry) !== harEntryId),
		);
	};

	const components = {
		[COMPONENT_TYPE_LIST_HAR_ENTRIES]: {
			header: <ListHAREntriesTableHeader
				harEntries={harEntries}
				title={tableTitle}
			/>,
			content: <HorizontalPadding>
				<ListHAREntriesTable
					harEntries={harEntries}
					selectedHAREntries={selectedHAREntries}
					onSelectionChange={setSelectedHAREntries}
					enableMultiSelect={isCompareMode}
				/>
			</HorizontalPadding>,
		},
		[COMPONENT_TYPE_VIEW_HAR_ENTRY]: (harEntryId: string) => {
			const harEntry = selectedHAREntries.find((entry) => getHAREntryId(entry) === harEntryId);
			return {
				header: harEntry
					? <ViewHAREntryHeader
							harEntries={harEntries}
							harEntry={harEntry}
						/>
					: undefined,
				content: harEntry
					? <ViewHAREntry
							harEntry={harEntry}
							initialSelectedTabId={initialSelectedTabId}
							onSelectedTabIdChange={setInitialSelectedTabId}
						/>
					: undefined,
				onRemove: () => { removeSelectedHAREntry(harEntryId); },
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

export default function HAREntriesViewerWithProvider(props: HAREntriesViewerProps) {
	const { harEntries, ...remainingProps } = props;
	return <HAREntriesViewerProvider>
		<VerticalGap>
			<HAREntriesViewerActionStripe harEntries={harEntries} />
			<HAREntriesViewer harEntries={harEntries} {...remainingProps} />
		</VerticalGap>
	</HAREntriesViewerProvider>;
}
