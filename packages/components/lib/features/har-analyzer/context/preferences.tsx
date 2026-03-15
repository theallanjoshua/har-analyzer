import { createUserPreferencesContext } from '~/context/user-preferences';

const PREFERENCES_GROUP_NAME = 'har-analyzer';

export const {
	useUserPreferences: useAppContentWidthPreference,
	Provider: AppContentWidthProvider,
} = createUserPreferencesContext(`${PREFERENCES_GROUP_NAME}.isFullContentWidth`, false);

export const {
	useUserPreferences: useThemePreference,
	Provider: ThemeProvider,
} = createUserPreferencesContext(`${PREFERENCES_GROUP_NAME}.isDarkTheme`, false);
