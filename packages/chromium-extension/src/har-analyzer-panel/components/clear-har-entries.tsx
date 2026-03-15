import { Button } from '@cloudscape-design/components';

interface ClearHAREntriesProps {
	onClear: () => void;
}

export default function ClearHAREntries({ onClear }: ClearHAREntriesProps) {
	return <Button onClick={onClear} iconName="remove">Clear</Button>;
}
