import TokenGroup from '@cloudscape-design/components/token-group';
import { useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import { getHAREntryAttributesToValuesMap } from '~/utils/har';
import { useHAREntryHeadersPreference } from '../context/preferences';

interface ViewHAREntryHeaderProps {
	harEntries: HAREntry[];
	harEntry: HAREntry;
}

export default function ViewHAREntryHeader(props: ViewHAREntryHeaderProps) {
	const { harEntries, harEntry } = props;

	const harEntryAttributesToValuesMap = useMemo(() => getHAREntryAttributesToValuesMap(harEntries), [harEntries]);

	const [harEntryHeadersPreference] = useHAREntryHeadersPreference();

	const items = harEntryHeadersPreference.flatMap((attribute) => {
		if (!harEntryAttributesToValuesMap[attribute]) {
			return [];
		}
		const values = harEntryAttributesToValuesMap[attribute](harEntry);

		if (Array.isArray(values)) {
			return values.map((value) => ({
				label: value,
				description: attribute,
			}));
		}

		return [{
			label: String(values),
			description: attribute,
		}];
	});

	return <TokenGroup
		items={items}
		disableOuterPadding
	/>;
}
