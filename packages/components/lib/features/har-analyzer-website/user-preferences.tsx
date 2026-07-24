import { createExternalState } from '~/features/external-state/factory';

const PREFERENCES_GROUP_NAME = 'har-analyzer';

export const {
	useExternalState: useAppContentWidthPreference,
	Provider: AppContentWidthPreferenceProvider,
} = createExternalState(`${PREFERENCES_GROUP_NAME}.isFullContentWidth`, false);

export const {
	useExternalState: useThemePreference,
	Provider: ThemePreferenceProvider,
} = createExternalState(`${PREFERENCES_GROUP_NAME}.isDarkTheme`, false);
