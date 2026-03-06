import Toggle from '@cloudscape-design/components/toggle';
import { useAppContentWidthPreference } from '~/hooks/app-preferences';

export default function ContentWidthSwitcher() {
	const [isFullContentWidth, setFullContentWidth] = useAppContentWidthPreference();

	return (
		<Toggle onChange={({ detail }) => { setFullContentWidth(detail.checked); }} checked={isFullContentWidth}>
			Use entire screen width
		</Toggle>
	);
}
