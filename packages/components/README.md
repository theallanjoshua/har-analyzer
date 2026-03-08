# @har-analyzer/components

Reusable React components for HAR Analyzer.

## ✨ Features

- 📦 **Drop-in Dashboard**: Use the full `<HARAnalyzer />` component for a complete, ready-to-run HTTP Archive visualization tool, or compose individual panels.
- 🔍 **Advanced Filtering**: Filter network entries quickly by content types (JSON, HTML, JS, CSS, etc.) or error statuses via `<HAREntriesFilters />`.
- 🕵️ **Deep Inspection**: Inspect detailed request/response headers, decoded payloads, and syntax-highlighted response bodies with `<ViewHAREntry />`.
- 🛠️ **Persistent Preferences**: Context providers remember user preferences like themes (dark/light mode), table column layouts, and dashboard layouts effortlessly via the `<HARAnalyzerPreferencesProvider />`.
- 🎨 **Modern UI**: Built on top of the [Cloudscape Design System](https://cloudscape.design/).
- ⌨️ **Type Safe**: Fully written in TypeScript with exported utility types (`HARContent`, `HAREntry`) for standard HTTP Archive structures.

## Installation

```sh
npm install @har-analyzer/components
# or
yarn add @har-analyzer/components
# or
pnpm add @har-analyzer/components
```

### Peer Dependencies

This library relies heavily on [Cloudscape Design System](https://cloudscape.design/) and React. Consumers MUST install the following peer dependencies in their own workspace:

```sh
npm install react react-dom \
  @cloudscape-design/components \
  @cloudscape-design/board-components \
  @cloudscape-design/code-view \
  @cloudscape-design/collection-hooks \
  @cloudscape-design/design-tokens \
  @cloudscape-design/global-styles
```

## Usage & Setup

Clients **must** wrap the components with `HARAnalyzerPreferencesProvider` (to handle user preferences like themes and table settings) and Cloudscape's `<I18nProvider>` (for localization).

```jsx
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.js';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import useLocalStorageState from 'use-local-storage-state';
import HAREntriesViewer from '@har-analyzer/components/har-entries-viewer';
import HARAnalyzerPreferencesProvider from '@har-analyzer/components/har-analyzer-preferences';

// Provide a custom usePreference hook conforming to:
// (key: string) => readonly [string | undefined, (preference: string) => void]
const useWebStorage = (key) => useLocalStorageState(key);

function App() {
  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <HARAnalyzerPreferencesProvider usePreferenceStore={useWebStorage}>
        <HAREntriesViewer harEntries={yourHarEntriesArray} />
      </HARAnalyzerPreferencesProvider>
    </I18nProvider>
  );
}
```

## Imports

The library supports both **top-level** imports and **component-level** imports.

**Top-level:**
```javascript
import {
  HARAnalyzer,
  HARAnalyzerPreferencesProvider,
  HAREntriesViewer,
  HARFileUploader,
  ViewHAREntry,
  ListHAREntries,
  useHAREntriesFilters
} from '@har-analyzer/components';
```

**Component-level:**
```javascript
import HARAnalyzer from '@har-analyzer/components/har-analyzer';
import HARAnalyzerPreferencesProvider from '@har-analyzer/components/har-analyzer-preferences';
import HAREntriesViewer from '@har-analyzer/components/har-entries-viewer';
import HARFileUploader from '@har-analyzer/components/har-file-uploader';
import ViewHAREntry from '@har-analyzer/components/view-har-entry';
import ListHAREntries from '@har-analyzer/components/list-har-entries';
import useHAREntriesFilters from '@har-analyzer/components/har-entries-filters';
```

## Components

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
| logo      | React.ReactNode | No       | A logo to display in the header.     |
| appName   | string          | No       | The name of the application.         |

---

### HAREntriesViewer

```jsx
import HAREntriesViewer from '@har-analyzer/components/har-entries-viewer';

function App() {
  return (
    <HAREntriesViewer harEntries={yourHarEntriesArray} />
  );
}
```

**Props:**

| Name          | Type                          | Required | Description                                      |
|---------------|-------------------------------|----------|--------------------------------------------------|
| title         | string                        | no       | Title of the table displaying the HAR entries    |
| harEntries    | HAREntry[]                    | Yes      | An array of HAR entries.                         |

---

### ListHAREntries

Displays an enhanced table representing a list of HAR entries.

```jsx
import ListHAREntries from '@har-analyzer/components/list-har-entries';

function App() {
  return (
    <ListHAREntries
      harEntries={yourHarEntriesArray}
      onChange={(entry) => console.log('Selected:', entry)}
    />
  );
}
```

**Props:**

| Name      | Type      | Required | Description                          |
|-----------|-----------|----------|--------------------------------------|
| harEntries| HAREntry[]| Yes      | The entries to display in the table. |
| onChange  | function  | Yes      | Callback when an entry is selected.  |

---

### ViewHAREntry

Displays details for a single selected network entry.

```jsx
import ViewHAREntry from '@har-analyzer/components/view-har-entry';

function App() {
  return <ViewHAREntry harEntry={yourHarEntry} />;
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
      onChange={({ harEntries, harFileName }) => console.log(harEntries, harFileName)}
    />
  );
}
```

**Props:**

| Name      | Type                                                               | Required | Description                                      |
|-----------|--------------------------------------------------------------------|----------|--------------------------------------------------|
| onChange  | `(args: { harEntries: HAREntry[]; harFileName?: string }) => void` | Yes      | Callback when a HAR file is uploaded.             |

---

### HARAnalyzerPreferencesProvider

Provides a persistent context for managing user preferences (like theme, content width, table preferences and board layouts). You must wrap your application in `HARAnalyzerPreferencesProvider` and provide a `usePreferenceStore` hook that bridges external storage (like browser storage or Chrome Extensions API) into the library.
```jsx
import HARAnalyzerPreferencesProvider from '@har-analyzer/components/har-analyzer-preferences';

const useWebStorage = (key) => useLocalStorageState(key);

function App() {
  return (
      <HARAnalyzerPreferencesProvider usePreferenceStore={useWebStorage}>
        ...your HAR Analyzer components
      </HARAnalyzerPreferencesProvider>
  );
}
```

---

## HAR Utilities

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