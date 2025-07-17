import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '~/app';
import './index.scss';

const ROOT_ID = 'root';
const domNode = document.getElementById(ROOT_ID);

if (!domNode) {
	const errorMessage = `Root element not found. HTML does not contain an element with ID: "${ROOT_ID}"`;
	console.error(errorMessage);
	throw new Error(errorMessage);
}

const root = createRoot(domNode);
root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
