import { Box } from '@cloudscape-design/components';
import HorizontalGap from '~/components/horizontal-gap';
import ClearHAREntries from './components/clear-har-entries';
import ReloadHAREntries from './components/reload-har-entries';
import UploadHARFile from './components/upload-har-file';

interface HARAnalyzerActionsProps {
	onClear: () => void;
}
export default function HARAnalyzerActions({ onClear }: HARAnalyzerActionsProps) {
	return <HorizontalGap>
		<ReloadHAREntries />
		<ClearHAREntries onClear={onClear} />
		<Box float='right' display='inline'>
			<UploadHARFile />
		</Box>
	</HorizontalGap>;
}
