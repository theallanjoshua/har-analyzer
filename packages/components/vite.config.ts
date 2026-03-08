import react from '@vitejs/plugin-react';
import { readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json' with { type: 'json' };

const entryRoot = 'lib';
// If you change the below root, ensure the exports field in package.json is updated accordingly
const featuresRoot = 'features';
const featuresDir = resolve(__dirname, entryRoot, featuresRoot);

const featureFolders = readdirSync(featuresDir).filter((file) => {
	const filePath = resolve(featuresDir, file);
	return statSync(filePath).isDirectory();
});

const featureEntries = featureFolders.reduce<
	Record<string, string>
>((acc, folder) => {
	acc[folder] = `./${entryRoot}/${featuresRoot}/${folder}/index.tsx`;
	return acc;
}, {});

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxRuntime: 'automatic', // explicitly tell Vite to use the modern runtime instead of injecting import { jsx as _jsx } from "react/jsx-runtime"
		}),
		tsconfigPaths(),
		libInjectCss(),
		dts({ entryRoot }),
	],
	build: {
		minify: true,
		lib: {
			entry: {
				index: `./${entryRoot}/index.ts`,
				...featureEntries,
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
