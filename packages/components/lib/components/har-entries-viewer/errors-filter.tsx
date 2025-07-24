import SegmentedControl from '@cloudscape-design/components/segmented-control';

const ERRORS_ID = 'ERRORS';
const ALL_ID = 'ALL';

interface ErrorsFilterProps {
	shouldFilterErrors: boolean;
	onChange: (shouldFilterErrors: boolean) => void;
}

export default function ErrorsFilter({ shouldFilterErrors, onChange }: ErrorsFilterProps) {
	return (
		<SegmentedControl
			options={[
				{ text: 'All', id: 'ALL' },
				{ text: 'Errors', id: ERRORS_ID },
			]}
			selectedId={shouldFilterErrors ? ERRORS_ID : ALL_ID}
			onChange={({ detail }) => {
				const isErrorsSelected = detail.selectedId === ERRORS_ID;
				onChange(isErrorsSelected);
			}}
		/>
	);
}
