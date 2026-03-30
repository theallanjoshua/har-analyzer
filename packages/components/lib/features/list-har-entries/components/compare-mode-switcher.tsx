import SegmentedControl from '@cloudscape-design/components/segmented-control';
import HorizontalGap from '~/components/horizontal-gap';
import { useCompareModePreference } from '../context/preferences';

const SINGLE_OPTION = 'Single';
const COMPARE_OPTION = 'Compare';

export default function CompareModeSwitcher() {
	const [isCompareMode, setIsCompareMode] = useCompareModePreference();

	return <HorizontalGap alignItems='center' size='xs'>
		Mode:
		<SegmentedControl
			options={[SINGLE_OPTION, COMPARE_OPTION].map((text) => ({ text, id: text }))}
			selectedId={isCompareMode ? COMPARE_OPTION : SINGLE_OPTION}
			onChange={({ detail }) => {
				const isCompareSelected = detail.selectedId === COMPARE_OPTION;
				setIsCompareMode(isCompareSelected);
			}}
		/>
	</HorizontalGap>;
}
