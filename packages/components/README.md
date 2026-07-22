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

## Browser Support

- Modern browsers with ES2020+ support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+


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

// Advanced/Internal exports from list-har-entries
import ListHAREntriesProvider from '@har-analyzer/components/list-har-entries';
import ListHAREntriesTable from '@har-analyzer/components/list-har-entries';
import ListHAREntriesTableHeader from '@har-analyzer/components/list-har-entries';
```

## Components

### Feature Components

#### **HARAnalyzer**
Complete standalone application with integrated file upload and viewer. Perfect for drop-in usage.

```tsx
import HARAnalyzer from '@har-analyzer/components/har-analyzer';

<HARAnalyzer logo={<MyLogo />} appName="Network Inspector" />
```

**Features:**
- File upload via drag-and-drop
- Integrated network table
- Detail panel viewer
- Theme switcher (dark/light mode)
- Content width toggle
- Persistent preferences

**Props:**

| Name      | Type            | Required | Description                          |
|-----------|-----------------|----------|--------------------------------------|
| logo      | React.ReactNode | No       | A logo to display in the header.     |
| appName   | string          | No       | The name of the application.         |

---

#### **HAREntriesViewer**
Customizable multi-panel dashboard for viewing and comparing HAR entries. Manages its own board layout with resizable panels.

```tsx
import HAREntriesViewer from '@har-analyzer/components/har-entries-viewer';

<HAREntriesViewer
  harEntries={entries}
  tableTitle="Network Requests"
/>
```

**Features:**
- Board layout with resizable, draggable panels
- Network request table (left panel)
- Multiple detail panels (right side, configurable)
- Side-by-side comparison mode
- Multi-select entries
- Entry headers customization
- Auto-cleanup of stale panels

**Props:**

| Name          | Type                          | Required | Description                                      |
|---------------|-------------------------------|----------|--------------------------------------------------|
| harEntries    | HAREntry[]                    | Yes      | An array of HAR entries.                         |
| tableTitle    | string                        | No       | Title of the table displaying the HAR entries.   |

---

#### **ListHAREntries**
Network request table with advanced filtering and sorting capabilities.

```tsx
import ListHAREntries from '@har-analyzer/components/list-har-entries';

<ListHAREntries
  harEntries={entries}
  selectedHAREntries={selected}
  onSelectionChange={setSelected}
/>
```

**Features:**
- Columns: URL, Method, Status (with status indicators), MIME type, Time, Size
- Content type filtering
- Error status filtering
- Column visibility preferences
- Sortable columns
- Multi-select support
- Row-level detail access

**Props:**

| Name                | Type                                      | Required | Description                              |
|---------------------|-------------------------------------------|----------|------------------------------------------|
| harEntries          | HAREntry[]                                | Yes      | The entries to display in the table.     |
| selectedHAREntries  | HAREntry[]                                | Yes      | Entries to remain selected in the table. |
| onSelectionChange   | (selectedHAREntries: HAREntry[]) => void  | Yes      | Callback when entries are selected.      |
| title               | string                                    | No       | Optional title for the list.             |

---

##### Advanced Exports

For advanced use cases, the following internal components are also exported:

**`ListHAREntriesProvider`** — Context provider for managing HAR entries state and filtering logic.

**`ListHAREntriesTable`** — The underlying enhanced table component for displaying entries.

**`ListHAREntriesTableHeader`** — Configurable header component with filtering options for content types and error statuses.

---

#### **ViewHAREntry**
Tabbed inspector for detailed request/response analysis.

```tsx
import ViewHAREntry from '@har-analyzer/components/view-har-entry';

<ViewHAREntry
  harEntry={entry}
  initialSelectedTabId="request-headers"
  onSelectedTabIdChange={handleTabChange}
/>
```

**Tabs:**
- **Request Headers** — URL, method, status, custom headers
- **Request Payload** — Query parameters and request body with syntax highlighting
- **Response Headers** — Status code, cookies, custom headers
- **Response Payload** — Response body with syntax highlighting
- **Raw** — Full HAR entry in JSON view (lazy-loaded)

**Features:**
- Lazy-loaded tab content (reduces initial bundle)
- Syntax highlighting (JSON, HTML, JS, CSS)
- Base64 decoding for images and encoded content
- Copy-to-clipboard for header values

**Props:**

| Name                   | Type      | Required | Description                                    |
|------------------------|-----------|----------|------------------------------------------------|
| harEntry               | HAREntry  | Yes      | The HAR entry to display details for.          |
| initialSelectedTabId   | string    | No       | The ID of the initially selected tab.          |
| onSelectedTabIdChange  | (tabId: string) => void | No | Callback when the selected tab changes. |

---

#### **HARFileUploader**
Drag-and-drop file uploader with validation.

```tsx
import HARFileUploader from '@har-analyzer/components/har-file-uploader';

<HARFileUploader onChange={({ harEntries, harFileName }) => {
  console.log(`Loaded ${harEntries.length} entries from ${harFileName}`);
}} />
```

**Features:**
- Drag-and-drop interface
- File type validation (`.har` only)
- Error display with helpful messages
- Async file reading
- Returns parsed HAR entries array

**Props:**

| Name      | Type                                                               | Required | Description                                      |
|-----------|--------------------------------------------------------------------|----------|--------------------------------------------------|
| onChange  | `(args: { harEntries: HAREntry[]; harFileName?: string }) => void` | Yes      | Callback when a HAR file is uploaded.             |

---

### Context Providers

#### **HARAnalyzerPreferencesStore**
Pluggable storage backend for user preferences (themes, table settings, etc.).

```tsx
import HARAnalyzerPreferencesStore, { type UserPreferencesStore } from '@har-analyzer/components/har-analyzer-preferences-store';

const storage: UserPreferencesStore = {
  getPreference: async (key) => localStorage.getItem(key),
  setPreference: async (key, value) => localStorage.setItem(key, value),
};

<HARAnalyzerPreferencesStore userPreferencesStore={storage}>
  {/* All child components can now use preferences */}
</HARAnalyzerPreferencesStore>
```

**Usage:**
Provides a persistent context for managing user preferences (like theme, content width, table preferences, and board layouts). You must wrap your application in `HARAnalyzerPreferencesStore` and provide a `userPreferencesStore` object that bridges external async storage (like browser storage APIs or Chrome Extensions API) into the library.

## Type & Utility Exports

The library exports utility types and helper functions for type-safe integration and consumer logic:

```tsx
import type { HAREntry, HARContent, ContentTypeGroup } from '@har-analyzer/components';

import {
  getHARContentFromFile,
  getHAREntriesFilteredByContentType,
  getHAREntriesWithErrorResponse,
  getHAREntryId,
  isErrorResponse,
  getContentTypeGroup,
  getFormattedDateTime,
  prettyBytes,
} from '@har-analyzer/components';
```

### Types

- **`HAREntry`** — Standard HTTP Archive entry object
- **`HARContent`** — HTTP Archive content structure
- **`ContentTypeGroup`** — Categorized content type (e.g., `'JSON'`, `'XML'`, `'JS'`, `'CSS'`, `'HTML'`, `'Doc'`, `'Img'`, `'Font'`, `'Media'`, `'Other'`)

### Functions

### `getHARContentFromFile(fileContent: unknown): HARContent`
Parses a JSON string into a structured `HARContent` object. Throws an error if the content is not a valid JSON string.

### `getHAREntriesFilteredByContentType(harEntries: HAREntry[], contentTypeFilters: ContentTypeGroup[]): HAREntry[]`
Filters an array of HAR entries by their response MIME types mapped to high-level content type groups (e.g., `'JSON'`, `'XML'`, `'JS'`, `'CSS'`, `'HTML'`, `'Doc'`, `'Img'`, `'Font'`, `'Media'`, `'Other'`).

### `getHAREntriesWithErrorResponse(harEntries: HAREntry[]): HAREntry[]`
Returns a filtered array of HAR entries containing only those that resulted in an error (based on `isErrorResponse`).

### `getHAREntryId(harEntry: HAREntry): string`
Generates a unique deterministic ID for a given HAR entry using a combination of `startedDateTime`, `time`, and `request.url`.

### `isErrorResponse(harEntry: HAREntry): boolean`
Returns `true` if the HAR entry's response has a status code less than 200 or greater than or equal to 400.

### `getContentTypeGroup(mimeType: string): ContentTypeGroup`
Categorizes a MIME type into a high-level content type group for filtering and display purposes.

### `getFormattedDateTime(dateString: string, format?: string): string`
Formats a date string with timezone support using date-fns.

### `prettyBytes(bytes: number): string`
Converts byte size to human-readable format (e.g., `1024` → `"1 KB"`).


## Contributing

Contributions are welcome! Please open issues or pull requests on [GitHub](https://github.com/theallanjoshua/har-analyzer).


## Development

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development in watch mode
pnpm dev

# Build for production
pnpm validate
```

### Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start watch mode for development |
| `pnpm validate` | Build the production-ready library |
| `pnpm lint` | Run ESLint to check code quality |
| `pnpm check-types` | Type check all TypeScript files |

### Project Structure

This package is part of a monorepo managed by Turbo. Key directories:

```
lib/
├── components/              # Reusable UI building blocks
│   ├── enhanced-board/      # Configurable dashboard layout (grid-based panels)
│   ├── enhanced-table/      # Advanced table with filtering, sorting, preferences
│   ├── error-boundary.tsx   # Error handling HOC wrapper
│   ├── json-viewer.tsx      # Syntax-highlighted JSON display
│   ├── lazy-load.tsx        # Suspense fallback wrapper
│   ├── collapsible-*.tsx    # Collapsible sections and key-value lists
│   └── [spacing]            # Layout utilities (gaps, padding, alignment)
├── features/                # Feature modules (complete, composable)
│   ├── har-analyzer/                      # Standalone app component
│   ├── har-entries-viewer/                # Multi-panel dashboard viewer
│   ├── list-har-entries/                  # Network requests table
│   ├── view-har-entry/                    # Detailed entry inspector
│   ├── har-file-uploader/                 # File upload handler
│   └── har-analyzer-preferences-store/    # Preferences management context
├── context/                 # State management (React Context)
│   ├── user-preferences/          # Theme & UI preferences
│   └── user-preferences-store/    # Pluggable storage backend
├── hooks/                   # Custom React hooks
│   └── remaining-view-port-height.tsx  # Dynamic height calculation
└── utils/                   # Utility functions and helpers
    ├── har.ts                  # HAR parsing, filtering, ID generation
    ├── content-type.ts         # MIME type categorization & highlighting
    ├── file-upload.ts          # File validation & reading
    ├── date.ts                 # Date formatting with timezone support
    ├── json.ts                 # JSON serialization/deserialization
    ├── array.ts                # Array manipulation helpers
    └── common.ts               # General utilities
```

### Before Submitting a PR

1. Ensure build & tests pass: `pnpm validate`
2. Verify no breaking changes to the public API
3. Include changes to type definitions if modifying components

### Performance Considerations

When adding new features:
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to library components
- Prefer lazy loading for heavy components
- Keep dependency arrays minimal to avoid stale closures
- Use Set-based lookups for O(1) filtering operations

## License

[MIT](https://github.com/theallanjoshua/har-analyzer/blob/main/LICENSE)