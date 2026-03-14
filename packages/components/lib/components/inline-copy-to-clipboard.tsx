import CopyToClipboard from '@cloudscape-design/components/copy-to-clipboard';

interface InlineCopyToClipboardProps {
	textToCopy: string;
	textToDisplay?: string;
};

export default function InlineCopyToClipboard(props: InlineCopyToClipboardProps) {
	const { textToCopy, textToDisplay } = props;

	return <CopyToClipboard
		variant="inline"
		textToCopy={textToCopy}
		textToDisplay={textToDisplay}
		copyErrorText="Failed to copy"
		copySuccessText="Copied!"
	/>;
}
