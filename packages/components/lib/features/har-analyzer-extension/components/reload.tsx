import Button from '@cloudscape-design/components/button';
import Toggle from '@cloudscape-design/components/toggle';
import { useState } from 'react';
import HorizontalGap from '~/components/spacing/horizontal-gap';

export interface ReloadProps {
	onReload: (args: { ignoreCache: boolean }) => void;
}

export default function Reload(props: ReloadProps) {
	const { onReload } = props;

	const [ignoreCache, setIgnoreCache] = useState(false);

	return <HorizontalGap>
		<Toggle
			onChange={({ detail }) => { setIgnoreCache(detail.checked); }}
			checked={ignoreCache}
		>
			Disable cache
		</Toggle>
		<Button
			iconName="refresh"
			onClick={() => {
				onReload({ ignoreCache });
			}}
		/>
	</HorizontalGap>;
}
