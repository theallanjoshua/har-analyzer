import type { PropsWithChildren } from 'react';
import Spinner from '@cloudscape-design/components/spinner';
import { Suspense } from 'react';

export default function LazyLoad({ children }: PropsWithChildren) {
	return <Suspense fallback={<Spinner size="large" />}>
		{children}
	</Suspense>;
}
