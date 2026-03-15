import Toggle from '@cloudscape-design/components/toggle';
import { useCompareModePreference } from '../context/preferences';

export default function CompareModeSwitcher() {
	const [isCompareMode, setIsCompareMode] = useCompareModePreference();

	return (
		<Toggle onChange={({ detail }) => { setIsCompareMode(detail.checked); }} checked={isCompareMode}>
			Enable comparison mode?
		</Toggle>
	);
}
