import Alert from '@cloudscape-design/components/alert';
import Button from '@cloudscape-design/components/button';
import { withErrorBoundary } from 'react-error-boundary';

export default function withCustomErrorBoundary<P>(Component: React.ComponentType<P>) {
	return withErrorBoundary(Component, {
		fallbackRender: ({ error, resetErrorBoundary }) => (
			<Alert
				type="error"
				header="Oops! Something went wrong."
				action={
					<Button iconName="refresh" onClick={resetErrorBoundary}>
						Try again
					</Button>
				}
			>
				{error}
			</Alert>
		),
	});
}
