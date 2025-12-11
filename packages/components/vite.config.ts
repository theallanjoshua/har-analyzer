import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { peerDependencies } from './package.json';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const entryRoot = 'lib';
const relativeEntryRoot = `./${entryRoot}`;

const COMPONENT_FOLDERS = [
	'har-analyzer',
	'har-entries-viewer',
	'har-entry-viewer',
	'har-file-uploader'
];

const componentSpecificEntries = COMPONENT_FOLDERS.reduce<Record<string, string>>((acc, folder) => {
	acc[folder] = `${relativeEntryRoot}/${folder}/index.tsx`;
	return acc;
}, {});

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), libInjectCss(), dts({ rollupTypes: true, entryRoot })],
	build: {
		minify: true,
		lib: {
			entry: {
				index: `${relativeEntryRoot}/index.ts`,
				...componentSpecificEntries
			},
			formats: ['es']
		},
		rollupOptions: {
			external: Object.keys(peerDependencies),
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: 'chunks/[name].js',
				assetFileNames: 'assets/[name].[ext]'
			}
		}
	}
});
