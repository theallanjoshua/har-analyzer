import Multiselect from '@cloudscape-design/components/multiselect';
import { useMemo } from 'react';
import type { HAREntry } from '~/utils/har';
import { objectKeys } from '~/utils/common';
import { getHAREntryAttributesToValuesMap } from '~/utils/har';
import { useHAREntryHeadersPreference } from '../../context/preferences';

interface HAREntryHeaderPickerProps {
	harEntries: HAREntry[];
}

export default function HAREntryHeaderPicker(props: HAREntryHeaderPickerProps) {
	const { harEntries } = props;

	const options = useMemo(() => {
		const harEntryAttributesToValuesMap = getHAREntryAttributesToValuesMap(harEntries);
		return objectKeys(harEntryAttributesToValuesMap).map((attribute) => ({
			label: attribute,
			value: attribute,
		}));
	}, [harEntries]);

	const [harEntryHeadersPreference, setHarEntryHeadersPreference] = useHAREntryHeadersPreference();

	const selectedOptions = options.filter(({ value }) => harEntryHeadersPreference.includes(value));

	const onHAREntryHeadersChange = (newHAREntryHeaders: typeof options) => {
		const newHAREntryHeadersPreference = newHAREntryHeaders.map(({ value }) => value);
		setHarEntryHeadersPreference(newHAREntryHeadersPreference);
	};

	return (
		<Multiselect
			inlineTokens
			filteringType='auto'
			placeholder={'Pick HAR entry headers'}
			options={options}
			selectedOptions={selectedOptions}
			onChange={({ detail }) => { onHAREntryHeadersChange(detail.selectedOptions as typeof options); }}
		/>
	);
}
