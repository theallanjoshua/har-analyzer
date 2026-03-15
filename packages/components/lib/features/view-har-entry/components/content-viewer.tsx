import CodeView from '@cloudscape-design/code-view/code-view';
import CopyToClipboard from '@cloudscape-design/components/copy-to-clipboard';
// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from 'buffer';
import JSONViewer from '~/components/json-viewer';
import { getContentTypeGroup, getSyntaxHighlight } from '~/utils/content-type';
import { safeDeserialize } from '~/utils/json';

interface ContentViewerProps {
	content: string;
	encoding?: string;
	mimeType?: string;
}

export default function ContentViewer({
	content,
	encoding,
	mimeType,
}: ContentViewerProps) {
	const contentTypeGroup = getContentTypeGroup(mimeType);

	if (contentTypeGroup === 'Img') {
		// All images in HAR file are base64 encoded, so we can directly use the content as a data URL.
		return (
			<img
				src={`data:${mimeType};base64,${content}`}
				alt="HAR entry content"
				style={{ maxWidth: '100%', maxHeight: 400 }}
			/>
		);
	}

	let highlight = getSyntaxHighlight(mimeType);

	let decodedContent = content;

	if (encoding === 'base64') {
		decodedContent = Buffer.from(content, encoding).toString('utf8');
	}

	if (contentTypeGroup === 'JSON') {
		const [deserializationError, deserializedContent] = safeDeserialize<object>(decodedContent);
		if (!deserializationError) {
			return <JSONViewer data={deserializedContent} />;
		}
		highlight = undefined;
	}

	return (
		<CodeView
			lineNumbers
			wrapLines
			content={decodedContent}
			highlight={highlight}
			actions={<CopyToClipboard copyErrorText="Copy failed" copySuccessText="Copied" textToCopy={decodedContent} />}
		/>
	);
}
