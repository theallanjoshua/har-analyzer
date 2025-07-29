import Flashbar, { type FlashbarProps } from '@cloudscape-design/components/flashbar';
import withCustomErrorBoundary from '~/components/error-boundary';

interface FileUploadErrorProps {
	errors: string[];
}

function FileUploadError({ errors }: FileUploadErrorProps) {
	const items: FlashbarProps.MessageDefinition[] = errors.map((error) => ({
		type: 'error',
		content: error,
		id: error,
	}));

	return <Flashbar items={items} />;
}

export default withCustomErrorBoundary(FileUploadError);
