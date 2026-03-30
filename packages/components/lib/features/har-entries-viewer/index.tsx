import {
	borderRadiusContainer,
	borderWidthField,
	colorBorderDividerDefault,
} from '@cloudscape-design/design-tokens';
import {
	useCallback,
	useEffect,
	useState,
} from 'react';
import type { R2LayoutProps } from '~/components/r2-layout';
import type { HAREntry } from '~/utils/har';
import CloseOverlay from '~/components/close-overlay';
import { CompletePadding } from '~/components/complete-padding';
import R2Layout from '~/components/r2-layout';
import ListHAREntries from '~/features/list-har-entries';
import ViewHAREntry, { DEFAULT_SELECTED_TAB_ID } from '~/features/view-har-entry';
import { getHAREntryId } from '~/utils/har';

const LIST_HAR_ENTRIES_LAYOUT_CELL_ID = 'list-har-entries';
const LAYOUT_TOTAL_COLUMNS = 12;

type HAREntriesViewerLayout = R2LayoutProps<{ instanceId: string }>;

type HAREntriesViewerLayoutDefinitions = HAREntriesViewerLayout['layoutDefinitions'];

const DEFAULT_BOARD_DEFINITIONS: HAREntriesViewerLayoutDefinitions = [
	{
		x: 0,
		y: 0,
		w: 12,
		h: 4,
		id: '0',
		props: {
			instanceId: LIST_HAR_ENTRIES_LAYOUT_CELL_ID,
		},
	},
];

interface HAREntriesViewerProps {
	harEntries: HAREntry[];
	tableTitle?: string;
}

export default function HAREntriesViewer(props: HAREntriesViewerProps) {
	const {
		harEntries,
		tableTitle,
	} = props;

	const [selectedHAREntries, setSelectedHAREntries] = useState<HAREntry[]>([]);
	const [layoutDefinitions, setLayoutDefinitions] = useState<HAREntriesViewerLayoutDefinitions>(DEFAULT_BOARD_DEFINITIONS);
	const [selectedViewHAREntryTabId, setSelectedViewHAREntryTabId] = useState(DEFAULT_SELECTED_TAB_ID);

	// Keeps harEntries & selectedHAREntries in sync, removing any selected entry that is not present in harEntries anymore
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

			if (validSelectedHAREntries.length === prevSelectedHAREntries.length) {
				return prevSelectedHAREntries;
			}
			return validSelectedHAREntries;
		});
	}, [harEntries]);

	// Keeps layoutDefinitions in sync with selectedHAREntries,
	// adding a new layout item for each newly selected entry, and
	// removing the layout item for each entry that is no longer selected
	useEffect(() => {
		const selectedHAREntryIds = selectedHAREntries.map(getHAREntryId);
		const selectedHAREntryIdsSet = new Set(selectedHAREntryIds);

		// TODO: Make this hook more readable
		// eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
		setLayoutDefinitions((prevLayoutDefinitions) => {
			let prevValidLayoutDefinitions = prevLayoutDefinitions.filter(({ props: { instanceId } }) => {
				return selectedHAREntryIdsSet.has(instanceId) || instanceId === LIST_HAR_ENTRIES_LAYOUT_CELL_ID;
			});
			const prevValidLayoutDefinitionInstanceIds = new Set(prevValidLayoutDefinitions.map(({ props: { instanceId } }) => instanceId));

			const newSelectedHAREntryIds = selectedHAREntryIds.filter((id) => !prevValidLayoutDefinitionInstanceIds.has(id));

			if (!newSelectedHAREntryIds.length) {
				return prevValidLayoutDefinitions;
			}

			let layoutDimensionForNewDefinitions = {
				x: 0,
				y: 0,
				w: 6,
				h: 4,
			};

			const prevLayoutDefinition = prevLayoutDefinitions.at(-1);
			const prevValidLayoutDefinition = prevValidLayoutDefinitions.at(-1);

			if (prevLayoutDefinition) {
				layoutDimensionForNewDefinitions = {
					x: prevLayoutDefinition.x,
					y: prevLayoutDefinition.y,
					w: prevLayoutDefinition.w,
					h: prevLayoutDefinition.h,
				};
			}

			if (prevValidLayoutDefinition && prevLayoutDefinition?.props.instanceId === prevValidLayoutDefinition.props.instanceId) {
				layoutDimensionForNewDefinitions.x = layoutDimensionForNewDefinitions.x + layoutDimensionForNewDefinitions.w;
			}

			if (prevLayoutDefinitions.length === 1 && prevValidLayoutDefinitions.length === 1) {
				const listHAREntriesLayoutDefinition = prevValidLayoutDefinitions[0]!;
				const listHAREntriesColSpanEnd = listHAREntriesLayoutDefinition.x + listHAREntriesLayoutDefinition.w;

				let newDefinitionWidth = LAYOUT_TOTAL_COLUMNS - listHAREntriesColSpanEnd;
				let newXPos = listHAREntriesLayoutDefinition.x + newDefinitionWidth;

				if (!newDefinitionWidth) {
					newDefinitionWidth = LAYOUT_TOTAL_COLUMNS / 2;
					newXPos = newDefinitionWidth;
					prevValidLayoutDefinitions = [
						{
							...listHAREntriesLayoutDefinition,
							x: 0,
							y: 0,
							w: newDefinitionWidth,
						},
					];
				}

				layoutDimensionForNewDefinitions = {
					x: newXPos,
					y: 0,
					w: newDefinitionWidth,
					h: listHAREntriesLayoutDefinition.h,
				};
			}

			const newLayoutDefinitions = newSelectedHAREntryIds.map((harEntryId) => {
				if (layoutDimensionForNewDefinitions.x >= LAYOUT_TOTAL_COLUMNS) {
					layoutDimensionForNewDefinitions.x = 0;
					layoutDimensionForNewDefinitions.y += layoutDimensionForNewDefinitions.h;
				}

				const newDefinition = {
					w: layoutDimensionForNewDefinitions.w,
					h: layoutDimensionForNewDefinitions.h,
					x: layoutDimensionForNewDefinitions.x,
					y: layoutDimensionForNewDefinitions.y,
					props: {
						instanceId: harEntryId,
					},
				};

				layoutDimensionForNewDefinitions.x = layoutDimensionForNewDefinitions.x + layoutDimensionForNewDefinitions.w;

				return newDefinition;
			});

			const layoutDefinitions = [...prevValidLayoutDefinitions, ...newLayoutDefinitions].map((layoutDefinition, index) => {
				return {
					...layoutDefinition,
					id: String(index),
				};
			});
			console.warn({ layoutDefinitions });
			return layoutDefinitions;
		});
	}, [selectedHAREntries]);

	const onRender: HAREntriesViewerLayout['onRender'] = useCallback((_, { instanceId }) => {
		if (instanceId === LIST_HAR_ENTRIES_LAYOUT_CELL_ID) {
			return <CompletePadding>
				<ListHAREntries
					title={tableTitle}
					harEntries={harEntries}
					selectedHAREntries={selectedHAREntries}
					onSelectionChange={setSelectedHAREntries}
				/>
			</CompletePadding>;
		}

		const harEntry = selectedHAREntries.find((entry) => getHAREntryId(entry) === instanceId);

		if (!harEntry) {
			return;
		}

		return <>
			<CloseOverlay
				onClose={() => {
					setSelectedHAREntries((prevSelectedHAREntries) => {
						return prevSelectedHAREntries.filter((entry) => getHAREntryId(entry) !== instanceId);
					});
				}}
			/>
			<ViewHAREntry
				harEntry={harEntry}
				initialSelectedTabId={selectedViewHAREntryTabId}
				onSelectedTabIdChange={selectedHAREntries.length === 1 ? setSelectedViewHAREntryTabId : undefined}
			/>
		</>;
	}, [selectedHAREntries, tableTitle, harEntries, selectedViewHAREntryTabId]);

	return (
		<R2Layout
			totalColumns={LAYOUT_TOTAL_COLUMNS}
			gap={16}
			layoutItemStyle={{
				borderRadius: borderRadiusContainer,
				borderWidth: borderWidthField,
				borderColor: colorBorderDividerDefault,
				borderStyle: 'solid',
			}}
			layoutDefinitions={layoutDefinitions}
			onRender={onRender}
			onChange={setLayoutDefinitions}
		/>
	);
}
