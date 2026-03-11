import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	base: '',
	plugins: [
		react(),
		tsconfigPaths(),
		// Ensures hot module reloading when files in the 'public' directory change
		{
			name: 'watch-public-dir',
			buildStart() {
				this.addWatchFile(resolve(__dirname, 'public'));
			},
		},
	],
});
