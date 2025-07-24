export const SUPPORT_FILE_EXT = '.har';

function isFileExtensionSupported(file: File | undefined) {
	if (!file) {
		return false;
	}
	return file.name.toLowerCase().endsWith(SUPPORT_FILE_EXT);
}

function isFilesCountAllowed(files: File[]) {
	return files.length !== 1;
}

export function getFilesErrors(files: File[]) {
	const errors = [];

	if (isFilesCountAllowed(files)) {
		errors.push('You can only upload one file at a time');
	}

	if (!isFileExtensionSupported(files[0])) {
		errors.push(`Only files with the "${SUPPORT_FILE_EXT}" extension are allowed`);
	}

	return errors;
}

export function readFileContents(file: File | undefined) {
	return new Promise((resolve, reject) => {
		if (!file) {
			reject(new Error('No HAR file provided'));
			return;
		}
		const reader = new FileReader();

		reader.onload = (event) => {
			try {
				const fileContent = event.target?.result;
				resolve(fileContent);
			} catch (e) {
				const errorMessage = 'Failed to JSON parse file content';
				console.error(`${errorMessage}:`, e);
				reject(new Error('errorMessage'));
			}
		};

		reader.onerror = () => {
			reject(new Error('Error reading HAR file'));
		};

		reader.readAsText(file);
	});
}
