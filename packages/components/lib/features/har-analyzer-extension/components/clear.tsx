import { Button } from '@cloudscape-design/components';

export interface ClearProps {
	onClear: () => void;
}

export default function Clear({ onClear }: ClearProps) {
	return <Button
		onClick={onClear}
		iconName="remove"
	/>;
}
