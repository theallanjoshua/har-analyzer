import Toggle from '@cloudscape-design/components/toggle';
import useAppContentWidth from '~/hooks/app-content-width';

export default function ContentWidthSwitcher() {
	const [isFullContentWidth, setFullContentWidth] = useAppContentWidth();

	return (
		<Toggle onChange={({ detail }) => setFullContentWidth(detail.checked)} checked={isFullContentWidth}>
			Use entire screen width
		</Toggle>
	);
}
