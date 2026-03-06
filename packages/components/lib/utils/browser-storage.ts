import dbStorage from 'local-db-storage';

export const browserStorage = {
	get: async (key: string): Promise<string | undefined> => {
		return await dbStorage.getItem(key);
	},
	set: async (key: string, value: string): Promise<void> => {
		await dbStorage.setItem(key, value);
	},
};
