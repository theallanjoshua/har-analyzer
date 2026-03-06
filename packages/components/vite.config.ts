import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json' with { type: 'json' };

const entryRoot = 'lib';

const COMPONENT_FOLDERS = [
	'har-analyzer',
	'har-analyzer-preferences',
	'har-content-viewer',
	'har-entries-filters',
	'har-entries-viewer',
	'har-entry-viewer',
	'har-file-uploader',
];

const componentSpecificEntries = COMPONENT_FOLDERS.reduce<
	Record<string, string>
>((acc, folder) => {
	acc[folder] = `./${entryRoot}/${folder}/index.tsx`;
	return acc;
}, {});

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		libInjectCss(),
		dts({ rollupTypes: true, entryRoot }),
	],
	build: {
		minify: true,
		lib: {
			entry: {
				index: `./${entryRoot}/index.ts`,
				...componentSpecificEntries,
			},
			formats: ['es'],
		},
		rollupOptions: {
			// Need this condition to match peerDependencies key (@cloudscape-design/components) to import path (@cloudscape-design/components/box)
			external: (id) =>
				Object.keys(packageJson.peerDependencies).some((dep) => id.startsWith(dep)),
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: 'chunks/[name].js',
				assetFileNames: 'assets/[name].[ext]',
			},
		},
	},
});
