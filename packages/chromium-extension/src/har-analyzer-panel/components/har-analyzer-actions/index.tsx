import HorizontalGap from '~/components/horizontal-gap';
import SpaceBetween from '~/components/space-between';
import ClearHAREntries from './components/clear-har-entries';
import ReloadHAREntries from './components/reload-har-entries';
import UploadHARFile from './components/upload-har-file';

interface HARAnalyzerActionsProps {
	onClear: () => void;
}
export default function HARAnalyzerActions({ onClear }: HARAnalyzerActionsProps) {
	return <SpaceBetween>
		<HorizontalGap>
			<ReloadHAREntries />
			<ClearHAREntries onClear={onClear} />
		</HorizontalGap>
		<UploadHARFile />
	</SpaceBetween>;
}
