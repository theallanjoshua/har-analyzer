import Button from '@cloudscape-design/components/button';

interface CloseOverlayProps {
	onClose: () => void;
}

export default function CloseOverlay(props: CloseOverlayProps) {
	const { onClose } = props;

	return <div
		style={{
			position: 'absolute',
			top: 0,
			right: 0,
			zIndex: 1,
		}}>
		<Button
			variant="icon"
			iconName="close"
			onClick={onClose}
		/>
	</div>;
}
