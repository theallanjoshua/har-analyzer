import StatusIndicator from '@cloudscape-design/components/status-indicator';
import type { EnhancedTableColumnsDefinition } from '~/components/enhanced-table';
import type { HAREntry } from '~/utils/har';
import EnhancedTable from '~/components/enhanced-table';
import { HorizontalPadding } from '~/components/spacing/horizontal-padding';
import { getFormattedCurrentTimeZone, getFormattedDateTime } from '~/utils/date';
import { CookiesTablePreferencesProvider, useCookiesTablePreferences } from '../user-preferences';

type HAREntryCookie = HAREntry['request']['cookies'][number];

const COLUMNS_DEFINITION: EnhancedTableColumnsDefinition<HAREntryCookie> = {
	name: {
		header: 'Name',
		cell: (item) => {
			const value = item.name;
			return { value };
		},
	},
	value: {
		header: 'Value',
		cell: (item) => {
			const value = item.value;
			return { value };
		},
	},
	path: {
		header: 'Path',
		cell: (item) => {
			const value = item.path ?? '';
			return { value };
		},
	},
	domain: {
		header: 'Domain',
		cell: (item) => {
			const value = item.domain ?? '';
			return { value };
		},
	},
	expires: {
		header: `Expires (${getFormattedCurrentTimeZone()})`,
		type: 'date',
		cell: (item) => {
			if (!item.expires) {
				return { value: new Date(0), content: '' };
			}
			const value = new Date(item.expires);
			const content = getFormattedDateTime(item.expires);
			return { value, content };
		},
	},
	httpOnly: {
		header: 'HttpOnly',
		cell: ({ httpOnly = false }) => {
			const value = `${httpOnly}`;
			const content = <StatusIndicator type={httpOnly ? 'success' : 'error'}>{value}</StatusIndicator>;
			return { value, content };
		},
	},
	secure: {
		header: 'Secure',
		cell: ({ secure = false }) => {
			const value = `${secure}`;
			const content = <StatusIndicator type={secure ? 'success' : 'error'}>{value}</StatusIndicator>;
			return { value, content };
		},
	},
};

export default function Cookies({ harEntry }: { harEntry: HAREntry }) {
	return <HorizontalPadding>
		<CookiesTablePreferencesProvider>
			<EnhancedTable
				columnsDefinition={COLUMNS_DEFINITION}
				items={harEntry.request.cookies}
				useTablePreferences={useCookiesTablePreferences}
				getRowId={(item) => item.name}
			/>
		</CookiesTablePreferencesProvider>
	</HorizontalPadding>;
}
