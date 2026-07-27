import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { useEffect } from 'react';

export default function useBrowserTheme() {
	const applyTheme = () => {
		const isDark = chrome.devtools.panels.themeName === 'dark';
		applyMode(isDark ? Mode.Dark : Mode.Light);
	};

	useEffect(() => {
		applyTheme();
		chrome.devtools.panels.setThemeChangeHandler(applyTheme);
		return () => {
			chrome.devtools.panels.setThemeChangeHandler();
		};
	}, []);
}
