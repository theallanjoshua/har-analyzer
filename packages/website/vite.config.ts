import react from '@vitejs/plugin-react';
import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const EXPECTED_REPO_NAME = 'har-analyzer';

function getRepositoryName() {
	// Get the git origin URL
	// Eg: https://github.com/user/repo-name.git, git@github.com:user/repo-name.git
	const originUrl = execSync('git config --get remote.origin.url').toString().trim();
	const repoParam = originUrl.split('/').at(-1);
	const repoName = repoParam?.replace('.git', '');
	if (repoName !== EXPECTED_REPO_NAME) {
		throw new Error(`Unexpected repository name: ${repoName}. Expected: ${EXPECTED_REPO_NAME}.
			If this was intentional, update the EXPECTED_REPO_NAME constant in vite.config.ts to match the actual repository name.`);
	}
	return repoName;
}

const repositoryName = getRepositoryName();

// https://vite.dev/config/
export default defineConfig({
	base: `/${repositoryName}/`,
	plugins: [react(), tsconfigPaths()],
});
