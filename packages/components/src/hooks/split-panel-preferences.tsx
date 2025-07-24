import type { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import useLocalStorage from './local-storage.js';

export function useSplitPanelSize() {
	return useLocalStorage('splitPanelSize', 480);
}

export function useSplitPanelPreferences() {
	return useLocalStorage<AppLayoutProps.SplitPanelPreferences>('splitPanelPreferences', { position: 'side' });
}
