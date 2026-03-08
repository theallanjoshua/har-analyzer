import Button from '@cloudscape-design/components/button';
import Toggle from '@cloudscape-design/components/toggle';
import { useState } from 'react';
import HorizontalGap from '~/components/horizontal-gap';

export default function ReloadHAREntries() {
	const [ignoreCache, setIgnoreCache] = useState(false);

	return <HorizontalGap>
		<Toggle onChange={({ detail }) => { setIgnoreCache(detail.checked); }} checked={ignoreCache}>
			Disable cache
		</Toggle>
		<Button iconName="refresh" onClick={() => {
			chrome.devtools.inspectedWindow.reload({ ignoreCache });
		}}>Reload</Button>
	</HorizontalGap>;
}
