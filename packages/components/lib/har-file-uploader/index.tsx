import Box from '@cloudscape-design/components/box';
import FileDropzone from '@cloudscape-design/components/file-dropzone';
import FileInput from '@cloudscape-design/components/file-input';
import { useState } from 'react';
import VerticalGap from '~/components/vertical-gap';
import { getFilesErrors, readFileContents, SUPPORT_FILE_EXT } from '~/utils/file-upload';
import { getHARContentFromFile, type HarContent } from '~/utils/har';
import FileUploadError from './file-upload-error';

export interface HARFileUploaderProps {
	onChange: (harContent: HarContent, harFileName?: string) => void;
}

export default function HARFileUploader({ onChange }: HARFileUploaderProps) {
	const [filesErrors, setFilesErrors] = useState<string[]>([]);

	const onUpload = async (files: File[]) => {
		setFilesErrors([]);
		const errors = getFilesErrors(files);
		if (errors.length > 0) {
			setFilesErrors(errors);
			return;
		}

		try {
			const file = files[0];
			const fileName = file?.name;
			const fileContents = await readFileContents(file);
			const harContent = getHARContentFromFile(fileContents);
			onChange(harContent, fileName);
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
				<VerticalGap alignItems="center" size="s">
					<Box color="inherit">Drop your .har file here</Box>
					<Box color="inherit">or</Box>
					<FileInput accept={SUPPORT_FILE_EXT} value={[]} onChange={({ detail }) => onUpload(detail.value)}>
						Choose file
					</FileInput>
				</VerticalGap>
			</FileDropzone>
		</VerticalGap>
	);
}
