import CopyToClipboard from '@cloudscape-design/components/copy-to-clipboard';

export default function EnhancedCopyToClipboard({ textToCopy }: { textToCopy: string }) {
	return <CopyToClipboard copyErrorText="Copy failed" copySuccessText="Copied" textToCopy={textToCopy} />;
}
