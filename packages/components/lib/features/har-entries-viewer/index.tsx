import Header from '@cloudscape-design/components/header';
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import type { EnhancedBoardProps } from '~/components/enhanced-board';
import type { HAREntry } from '~/utils/har';
import EnhancedBoard from '~/components/enhanced-board';
import { HorizontalPadding } from '~/components/spacing/horizontal-padding';
import VerticalGap from '~/components/spacing/vertical-gap';
import HAREntriesFilters, { HAREntriesFiltersProvider, useFilteredHAREntries } from '~/features/har-entries-filters';
import ListHAREntries from '~/features/list-har-entries';
import ViewHAREntry from '~/features/view-har-entry';
import { useRemainingViewportHeight } from '~/hooks/remaining-view-port-height';
import { removeUndefined } from '~/utils/array';
import { getHAREntryId } from '~/utils/har';
import type { HAREntriesViewerActionStripeProps } from './components/har-entries-viewer-action-stripe';
import HAREntriesViewerActionStripe from './components/har-entries-viewer-action-stripe';
import ViewHAREntryHeader from './components/view-har-entry-header';
import {
	CompareModePreferenceProvider,
	HAREntryHeadersPreferenceProvider,
	useCompareModePreference,
} from './user-preferences';

const DEFAULT_BOARD_ITEM_DEFINITION = {
	rowSpan: 4,
	columnSpan: 2,
};

const COMPONENT_TYPE_LIST_HAR_ENTRIES = 'har-entries-viewer';
const COMPONENT_TYPE_VIEW_HAR_ENTRY = 'view-har-entry';

const DEFAULT_BOARD_DEFINITIONS: EnhancedBoardProps['definitions'] = [
	{
		...DEFAULT_BOARD_ITEM_DEFINITION,
		id: COMPONENT_TYPE_LIST_HAR_ENTRIES,
		data: {
			componentType: COMPONENT_TYPE_LIST_HAR_ENTRIES,
			instanceId: COMPONENT_TYPE_LIST_HAR_ENTRIES,
		},
	},
];

interface HAREntriesViewerProps extends HAREntriesViewerActionStripeProps {
	harEntries: HAREntry[];
	tableTitle?: string;
}

function HAREntriesViewer(props: HAREntriesViewerProps) {
	const {
		harEntries,
		tableTitle,
		additionalActions,
	} = props;

	const [selectedHAREntries, setSelectedHAREntries] = useState<HAREntry[]>([]);
	const [definitions, setDefinitions] = useState<EnhancedBoardProps['definitions']>(DEFAULT_BOARD_DEFINITIONS);
	const [initialSelectedTabId, setInitialSelectedTabId] = useState<string>();

	const { elementRef, remainingHeight } = useRemainingViewportHeight<HTMLDivElement>();

	// HANDLES ENHANCED BOARD HEIGHT: On mount, stretch the board item definitions vertically to fill the remaining height of the viewport
	useEffect(() => {
		if (!remainingHeight) {
			return;
		}

		const rowSpan = Math.floor(remainingHeight / 116) || DEFAULT_BOARD_ITEM_DEFINITION.rowSpan;

		// eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
		setDefinitions((prevDefinitions) => {
			return prevDefinitions.map((definition) => ({
				...definition,
				rowSpan,
			}));
		});
	}, [remainingHeight]);

	const [isCompareMode] = useCompareModePreference();

	// HANDLES COMPARE MODE TOGGLE: If the user switches from compare mode to single view mode, clear the selected HAR entries if there are more than one selected
	useEffect(() => {
		if (!isCompareMode && selectedHAREntries.length > 1) {
			// eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
			setSelectedHAREntries([]);
		}
	}, [isCompareMode, selectedHAREntries.length]);

	// HANDLES SELECTED HAR ENTRIES VALIDATION: If the selected HAR entries are no longer present in the list of HAR entries, remove them from the selected HAR entries
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

	// HANDLES SELECTED HAR ENTRIES TO DEFINITIONS SYNC: If the selected HAR entries change, update the board item definitions to match the selected HAR entries
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
					id: newSelectedHAREntryId,
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
				id: harEntryId,
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

	const removeSelectedHAREntry = useCallback((harEntryId: string) => {
		setSelectedHAREntries((prevSelectedHAREntries) =>
			prevSelectedHAREntries.filter((entry) => getHAREntryId(entry) !== harEntryId),
		);
	}, []);

	const filteredHAREntries = useFilteredHAREntries(harEntries);

	const components: EnhancedBoardProps['components'] = useMemo(() => ({
		[COMPONENT_TYPE_LIST_HAR_ENTRIES]: {
			header: <Header
				counter={`(${filteredHAREntries.length}/${harEntries.length})`}
				actions={<HAREntriesFilters />}
			>
				{tableTitle}
			</Header>,
			content: <HorizontalPadding>
				<ListHAREntries
					harEntries={filteredHAREntries}
					selectedHAREntries={selectedHAREntries}
					onSelectionChange={setSelectedHAREntries}
					enableMultiSelect={isCompareMode}
				/>
			</HorizontalPadding>,
		},
		[COMPONENT_TYPE_VIEW_HAR_ENTRY]: (harEntryId: string) => {
			const harEntry = selectedHAREntries.find((entry) => getHAREntryId(entry) === harEntryId);

			const onRemove = () => {
				removeSelectedHAREntry(harEntryId);
			};

			if (!harEntry) {
				return {
					header: undefined,
					content: undefined,
					onRemove,
				};
			}

			return {
				header: <ViewHAREntryHeader
					harEntries={harEntries}
					harEntry={harEntry}
				/>,
				content: <ViewHAREntry
					harEntry={harEntry}
					initialSelectedTabId={initialSelectedTabId}
					onSelectedTabIdChange={setInitialSelectedTabId}
				/>,
				onRemove,
			};
		},
	}), [filteredHAREntries, harEntries, selectedHAREntries, isCompareMode, initialSelectedTabId, tableTitle, removeSelectedHAREntry]);

	return <>
		<div ref={elementRef} />
		<VerticalGap>
			<HAREntriesViewerActionStripe harEntries={harEntries} additionalActions={additionalActions} />
			<EnhancedBoard
				components={components}
				definitions={definitions}
				onDefinitionsChange={setDefinitions}
			/>
		</VerticalGap>
	</>;
}

export interface HAREntriesViewerWithProvidersProps extends HAREntriesViewerProps {};

export default function HAREntriesViewerWithProviders(props: HAREntriesViewerWithProvidersProps) {
	return <HAREntriesFiltersProvider>
		<CompareModePreferenceProvider>
			<HAREntryHeadersPreferenceProvider>
				<HAREntriesViewer {...props} />
			</HAREntryHeadersPreferenceProvider>
		</CompareModePreferenceProvider>
	</HAREntriesFiltersProvider>;
}
