# @har-analyzer/components

Reusable React components for HAR Analyzer.

## Installation

```sh
npm install @har-analyzer/components
# or
yarn add @har-analyzer/components
# or
pnpm add @har-analyzer/components
```

## Components & Hooks

Below are the available exports and their usage examples:

### HARAnalyzer ([Demo](https://theallanjoshua.github.io/har-analyzer/))

```jsx
import HARAnalyzer from '@har-analyzer/components/har-analyzer';

function App() {
  return <HARAnalyzer appName="HAR Analyzer" />;
}
```

**Props:**

| Name      | Type            | Required | Description                          |
|-----------|-----------------|----------|--------------------------------------|
| logo      | React.ReactNode | No       | A logo to display in the header.    |
| appName   | string          | No       | The name of the application.        |

---

### HARContentViewer

```jsx
import HARContentViewer from '@har-analyzer/components/har-content-viewer';

function App() {
  return (
    <HARContentViewer
      harFileName="example.har"
      harContent={yourHarContent}
    />
  );
}
```

**Props:**

| Name          | Type                          | Required | Description                                      |
|---------------|-------------------------------|----------|--------------------------------------------------|
| harFileName   | string                        | No       | The name of the HAR file being viewed.          |
| harContent    | HarContent                    | No       | The HAR file content object.                    |

---

### HAREntryViewer

```jsx
import HAREntryViewer from '@har-analyzer/components/har-entry-viewer';

function App() {
  return <HAREntryViewer harEntry={yourHarEntry} />;
}
```

**Props:**

| Name      | Type      | Required | Description                          |
|-----------|-----------|----------|--------------------------------------|
| harEntry  | HAREntry  | Yes      | The HAR entry to display details for.|

---

### HARFileUploader

```jsx
import HARFileUploader from '@har-analyzer/components/har-file-uploader';

function App() {
  return (
    <HARFileUploader
      onChange={({ harContent, harFileName }) => console.log(harContent, harFileName)}
    />
  );
}
```

**Props:**

| Name      | Type                                                               | Required | Description                                      |
|-----------|--------------------------------------------------------------------|----------|--------------------------------------------------|
| onChange  | `(args: { harContent: HARContent; harFileName?: string }) => void` | Yes      | Callback when a HAR file is uploaded.           |

---

### useHAREntriesFilters

A custom React hook for filtering and searching HAR network entries.

```jsx
import { useHAREntriesFilters } from '@har-analyzer/components';

function App() {
  const { filteredEntries, HAREntriesFilters } = useHAREntriesFilters(entries);
  // ...
}
```

---

### HARAnalyzerPreferencesProvider

Provides a persistent context for managing user preferences (like theme, content width, table preferences and board layouts). By default, preferences rely on browser storage. However, you can provide a custom async store (e.g., to save preferences to a backend database or external extension API) by wrapping your application in `HARAnalyzerPreferencesProvider`.

```jsx
import HARAnalyzerPreferencesProvider from '@har-analyzer/components/har-analyzer-preferences';

// Optional: Custom external store
const customStore = {
  getPreference: async (key) => fetch(`/api/prefs/${key}`).then(res => res.text()),
  setPreference: async (key, value) => { await fetch(`/api/prefs/${key}`, { method: 'POST', body: value }) }
};

function App() {
  return (
    <HARAnalyzerPreferencesProvider store={customStore}>
      <HARAnalyzer appName="HAR Analyzer" />;
    </HARAnalyzerPreferencesProvider>
  );
}

```

---

### HAR Utilities

Various types and utilities for working with HTTP Archive (.har) files are directly exported.

```typescript
import {
  getHARContentFromFile,
  type HARContent,
  type HAREntry
} from '@har-analyzer/components';
```

---

## Development

- Run `pnpm dev` to start development in watch mode.
- Run `pnpm build` to build the package.

## Contributing

Contributions are welcome! Please open issues or pull requests on [GitHub](https://github.com/theallanjoshua/har-analyzer).

## License

[MIT](https://github.com/theallanjoshua/har-analyzer/blob/main/LICENSE)