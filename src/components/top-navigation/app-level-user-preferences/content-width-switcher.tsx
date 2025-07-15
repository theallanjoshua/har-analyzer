import Toggle from '@cloudscape-design/components/toggle';
import useContentWidth from '~/hooks/use-content-width';

export default function ContentWidthSwitcher() {
	const [isFullContentWidth, setFullContentWidth] = useContentWidth();

	return (
		<Toggle onChange={({ detail }) => setFullContentWidth(detail.checked)} checked={isFullContentWidth}>
			Use entire screen width?
		</Toggle>
	);
}
