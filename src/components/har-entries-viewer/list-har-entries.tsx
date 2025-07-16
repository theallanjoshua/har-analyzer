import Link from '@cloudscape-design/components/link';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import prettyBytes from 'pretty-bytes';
import { getFormattedCurrentTimeZone, getFormattedDateTime } from '~/utils/date';
import type { HAREntry } from '~/utils/har';
import EnhancedTable, { type EnhancedTableColumnsDefinition } from '../enhanced-table';

// This ID is used to store user's table preferences in local storage.
// It should be unique across the application.
// Changing this ID will reset user's table preferences.
const TABLE_ID = 'list-har-entries';

const columnsDefinition: EnhancedTableColumnsDefinition<HAREntry> = {
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
			const errorStatusContent = <StatusIndicator type="error">{value}</StatusIndicator>;
			try {
				const statusCode = Number(value);
				if (statusCode >= 400) {
					return {
						value,
						content: errorStatusContent,
					};
				}
				if (statusCode >= 300) {
					return {
						value,
						content: <StatusIndicator type="warning">{value}</StatusIndicator>,
					};
				}
				if (statusCode >= 200) {
					return {
						value,
						content: <StatusIndicator type="success">{value}</StatusIndicator>,
					};
				}
			} catch (error) {
				console.error('Invalid status code:', value, error);
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
		cell: ({ startedDateTime }) => {
			const value = new Date(startedDateTime);
			const content = getFormattedDateTime(startedDateTime, 'UTC');
			return { value, content };
		},
	},
};

interface ListHAREntriesProps {
	harEntries: HAREntry[];
	onChange: (selectedHAREntry: HAREntry) => void;
}

export default function ListHAREntries({ harEntries, onChange }: ListHAREntriesProps) {
	return (
		<EnhancedTable
			id={TABLE_ID}
			columnsDefinition={columnsDefinition}
			items={harEntries}
			empty={<div>No requests found in the HAR file.</div>}
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
