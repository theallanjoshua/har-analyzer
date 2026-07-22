import {
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

export function useRemainingViewportHeight<T extends HTMLElement = HTMLDivElement>() {
	const elementRef = useRef<T | null>(null);
	const [remainingHeight, setRemainingHeight] = useState(0);

	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element)
			return;

		const top = element.getBoundingClientRect().top;
		const viewportHeight = window.innerHeight;

		// eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
		setRemainingHeight(viewportHeight - top);
	}, []);

	return { elementRef, remainingHeight };
}
