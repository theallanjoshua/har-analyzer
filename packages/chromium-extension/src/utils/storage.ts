import type { ExternalStore } from '@har-analyzer/components/external-state';

export const chromeLocalStore: ExternalStore = {
	get: async (key: string) => {
		const result = await chrome.storage.local.get([key]);
		return result[key] as string;
	},
	set: async (key: string, value: string) => {
		await chrome.storage.local.set({ [key]: value });
	},
};
