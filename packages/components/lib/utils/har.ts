import type { Har } from 'har-format';
import type { ContentTypeGroup } from './content-type';
import { getContentTypeGroup } from './content-type';

export type { ContentTypeGroup };

export type HARContent = Har;

export function getHARContentFromFile(fileContent: unknown): HARContent {
	if (typeof fileContent !== 'string') {
		throw new TypeError('File contents are invalid. Expected contents to be a stringified JSON.');
	}
	try {
		const parsedContent = JSON.parse(fileContent);
		// const isHarContent = harValidator(parsedContent);
		// if (!isHarContent) {
		// 	const errorMessagePrefix = 'File contents are not a valid HAR file. Validation errors:';
		// 	const validationErrors = harValidator.errors?.map(({ message }) => message).join(', ');
		// 	console.error(errorMessagePrefix, validationErrors);
		// 	throw new Error(`${errorMessagePrefix} ${validationErrors}`);
		// }
		return parsedContent as unknown as HARContent;
	} catch (error) {
		const errorMessage = 'Failed to JSON parse file content';
		throw new Error(errorMessage, { cause: error });
	}
}

type HAREntryWithoutError = HARContent['log']['entries'][number];
type HARResponseWithError = HAREntryWithoutError['response'] & { _error?: string };
export type HAREntry = Omit<HAREntryWithoutError, 'response'> & {
	response: HARResponseWithError;
};

export function getHAREntriesFilteredByContentType(harEntries: HAREntry[], contentTypeFilters: ContentTypeGroup[]) {
	if (!contentTypeFilters.length) {
		return harEntries;
	}

	const harEntriesFilteredByContentType = harEntries.filter((harEntry) => {
		const mimeType = harEntry.response.content.mimeType;
		const contentTypeGroup = getContentTypeGroup(mimeType);
		return contentTypeFilters.includes(contentTypeGroup);
	});

	return harEntriesFilteredByContentType;
}

export function isErrorResponse(harEntry: HAREntry) {
	const statusCode = harEntry.response.status;
	return statusCode < 200 || statusCode >= 400;
}

export function getHAREntriesWithErrorResponse(harEntries: HAREntry[]) {
	return harEntries.filter((harEntry) => isErrorResponse(harEntry));
}

export const HAR_HEADER_TYPES = ['request', 'response'] as const;

export function getUniqueHeaderNames(harEntries: HAREntry[], type: (typeof HAR_HEADER_TYPES)[number]) {
	const headerNames = new Set<string>();
	harEntries.forEach((entry) => {
		const headers = entry[type].headers;
		headers.forEach((header) => {
			headerNames.add(header.name);
		});
	});
	return Array.from(headerNames);
}

type HAREntryAttributesToValueMap = Record<string, (harEntry: HAREntry) => string | number | string[]>;

export const DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP = {
	'request.shortUrl': (harEntry) => {
		const { url } = harEntry.request;
		// eslint-disable-next-line ts/prefer-nullish-coalescing
		const value = url.split('/').at(-1) || url;
		return value;
	},
	'request.url': (harEntry) => harEntry.request.url,
	'request.method': (harEntry) => harEntry.request.method,
	'response.status': (harEntry) => harEntry.response.status,
} satisfies HAREntryAttributesToValueMap;

type HAREntryHeadersToValueMap = Record<string, (harEntry: HAREntry) => string[]>;

export function getHAREntryHeadersToValuesMap(harEntries: HAREntry[]) {
	return HAR_HEADER_TYPES.reduce<HAREntryHeadersToValueMap>((acc, type) => {
		const uniqueHeaderNames = getUniqueHeaderNames(harEntries, type);
		uniqueHeaderNames.forEach((headerName) => {
			const key = `${type}.headers.${headerName}`;
			acc[key] = (harEntry: HAREntry) => {
				const header = harEntry[type].headers.filter(({ name }) => name === headerName);
				return header.map(({ value }) => value);
			};
		});
		return acc;
	}, {});
}

export function getHAREntryAttributesToValuesMap(harEntries: HAREntry[]): HAREntryAttributesToValueMap {
	const harEntryHeadersToValuesMap = getHAREntryHeadersToValuesMap(harEntries);
	return {
		...DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP,
		...harEntryHeadersToValuesMap,
	};
}

export function getHAREntryId(harEntry: HAREntry) {
	return `${harEntry.startedDateTime}_${harEntry.time}_${harEntry.request.url}`;
}
