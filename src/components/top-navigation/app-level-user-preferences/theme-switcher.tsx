import Toggle from '@cloudscape-design/components/toggle';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { useEffect } from 'react';
import useTheme from '~/hooks/use-theme';

export default function ThemeSwitcher() {
	const [isDarkTheme, setIsDarkTheme] = useTheme();

	useEffect(() => {
		const mode = isDarkTheme ? Mode.Dark : Mode.Light;
		applyMode(mode);
	}, [isDarkTheme]);

	return (
		<Toggle onChange={({ detail }) => setIsDarkTheme(detail.checked)} checked={isDarkTheme}>
			Use dark theme?
		</Toggle>
	);
}
