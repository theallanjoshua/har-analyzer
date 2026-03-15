import Toggle from '@cloudscape-design/components/toggle';
import { useAppContentWidthPreference } from '~/features/har-analyzer/context/preferences';

export default function ContentWidthSwitcher() {
	const [isFullContentWidth, setFullContentWidth] = useAppContentWidthPreference();

	return (
		<Toggle onChange={({ detail }) => { setFullContentWidth(detail.checked); }} checked={isFullContentWidth}>
			Use entire screen width
		</Toggle>
	);
}
