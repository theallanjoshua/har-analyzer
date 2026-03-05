import react from '@vitejs/plugin-react';
import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

function getRepositoryName() {
	// Get the git origin URL
	// Eg: https://github.com/user/repo-name.git, git@github.com:user/repo-name.git
	const originUrl = execSync('git config --get remote.origin.url').toString().trim();
	const repoParam = originUrl.split('/').at(-1);
	if (!repoParam?.includes('.git')) {
		throw new Error('Unexpected git origin URL format');
	}
	return repoParam.replace('.git', '');
}

const repositoryName = getRepositoryName();

// https://vite.dev/config/
export default defineConfig({
	base: `/${repositoryName}/`,
	plugins: [react(), tsconfigPaths()],
});
