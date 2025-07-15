import { format } from 'date-fns';

const DEFAULT_DATE_TIME_FORMAT = 'yyyy-MM-dd hh:mm:ss:SSS a';

export function formatDate(dateString: string, formatString: string = DEFAULT_DATE_TIME_FORMAT) {
	try {
		return format(new Date(dateString), formatString);
	} catch (error) {
		console.error('Error formatting date:', error);
		return dateString; // Fallback to original string if formatting fails
	}
}
