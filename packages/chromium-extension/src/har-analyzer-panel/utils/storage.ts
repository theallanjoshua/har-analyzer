import type { UserPreferencesStore } from '@har-analyzer/components';

export const userPreferencesStore: UserPreferencesStore = {
	getPreference: async (key: string) => {
		const result = await chrome.storage.local.get([key]);
		return result[key] as string;
	},
	setPreference: async (key: string, value: string) => {
		await chrome.storage.local.set({ [key]: value });
	},
};
