import type { NonCancelableCustomEvent } from '@cloudscape-design/components';
import type { FileUploadProps } from '@cloudscape-design/components/file-upload';
import FileUpload from '@cloudscape-design/components/file-upload';
import Spinner from '@cloudscape-design/components/spinner';
import {
	useCallback,
	useEffect,
	useState,
} from 'react';
import type { HAREntry } from '~/utils/har';
import { readFileContents, SUPPORT_FILE_EXT } from '~/utils/file-upload';
import { getHARContentFromFile } from '~/utils/har';

export interface HARFileUploaderProps {
	onUpload: (args: { harEntries: HAREntry[]; harFileName: string }) => void;
	onRemove: () => void;
}

export default function HARFileUploader(props: HARFileUploaderProps) {
	const {
		onUpload,
		onRemove,
	} = props;

	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<ReadonlyArray<File>>([]);
	const [filesErrors, setFilesErrors] = useState<string[]>([]);

	const onFilesChange = useCallback(async () => {
		setFilesErrors([]);

		const file = files[0];

		if (!file) {
			onRemove();
			return;
		}

		setIsLoading(true);

		try {
			const harFileName = file.name;
			const fileContents = await readFileContents(file);
			const harContent = getHARContentFromFile(fileContents);
			const harEntries = harContent.log.entries;
			onUpload({ harEntries, harFileName });
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
			setFilesErrors([errorMessage]);
		} finally {
			setIsLoading(false);
		}
	}, [files, onUpload, onRemove]);

	useEffect(() => {
		onFilesChange();
	}, [files, onFilesChange]);

	const onFileUploadChange = useCallback((event: NonCancelableCustomEvent<FileUploadProps.ChangeDetail>) => {
		const { value } = event.detail;
		setFiles(value);
	}, []);

	if (isLoading) {
		return <Spinner size='big' />;
	}

	return <FileUpload
		accept={SUPPORT_FILE_EXT}
		value={files}
		fileErrors={filesErrors}
		onChange={onFileUploadChange}
	/>;
}
