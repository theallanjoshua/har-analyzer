import Link from '@cloudscape-design/components/link';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import prettyBytes from 'pretty-bytes';
import { useMemo } from 'react';
import EnhancedTable, { type EnhancedTableColumnsDefinition } from '~/components/enhanced-table';
import { getFormattedCurrentTimeZone, getFormattedDateTime } from '~/utils/date';
import { type HAREntry, isErrorResponse } from '~/utils/har';

// This ID is used to store user's table preferences in local storage.
// It should be unique across the application.
// Changing this ID will reset user's table preferences.
const TABLE_ID = 'list-har-entries';

const DEFAULT_COLUMNS_DEFINITION: EnhancedTableColumnsDefinition<HAREntry> = {
	url: {
		header: 'URL',
		cell: (item) => {
			const value = item.request.url;
			const content = (
				<Link external href={value}>
					{value}
				</Link>
			);
			return { value, content };
		},
	},
	method: {
		header: 'Method',
		width: 140,
		cell: (item) => {
			const value = item.request.method;
			return { value };
		},
	},
	status: {
		header: 'Status',
		type: 'number',
		width: 120,
		cell: (item) => {
			const value = item.response.status;
			const error = item.response._error;
			const errorStatusContent = (
				<StatusIndicator type="error">
					{value} {error && `(${error})`}
				</StatusIndicator>
			);
			if (isErrorResponse(item)) {
				return {
					value,
					content: errorStatusContent,
				};
			}
			if (value >= 300) {
				return {
					value,
					content: <StatusIndicator type="warning">{value}</StatusIndicator>,
				};
			}
			if (value >= 200) {
				return {
					value,
					content: <StatusIndicator type="success">{value}</StatusIndicator>,
				};
			}
			return { value, content: errorStatusContent };
		},
	},
	mimeType: {
		header: 'Mime type',
		width: 240,
		cell: (item) => {
			const value = item.response.content.mimeType;
			return { value };
		},
	},
	timeTaken: {
		header: 'Time taken',
		type: 'number',
		width: 160,
		cell: (item) => {
			const value = item.time;
			const content = `${Math.ceil(value)} ms`;
			return { value, content };
		},
	},
	size: {
		header: 'Size',
		type: 'number',
		width: 120,
		cell: (item) => {
			const value = item.response.content.size;
			const content = prettyBytes(value);
			return { value, content };
		},
	},
	localStartTime: {
		header: `Started on (${getFormattedCurrentTimeZone()})`,
		type: 'date',
		width: 280,
		cell: ({ startedDateTime }) => {
			const value = new Date(startedDateTime);
			const content = getFormattedDateTime(startedDateTime);
			return { value, content };
		},
	},
	UTCstartTime: {
		header: 'Started on (UTC)',
		type: 'date',
		width: 280,
		isVisibleByDefault: false,
		cell: ({ startedDateTime }) => {
			const value = new Date(startedDateTime);
			const content = getFormattedDateTime(startedDateTime, 'UTC');
			return { value, content };
		},
	},
};

function getHeaderColumnsDefinition(headerNames: string[], type: 'request' | 'response') {
	return headerNames.reduce<EnhancedTableColumnsDefinition<HAREntry>>((acc, headerName) => {
		acc[`${type}_${headerName}`] = {
			header: `${type}.${headerName}`,
			width: 200,
			isVisibleByDefault: false,
			type: 'list',
			cell: (item) => {
				const value = item[type].headers.filter(({ name }) => name === headerName).map(({ value }) => value);
				return { value };
			},
		};
		return acc;
	}, {});
}

interface ListHAREntriesProps {
	harEntries: HAREntry[];
	requestHeaders: string[];
	responseHeaders: string[];
	onChange: (selectedHAREntry: HAREntry) => void;
}

export default function ListHAREntries({ harEntries, requestHeaders, responseHeaders, onChange }: ListHAREntriesProps) {
	const columnsDefinition = useMemo(() => {
		const requestHeaderColumnsDefinition = getHeaderColumnsDefinition(requestHeaders, 'request');
		const responseHeaderColumnsDefinition = getHeaderColumnsDefinition(responseHeaders, 'response');
		return {
			...DEFAULT_COLUMNS_DEFINITION,
			...requestHeaderColumnsDefinition,
			...responseHeaderColumnsDefinition,
		};
	}, [requestHeaders, responseHeaders]);

	return (
		<EnhancedTable
			id={TABLE_ID}
			columnsDefinition={columnsDefinition}
			items={harEntries}
			empty="No HAR entries found"
			selectionType="single"
			onSelectionChange={(selectedHAREntries) => {
				const selectedHAREntry = selectedHAREntries[0];
				if (selectedHAREntry) {
					onChange(selectedHAREntry);
				}
			}}
		/>
	);
}
