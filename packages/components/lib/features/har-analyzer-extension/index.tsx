import type { HAREntry } from '~/utils/har';
import HorizontalGap from '~/components/spacing/horizontal-gap';
import HAREntriesViewer from '~/features/har-entries-viewer';
import type { ClearProps } from './components/clear';
import type { ReloadProps } from './components/reload';
import Clear from './components/clear';
import Download from './components/download';
import Reload from './components/reload';
import Upload from './components/upload';

export interface HARAnalyzerExtensionProps extends Pick<ClearProps, 'onClear'>, Pick<ReloadProps, 'onReload'> {
	harEntries: HAREntry[];
	tableTitle?: string;
}

export default function HARAnalyzerExtension(props: HARAnalyzerExtensionProps) {
	const {
		harEntries,
		onReload,
		onClear,
		tableTitle,
	} = props;

	return <HAREntriesViewer
		tableTitle={tableTitle}
		harEntries={harEntries}
		additionalActions={
			<HorizontalGap>
				<Reload onReload={onReload} />
				<Clear onClear={onClear} />
				<Upload />
				<Download harEntries={harEntries} />
			</HorizontalGap>
		}
	/>;
}
