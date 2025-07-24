import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HarAnalyzer } from '@har-analyzer/components';
import '@cloudscape-design/global-styles/index.css';
import './index.scss';
const ROOT_ID = 'root';
const domNode = document.getElementById(ROOT_ID);
if (!domNode) {
    const errorMessage = `Root element not found. HTML does not contain an element with ID: "${ROOT_ID}"`;
    console.error(errorMessage);
    throw new Error(errorMessage);
}
const root = createRoot(domNode);
root.render(_jsx(StrictMode, { children: _jsx(HarAnalyzer, { appName: 'HAR Analyzer' }) }));
//# sourceMappingURL=index.js.map