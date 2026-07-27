import type { HAREntry } from '~/utils/har';
import HorizontalGap from '~/components/spacing/horizontal-gap';
import HAREntriesViewer from '~/features/har-entries-viewer';
import { HARFileUploader, useFileHAREntries } from '~/features/har-file-uploader';
import type { ClearProps } from './components/clear';
import type { ReloadProps } from './components/reload';
import Clear from './components/clear';
import Download from './components/download';
import Reload from './components/reload';

export interface HARAnalyzerExtensionProps extends Pick<ClearProps, 'onClear'>, Pick<ReloadProps, 'onReload'> {
	pageHAREntries: HAREntry[];
}

export default function HARAnalyzerExtension(props: HARAnalyzerExtensionProps) {
	const {
		pageHAREntries,
		onReload,
		onClear,
	} = props;

	const [{ harEntries: fileHAREntries, harFileName }, { onUpload, onRemove }] = useFileHAREntries();

	const harEntries = harFileName ? fileHAREntries : pageHAREntries;

	return <HAREntriesViewer
		tableTitle={harFileName}
		harEntries={harEntries}
		additionalActions={
			<HorizontalGap>
				<Reload onReload={onReload} />
				<Clear onClear={onClear} />
				<Download harEntries={harEntries} />
				<HARFileUploader
					onUpload={onUpload}
					onRemove={onRemove}
				/>
			</HorizontalGap>
		}
	/>;
}
