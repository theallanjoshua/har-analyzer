import {
	useEffect,
	useState,
} from 'react';

export function usePreference(key: string) {
	const [preference, setPreference] = useState<string>();

	useEffect(() => {
		chrome.storage.local.get([key], (result) => {
			if (result[key] === undefined) {
				return;
			}
			setPreference(result[key] as string);
		});

		const handleStorageChange = (
			changes: { [key: string]: chrome.storage.StorageChange },
			areaName: string,
		) => {
			if (areaName === 'local' && key in changes) {
				setPreference(changes[key]?.newValue as string);
			}
		};

		chrome.storage.onChanged.addListener(handleStorageChange);

		return () => {
			chrome.storage.onChanged.removeListener(handleStorageChange);
		};
	}, [key]);

	const onPreferenceChange = (newValue: string) => {
		setPreference(newValue);
		chrome.storage.local.set({ [key]: newValue });
	};

	return [preference, onPreferenceChange] as const;
}
