import Flashbar, { type FlashbarProps } from '@cloudscape-design/components/flashbar';

interface FileUploadErrorProps {
	errors: string[];
}

export default function FileUploadError({ errors }: FileUploadErrorProps) {
	const items: FlashbarProps.MessageDefinition[] = errors.map((error) => ({
		type: 'error',
		content: error,
		id: error,
	}));

	return <Flashbar items={items} />;
}
