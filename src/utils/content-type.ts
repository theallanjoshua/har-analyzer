import cssSyntaxHighlight from '@cloudscape-design/code-view/highlight/css';
import htmlSyntaxHighlight from '@cloudscape-design/code-view/highlight/html';
import javascriptSyntaxHighlight from '@cloudscape-design/code-view/highlight/javascript';
import jsonSyntaxHighlight from '@cloudscape-design/code-view/highlight/json';
import xmlSyntaxHighlight from '@cloudscape-design/code-view/highlight/xml';
import { objectEntries, objectKeys } from './common';

type SyntaxHighlighter = typeof jsonSyntaxHighlight;

type ContentTypeUtility = {
	mimeTypeContains: string[];
	syntaxHighlight?: SyntaxHighlighter;
};

const CONTENT_TYPE_GROUP_SPECIFIC_UTILITIES = {
	JSON: {
		mimeTypeContains: ['json'],
		syntaxHighlight: jsonSyntaxHighlight,
	},
	XML: {
		mimeTypeContains: ['xml'],
		syntaxHighlight: xmlSyntaxHighlight,
	},
	JS: {
		mimeTypeContains: ['javascript', 'ecmascript'],
		syntaxHighlight: javascriptSyntaxHighlight,
	},
	CSS: {
		mimeTypeContains: ['text/css'],
		syntaxHighlight: cssSyntaxHighlight,
	},
	HTML: {
		mimeTypeContains: ['html'],
		syntaxHighlight: htmlSyntaxHighlight,
	},
	Doc: {
		mimeTypeContains: ['text/'],
	},
	Img: {
		mimeTypeContains: ['image/'],
	},
	Font: {
		mimeTypeContains: ['font/', 'font'],
	},
	Media: {
		mimeTypeContains: ['audio/', 'video/'],
	},
} as const satisfies Record<string, ContentTypeUtility>;

export const CONTENT_TYPE_GROUPS = [...objectKeys(CONTENT_TYPE_GROUP_SPECIFIC_UTILITIES), 'Other'] as const;

export type ContentTypeGroup = (typeof CONTENT_TYPE_GROUPS)[number];

export function getContentTypeGroup(mimeType?: string): ContentTypeGroup {
	if (!mimeType) {
		return 'Other';
	}

	const caseInsensitiveMimeType = mimeType.toLowerCase();
	for (const [group, { mimeTypeContains }] of objectEntries(CONTENT_TYPE_GROUP_SPECIFIC_UTILITIES)) {
		if (mimeTypeContains.some((substring) => caseInsensitiveMimeType.includes(substring))) {
			return group;
		}
	}
	return 'Other';
}

export function getSyntaxHighlight(mimeType?: string) {
	const contentTypeGroup = getContentTypeGroup(mimeType);
	if (contentTypeGroup === 'Other') {
		return;
	}
	const { syntaxHighlight } = CONTENT_TYPE_GROUP_SPECIFIC_UTILITIES[contentTypeGroup] as ContentTypeUtility;
	return syntaxHighlight;
}
