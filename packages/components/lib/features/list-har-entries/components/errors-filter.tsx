import SegmentedControl from '@cloudscape-design/components/segmented-control';
import { useErrorsFilterPreference } from '../context/preferences';

const ALL_ID = 'ALL';
const ERRORS_ID = 'ERRORS';

export default function ErrorsFilter() {
	const [shouldFilterErrors, setShouldFilterErrors] = useErrorsFilterPreference();

	return (
		<SegmentedControl
			options={[
				{ text: 'All', id: ALL_ID },
				{ text: 'Errors', id: ERRORS_ID },
			]}
			selectedId={shouldFilterErrors ? ERRORS_ID : ALL_ID}
			onChange={({ detail }) => {
				const isErrorsSelected = detail.selectedId === ERRORS_ID;
				setShouldFilterErrors(isErrorsSelected);
			}}
		/>
	);
}
