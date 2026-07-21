import type { ReactNode } from 'react';
import type { HAREntry } from '~/utils/har';
import HorizontalGap from '~/components/horizontal-gap';
import SpaceBetween from '~/components/space-between';
import CompareModeSwitcher from './compare-mode-switcher';
import HAREntryHeaderPicker from './har-entry-header-picker';

interface HAREntriesViewerActionStripeProps {
	harEntries: HAREntry[];
	additionalActions?: ReactNode;
}

export default function HAREntriesViewerActionStripe(props: HAREntriesViewerActionStripeProps) {
	const { harEntries, additionalActions } = props;

	return <SpaceBetween>
		<HorizontalGap>
			<CompareModeSwitcher />
			<HAREntryHeaderPicker harEntries={harEntries} />
		</HorizontalGap>
		{additionalActions}
	</SpaceBetween>;
}
