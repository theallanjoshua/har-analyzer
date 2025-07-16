import CodeView from '@cloudscape-design/code-view/code-view';
import { Buffer } from 'buffer';
import { getContentTypeGroup, getSyntaxHighlight } from '~/utils/content-type';
import EnhancedCopyToClipboard from '../enhanced-copy-to-clipboard';

interface ContentViewerProps {
	content: string;
	encoding?: string;
	mimeType?: string;
}

export default function ContentViewer({ content, encoding, mimeType }: ContentViewerProps) {
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

	let decodedContent = content;
	if (encoding === 'base64') {
		decodedContent = Buffer.from(content, encoding).toString('utf8');
	}

	let prettifiedContent = decodedContent;
	if (contentTypeGroup === 'JSON') {
		try {
			prettifiedContent = JSON.stringify(JSON.parse(decodedContent), null, 2);
		} catch (error) {
			console.error('Failed to parse JSON content', error);
		}
	}

	const highlight = getSyntaxHighlight(mimeType);

	return (
		<CodeView
			lineNumbers
			content={prettifiedContent}
			highlight={highlight}
			actions={<EnhancedCopyToClipboard textToCopy={prettifiedContent} />}
		/>
	);
}
