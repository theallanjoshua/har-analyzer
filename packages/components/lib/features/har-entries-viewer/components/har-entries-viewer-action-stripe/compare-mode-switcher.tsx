import SegmentedControl from '@cloudscape-design/components/segmented-control';
import { useCompareModePreference } from '../../user-preferences';

const SINGLE_OPTION = 'Single';
const COMPARE_OPTION = 'Compare';

const OPTIONS = [SINGLE_OPTION, COMPARE_OPTION].map((text) => ({ text, id: text }));

export default function CompareModeSwitcher() {
	const [isCompareMode, setIsCompareMode] = useCompareModePreference();

	return <SegmentedControl
		options={OPTIONS}
		selectedId={isCompareMode ? COMPARE_OPTION : SINGLE_OPTION}
		onChange={({ detail }) => {
			const isCompareSelected = detail.selectedId === COMPARE_OPTION;
			setIsCompareMode(isCompareSelected);
		}}
	/>;
}
