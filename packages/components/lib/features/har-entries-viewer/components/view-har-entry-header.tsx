import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
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
		const DEFAULT_ITEM = [{
			label: attribute,
			value: '-',
		}];

		if (!harEntryAttributesToValuesMap[attribute]) {
			return DEFAULT_ITEM;
		}

		const values = harEntryAttributesToValuesMap[attribute](harEntry);

		if (!Array.isArray(values)) {
			return [{
				label: attribute,
				value: String(values),
			}];
		}

		if (!values.length) {
			return DEFAULT_ITEM;
		}

		return values.map((value) => ({
			label: attribute,
			value,
		}));
	});

	return <KeyValuePairs
		items={items}
		columns={Math.min(items.length, 3)}
	/>;
}
