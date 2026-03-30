import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useMemo } from 'react';
import type { FGLProps } from './fgl';
import FGL from './fgl';

const DEFAULT_TOTAL_COLUMNS = 12;

interface CellDefinition<T> {
	id: string;
	w: number;
	h: number;
	x: number;
	y: number;
	props: T;
}

export interface R2LayoutProps<T> {
	layoutDefinitions: CellDefinition<T>[];
	onRender: (id: string, props: T) => ReactNode;
	onChange: (newLayoutDefinitions: CellDefinition<T>[]) => void;
	layoutItemStyle?: CSSProperties;
	totalColumns?: number;
	gap?: number;
}

/**
 * Provides a re-arrangeable & re-sizeable layout
 */
export default function R2Layout<T>(props: R2LayoutProps<T>) {
	const {
		layoutDefinitions,
		onRender,
		onChange,
		layoutItemStyle = {},
		totalColumns = DEFAULT_TOTAL_COLUMNS,
		gap,
	} = props;

	const children = useMemo(() => layoutDefinitions.map((cell) => {
		const { id, props } = cell;
		const content = onRender(id, props);
		return (
			<div
				key={id}
				data-key={id}
				style={{
					overflow: 'scroll',
					...layoutItemStyle,
				}}>
				{content}
			</div>
		);
	}), [layoutDefinitions, layoutItemStyle, onRender]);

	const layout = useMemo(() => layoutDefinitions.map((cell) => {
		const {
			id,
			props,
			...remainingCellProps
		} = cell;

		return {
			i: id,
			...remainingCellProps,
		};
	}), [layoutDefinitions]);

	const onLayoutChange = useCallback((newLayout: FGLProps['layout']) => {
		const newLayoutDefinitions = newLayout.map((layoutItem) => {
			const {
				i: id,
				...remainingLayoutItemProps
			} = layoutItem;

			const existingCellDefinition = layoutDefinitions.find((cell) => cell.id === id);

			if (!existingCellDefinition) {
				throw new Error(`No existing cell definition found for layout item with id ${id}`);
			}

			return {
				id,
				...remainingLayoutItemProps,
				props: existingCellDefinition.props,
			};
		});
		onChange(newLayoutDefinitions);
	}, [layoutDefinitions, onChange]);

	return <FGL
		totalColumns={totalColumns}
		gap={gap}
		layout={layout}
		onChange={onLayoutChange}
	>
		{children}
	</FGL>;
}
