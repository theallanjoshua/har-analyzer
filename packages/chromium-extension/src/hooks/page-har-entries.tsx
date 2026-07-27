import {
	useCallback,
	useEffect,
	useState,
} from 'react';
import type { HAREntry } from '@har-analyzer/components';

type ChromeNetworkRequest = chrome.devtools.network.Request;

function getHAREntry(networkRequest: ChromeNetworkRequest): Promise<HAREntry> {
	return new Promise((resolve) => {
		networkRequest.getContent((content, encoding) => {
			const enrichedEntry = {
				...networkRequest,
				response: {
					...networkRequest.response,
					content: {
						...networkRequest.response.content,
						text: content,
						encoding: encoding || networkRequest.response.content.encoding,
					},
				},
			} as unknown as HAREntry;

			resolve(enrichedEntry);
		});
	});
}

export default function usePageHAREntries() {
	const [harEntries, setHarEntries] = useState<HAREntry[]>([]);

	const onClear = useCallback(() => {
		setHarEntries([]);
	}, []);

	const onReload = useCallback((ignoreCache: boolean) => {
		chrome.devtools.inspectedWindow.reload({ ignoreCache });
	}, []);

	const loadHAREntries = useCallback(() => {
		onClear();
		chrome.devtools.network.getHAR(async (harLog) => {
			const { entries } = harLog;
			const harEntries = await Promise.all(
				entries.map((networkRequest) => getHAREntry(networkRequest as ChromeNetworkRequest)),
			);
			setHarEntries((prevEntries) => [...prevEntries, ...harEntries]);
		});
	}, [onClear]);

	const addHAREntry = useCallback(async (networkRequest: ChromeNetworkRequest) => {
		const harEntry = await getHAREntry(networkRequest);
		setHarEntries((prevEntries) => [...prevEntries, harEntry]);
	}, []);

	useEffect(() => {
		loadHAREntries();
	}, [loadHAREntries]);

	useEffect(() => {
		chrome.devtools.network.onRequestFinished.addListener(addHAREntry);
		chrome.devtools.network.onNavigated.addListener(loadHAREntries);

		return () => {
			chrome.devtools.network.onRequestFinished.removeListener(addHAREntry);
			chrome.devtools.network.onNavigated.removeListener(loadHAREntries);
		};
	}, [loadHAREntries, addHAREntry]);

	return [
		harEntries,
		{
			onClear,
			onReload,
		},
	] as const;
}
