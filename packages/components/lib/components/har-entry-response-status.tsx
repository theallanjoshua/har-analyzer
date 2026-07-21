import StatusIndicator from '@cloudscape-design/components/status-indicator';
import type { HAREntry } from '~/utils/har';
import { isErrorResponse } from '~/utils/har';

export function HAREntryResponseStatus({ harEntry }: { harEntry: HAREntry }) {
	const status = harEntry.response.status;
	const error = harEntry.response._error;

	const ErrorResponseContent = (
		<StatusIndicator type="error">
			{status} {error && `(${error})`}
		</StatusIndicator>
	);

	if (isErrorResponse(harEntry)) {
		return ErrorResponseContent;
	}

	if (status >= 300) {
		return (
			<StatusIndicator type="warning">
				{status}
			</StatusIndicator>
		);
	}

	if (status >= 200) {
		return (
			<StatusIndicator type="success">
				{status}
			</StatusIndicator>
		);
	}

	return ErrorResponseContent;
}
