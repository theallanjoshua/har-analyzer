import Button from '@cloudscape-design/components/button';
import { useState } from 'react';
import type { HAREntry } from '@har-analyzer/components';

interface DownloadHARFileProps {
	harEntries: ReadonlyArray<HAREntry>;
}

export default function DownloadHARFile({ harEntries }: DownloadHARFileProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleDownload = () => {
		setIsLoading(true);
		try {
			const harContent = {
				log: {
					version: '1.2',
					creator: {
						name: 'Haroscope',
					},
					pages: [],
					entries: harEntries,
				},
			};

			const jsonString = JSON.stringify(harContent, null, 2);
			const blob = new Blob([jsonString], { type: 'application/json' });
			const url = URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = url;
			link.download = `haroscope-${Date.now()}.har`;
			document.body.appendChild(link);
			link.click();

			// Clean up
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Failed to download HAR file:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			loading={isLoading}
			iconName="download"
			onClick={handleDownload}
			disabled={harEntries.length === 0}
		/>
	);
}
