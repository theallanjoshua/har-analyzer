import { useCallback, useState } from 'react';
import type { HAREntry } from '~/utils/har';
import type { HARFileUploaderProps } from './component';

export default function useFileHAREntries() {
	const [harEntries, setHAREntries] = useState<HAREntry[]>([]);
	const [harFileName, setHARFileName] = useState<string>();

	const onUpload: HARFileUploaderProps['onUpload'] = useCallback(({ harEntries, harFileName }) => {
		setHAREntries(harEntries);
		setHARFileName(harFileName);
	}, []);

	const onRemove: HARFileUploaderProps['onRemove'] = useCallback(() => {
		setHAREntries([]);
		setHARFileName(undefined);
	}, []);

	return [
		{
			harEntries,
			harFileName,
		},
		{
			onUpload,
			onRemove,
		},
	] as const;
}
