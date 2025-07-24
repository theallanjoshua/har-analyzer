import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ghPages } from 'vite-plugin-gh-pages';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	base: '/har-file-viewer/',
	plugins: [react(), tsconfigPaths(), ghPages()],
});
