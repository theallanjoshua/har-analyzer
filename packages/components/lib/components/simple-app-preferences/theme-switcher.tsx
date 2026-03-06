import Toggle from '@cloudscape-design/components/toggle';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { useEffect } from 'react';
import { useThemePreference } from '~/hooks/app-preferences';

export default function ThemeSwitcher() {
	const [isDarkTheme, setIsDarkTheme] = useThemePreference();

	useEffect(() => {
		const mode = isDarkTheme ? Mode.Dark : Mode.Light;
		applyMode(mode);
	}, [isDarkTheme]);

	return (
		<Toggle onChange={({ detail }) => { setIsDarkTheme(detail.checked); }} checked={isDarkTheme}>
			Use dark theme
		</Toggle>
	);
}
