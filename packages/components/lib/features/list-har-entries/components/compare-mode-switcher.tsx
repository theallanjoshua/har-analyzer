import Toggle from '@cloudscape-design/components/toggle';

interface CompareModeSwitcherProps {
	isCompareMode: boolean;
	onChange: (isCompareMode: boolean) => void;
}

export default function CompareModeSwitcher(props: CompareModeSwitcherProps) {
	const { isCompareMode, onChange } = props;

	return (
		<Toggle onChange={({ detail }) => { onChange(detail.checked); }} checked={isCompareMode}>
			Enable comparison mode?
		</Toggle>
	);
}
