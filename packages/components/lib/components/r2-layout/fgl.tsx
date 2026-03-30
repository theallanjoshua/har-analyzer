import type {
	GridLayout,
	GridLayoutConfig,
	GridLayoutItem,
} from 'fast-grid-layout';
import type { PropsWithChildren } from 'react';
import { GridLayout as GridLayoutController } from 'fast-grid-layout';
import {
	useEffect,
	useMemo,
	useRef,
} from 'react';
import 'fast-grid-layout/dist/fast-grid-layout.css';

export type FGLProps = PropsWithChildren<{
	layout: GridLayoutItem[];
	onChange: (newLayout: GridLayoutItem[]) => void;
	totalColumns?: number;
	gap?: number;
	rowHeight?: number;
}>;

export default function FGL(props: FGLProps) {
	const {
		layout,
		onChange,
		totalColumns = 12,
		gap = 0,
		rowHeight = 120,
		children,
	} = props;

	const config: GridLayoutConfig = useMemo(() => ({
		columns: totalColumns,
		gap,
		rowHeight,
	}), [totalColumns, gap, rowHeight]);

	const containerRef = useRef<HTMLDivElement>(null);
	const controllerRef = useRef<GridLayout>(null);

	useEffect(() => {
		if (!containerRef.current) {
			return;
		}
		const controller = new GridLayoutController(containerRef.current, config);
		controller.setEditable(true);
		controller.setLayout(layout);
		controller.onLayoutChange(onChange);
		controllerRef.current = controller;

		return () => {
			controller.disconnect();
		};
	}, []);

	useEffect(() => {
		const controller = controllerRef.current;
		controller?.setConfig(config);
	}, [config]);

	useEffect(() => {
		const controller = controllerRef.current;
		controller?.onLayoutChange(() => { });
		controller?.setLayout(layout);
		controller?.onLayoutChange(onChange);
	}, [layout, onChange]);

	return <div ref={containerRef}>{children}</div>;
}
