# @har-analyzer/components

[![npm version](https://img.shields.io/npm/v/@har-analyzer/components.svg?style=flat)](https://www.npmjs.com/package/@har-analyzer/components)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@har-analyzer/components.svg?style=flat)](https://bundlephobia.com/package/@har-analyzer/components)
[![build status](https://img.shields.io/github/actions/workflow/status/theallanjoshua/har-analyzer/publish-har-analyzer-components.yml?branch=main&style=flat)](https://github.com/theallanjoshua/har-analyzer/actions)


Reusable React components for HAR Analyzer.

## 🚀 Features

- 📦 **Drop-in Dashboard**: Use the full `<HAREntriesViewer />` component for a complete, ready-to-run HTTP Archive visualization tool, or compose individual panels.
- ⚖️ **Entry Comparison**: Compare multiple HAR entries side-by-side to easily spot differences in headers, payloads, and responses by simply selecting multiple rows in the network table.
- 🔍 **Advanced Filtering**: Filter network entries quickly by content types (JSON, HTML, JS, CSS, etc.) or error statuses via `<HAREntriesFilters />`.
- 🕵️ **Deep Inspection**: Inspect detailed request/response headers, decoded payloads, and syntax-highlighted response bodies with `<ViewHAREntry />`.
- 🛠️ **Persistent Preferences**: Context providers remember user preferences like themes (dark/light mode) and table column layouts effortlessly via the `<HARAnalyzerPreferencesStore />`.
- 🎨 **Cloudscape UI**: Built on top of the [Cloudscape Design System](https://cloudscape.design/).
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

Clients **must** wrap the components with `HARAnalyzerPreferencesStore` (to handle user preferences like themes and table settings) and Cloudscape's `<I18nProvider>` (for localization).

```tsx
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.js';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import HAREntriesViewer from '@har-analyzer/components/har-entries-viewer';
import HARAnalyzerPreferencesStore, { type UserPreferencesStore } from '@har-analyzer/components/har-analyzer-preferences-store';

// Provide a store conforming to the UserPreferencesStore interface:
// getPreference: (key: string) => Promise<string | undefined>
// setPreference: (key: string, value: string) => Promise<void>
const myStorage: UserPreferencesStore = {
  getPreference: async (key) => localStorage.getItem(key) || undefined,
  setPreference: async (key, value) => localStorage.setItem(key, value),
};

function App() {
  return (
    <I18nProvider locale="en" messages={[enMessages]}>
      <HARAnalyzerPreferencesStore userPreferencesStore={myStorage}>
        <HAREntriesViewer tableTitle="My HAR Entries" harEntries={yourHarEntriesArray} />
      </HARAnalyzerPreferencesStore>
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
  HARAnalyzerPreferencesStore,
  HAREntriesViewer,
  HARFileUploader,
  ListHAREntries,
  ViewHAREntry,
} from '@har-analyzer/components';
```

**Component-level:**
```javascript
import HARAnalyzer from '@har-analyzer/components/har-analyzer';
import HARAnalyzerPreferencesStore from '@har-analyzer/components/har-analyzer-preferences-store';
import HAREntriesViewer from '@har-analyzer/components/har-entries-viewer';
import HARFileUploader from '@har-analyzer/components/har-file-uploader';
import ListHAREntries from '@har-analyzer/components/list-har-entries';
import ViewHAREntry from '@har-analyzer/components/view-har-entry';
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
    <HAREntriesViewer tableTitle="Requests" harEntries={yourHarEntriesArray} />
  );
}
```

**Props:**

| Name          | Type                          | Required | Description                                      |
|---------------|-------------------------------|----------|--------------------------------------------------|
| harEntries    | HAREntry[]                    | Yes      | An array of HAR entries.                         |
| tableTitle    | string                        | No       | Title of the table displaying the HAR entries.   |

---

### ListHAREntries

Displays an enhanced table representing a list of HAR entries.

```jsx
import ListHAREntries from '@har-analyzer/components/list-har-entries';

function App() {
  return (
    <ListHAREntries
      title="Requests"
      harEntries={yourHarEntriesArray}
      selectedHAREntries={[]}
      onSelectionChange={(entries) => console.log('Selected:', entries)}
    />
  );
}
```

**Props:**

| Name                | Type                                      | Required | Description                              |
|---------------------|-------------------------------------------|----------|------------------------------------------|
| title               | string                                    | No       | Optional title for the list.             |
| harEntries          | HAREntry[]                                | Yes      | The entries to display in the table.     |
| selectedHAREntries  | HAREntry[]                                | Yes      | Entries to remain selected in the table. |
| onSelectionChange   | (selectedHAREntries: HAREntry[]) => void  | Yes      | Callback when entries are selected.      |

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

### HARAnalyzerPreferencesStore

Provides a persistent context for managing user preferences (like theme, content width, table preferences, and board layouts). You must wrap your application in `HARAnalyzerPreferencesStore` and provide a `userPreferencesStore` object that bridges external async storage (like browser storage APIs or Chrome Extensions API) into the library.

```tsx
import HARAnalyzerPreferencesStore, { type UserPreferencesStore } from '@har-analyzer/components/har-analyzer-preferences-store';

const myStorage: UserPreferencesStore = {
  getPreference: async (key) => localStorage.getItem(key) || undefined,
  setPreference: async (key, value) => { localStorage.setItem(key, value); }
};

function App() {
  return (
      <HARAnalyzerPreferencesStore userPreferencesStore={myStorage}>
        ...your HAR Analyzer components
      </HARAnalyzerPreferencesStore>
  );
}
```

---

## HAR Utilities

Various types and utilities for working with HTTP Archive (.har) files are directly exported.

```typescript
import {
  getHARContentFromFile,
  getHAREntriesFilteredByContentType,
  getHAREntriesWithErrorResponse,
  getHAREntryId,
  isErrorResponse,
  type HARContent,
  type HAREntry,
  type ContentTypeGroup
} from '@har-analyzer/components';
```

### `getHARContentFromFile(fileContent: unknown): HARContent`
Parses a JSON string into a structured `HARContent` object. Throws an error if the content is not a valid JSON string.

### `getHAREntriesFilteredByContentType(harEntries: HAREntry[], contentTypeFilters: ContentTypeGroup[]): HAREntry[]`
Filters an array of HAR entries by their response MIME types mapped to high-level content type groups (e.g., `'JSON'`, `'XML'`, `'JS'`, `'CSS'`, `'HTML'`, `'Doc'`, `'Img'`, `'Font'`, `'Media'`, `'Other'`).

### `isErrorResponse(harEntry: HAREntry): boolean`
Returns `true` if the HAR entry's response has a status code less than 200 or greater than or equal to 400.

### `getHAREntriesWithErrorResponse(harEntries: HAREntry[]): HAREntry[]`
Returns a filtered array of HAR entries containing only those that resulted in an error (based on `isErrorResponse`).

### `getHAREntryId(harEntry: HAREntry): string`
Generates a unique deterministic ID for a given HAR entry using a combination of `startedDateTime`, `time`, and `request.url`.

---

## Development

- Run `pnpm dev` to start development in watch mode.
- Run `pnpm build` to build the package.

## Contributing

Contributions are welcome! Please open issues or pull requests on [GitHub](https://github.com/theallanjoshua/har-analyzer).

## License

[MIT](https://github.com/theallanjoshua/har-analyzer/blob/main/LICENSE)