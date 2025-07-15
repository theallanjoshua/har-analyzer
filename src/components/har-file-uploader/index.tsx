import Box from '@cloudscape-design/components/box';
import FileDropzone from '@cloudscape-design/components/file-dropzone';
import FileInput from '@cloudscape-design/components/file-input';
import { useState } from 'react';
import { getFilesErrors, readFileContents, SUPPORT_FILE_EXT } from '~/utils/file-upload';
import { getHARContentFromFile, type HarContent } from '~/utils/har';
import VerticalGap from '../vertical-gap';
import FileUploadError from './file-upload-error';

interface HARFileUploaderProps {
	onChange: (harContent: HarContent) => void;
}

export default function HARFileUploader({ onChange }: HARFileUploaderProps) {
	const [filesErrors, setFilesErrors] = useState<string[]>([]);

	const onUpload = async (newFiles: File[]) => {
		setFilesErrors([]);
		const errors = getFilesErrors(newFiles);
		if (errors.length > 0) {
			setFilesErrors(errors);
			return;
		}

		try {
			const fileContents = await readFileContents(newFiles[0]);
			const harContent = getHARContentFromFile(fileContents);
			onChange(harContent);
		} catch (error) {
			console.error('Error reading HAR file:', error);
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
			setFilesErrors([errorMessage]);
		}
	};

	return (
		<VerticalGap>
			<FileUploadError errors={filesErrors} />
			<FileDropzone onChange={({ detail }) => onUpload(detail.value)}>
				<VerticalGap alignItems="center">
					<Box color="inherit">Drop your .har files here or select from below</Box>
					<FileInput accept={SUPPORT_FILE_EXT} value={[]} onChange={({ detail }) => onUpload(detail.value)}>
						Choose files
					</FileInput>
				</VerticalGap>
			</FileDropzone>
		</VerticalGap>
	);
}
