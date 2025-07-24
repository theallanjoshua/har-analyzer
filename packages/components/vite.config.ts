import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { peerDependencies } from './package.json';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), libInjectCss(), dts()],
	build: {
		lib: {
			entry: 'lib/index.ts',
			formats: ['es']
		},
		rollupOptions: {
			external: Object.keys(peerDependencies)
		}
	}
});
