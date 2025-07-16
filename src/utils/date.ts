import { formatInTimeZone } from 'date-fns-tz';

const DEFAULT_DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss:SSS a';

function getCurrentTimeZone() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getFormattedCurrentTimeZone() {
	return formatInTimeZone(new Date(), getCurrentTimeZone(), 'zzz');
}

export function getFormattedDateTime(dateString: string, timeZone?: string) {
	try {
		if (timeZone) {
			return formatInTimeZone(new Date(dateString), 'UTC', DEFAULT_DATE_TIME_FORMAT);
		}
		const currentTimeZone = getCurrentTimeZone();

		return formatInTimeZone(new Date(dateString), currentTimeZone, DEFAULT_DATE_TIME_FORMAT);
	} catch (error) {
		console.error('Error formatting date:', error);
		return dateString; // Fallback to original string if formatting fails
	}
}
