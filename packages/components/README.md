# @har-analyzer/components

[![npm version](https://img.shields.io/npm/v/@har-analyzer/components.svg?style=flat)](https://www.npmjs.com/package/@har-analyzer/components)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@har-analyzer/components.svg?style=flat)](https://bundlephobia.com/package/@har-analyzer/components)
[![build status](https://img.shields.io/github/actions/workflow/status/theallanjoshua/har-analyzer/publish-har-analyzer-components.yml?branch=main&style=flat)](https://github.com/theallanjoshua/har-analyzer/actions)

Reusable React components and feature modules for HAR Analyzer.

[Checkout the demo here](https://theallanjoshua.github.io/har-analyzer/)

## What This Package Includes

- Ready-made dashboard modules for both web apps and browser extensions.
- A configurable HAR entries viewer with compare mode.
- File upload, tabbed HAR entry inspection, and network table components.
- External state helpers for persisting user preferences outside React state.
- HAR utilities and types for parsing/filtering/formatting entry data.

## Installation

```sh
npm install @har-analyzer/components
# or
yarn add @har-analyzer/components
# or
pnpm add @har-analyzer/components
```

### Peer Dependencies

Install peer dependencies in your app:

```sh
npm install react react-dom \
  @cloudscape-design/components \
  @cloudscape-design/board-components \
  @cloudscape-design/code-view \
  @cloudscape-design/collection-hooks \
  @cloudscape-design/design-tokens \
  @cloudscape-design/global-styles
```

## Quick Start

Most feature modules rely on:

- Cloudscape i18n provider.
- External store provider for persisted preferences.

```tsx
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en';
import type { ExternalStore } from '@har-analyzer/components/external-state';
import { ExternalStoreProvider } from '@har-analyzer/components/external-state';
import HARAnalyzerWebsite from '@har-analyzer/components/har-analyzer-website';

const store: ExternalStore = {
  get: async (key) => localStorage.getItem(key) ?? undefined,
  set: async (key, value) => localStorage.setItem(key, value),
};

export function App() {
  return (
    <I18nProvider locale='en' messages={[enMessages]}>
      <ExternalStoreProvider store={store}>
        <HARAnalyzerWebsite appName='HAR Analyzer' />
      </ExternalStoreProvider>
    </I18nProvider>
  );
}
```

## Public API

### Root Exports (`@har-analyzer/components`)

```tsx
import {
  HARAnalyzerWebsite,
  HARAnalyzerExtension,
  HAREntriesViewer,
  HAREntriesFiltersProvider,
  useFilteredHAREntries,
  HARFileUploader,
  useFileHAREntries,
  ListHAREntries,
  ViewHAREntry,
  ExternalStoreProvider,
  createExternalState,
  DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP,
  getHARContentFromFile,
  getHAREntriesFilteredByContentType,
  getHAREntriesWithErrorResponse,
  getHAREntryAttributesToValuesMap,
  getHAREntryHeadersToValuesMap,
  getHAREntryId,
  getUniqueHeaderNames,
  isErrorResponse,
  HAR_HEADER_TYPES,
} from '@har-analyzer/components';

import type {
  ExternalStore,
  HARAnalyzerExtensionProps,
  HARAnalyzerWebsiteProps,
  HAREntriesViewerWithProvidersProps,
  HARFileUploaderProps,
  ListHAREntriesProps,
  ViewHAREntryProps,
  HAREntry,
  HARContent,
  ContentTypeGroup,
} from '@har-analyzer/components';
```

### Feature Module Exports (`@har-analyzer/components/<feature>`)

- `external-state`
  - `ExternalStoreProvider`
  - `createExternalState`
  - type `ExternalStore`
- `har-analyzer-website`
  - default `HARAnalyzerWebsite`
  - type `HARAnalyzerWebsiteProps`
- `har-analyzer-extension`
  - default `HARAnalyzerExtension`
  - type `HARAnalyzerExtensionProps`
- `har-entries-viewer`
  - default `HAREntriesViewer`
  - type `HAREntriesViewerWithProvidersProps`
- `har-entries-filters`
  - default `HAREntriesFilters`
  - `HAREntriesFiltersProvider`
  - `useFilteredHAREntries`
- `har-file-uploader`
  - `HARFileUploader`
  - `useFileHAREntries`
  - type `HARFileUploaderProps`
- `list-har-entries`
  - default `ListHAREntries`
  - type `ListHAREntriesProps`
- `view-har-entry`
  - default `ViewHAREntry`
  - `DEFAULT_SELECTED_TAB_ID`
  - type `ViewHAREntryProps`

## Feature Modules

### HARAnalyzerWebsite

Drop-in website experience that composes:

- HAR file upload.
- Entries dashboard.
- Theme and content-width preferences via external state.

Props:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `logo` | `ReactNode` | No | Header logo element. |
| `appName` | `string` | No | Application title. Defaults to `HAR Analyzer`. |

---

### HARAnalyzerExtension

Extension-oriented viewer with built-in action controls.

Includes:

- Reload action with optional ignore-cache toggle.
- Clear action.
- Upload shortcut button.
- Download current entries as a HAR file.

Props:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `pageHAREntries` | `HAREntry[]` | Yes | Entries captured from the active page/session. |
| `onClear` | `() => void` | Yes | Called when user clicks clear. |
| `onReload` | `(ignoreCache: boolean) => void` | Yes | Called when user clicks reload. |

---

### HAREntriesViewer

Main dashboard module for multi-panel HAR exploration.

Capabilities:

- Responsive board layout.
- Built-in action stripe for compare mode and header selection.
- Inline filtering integration.
- Auto sync between selected rows and detail panels.
- Optional custom actions area via `additionalActions`.

Props:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `harEntries` | `HAREntry[]` | Yes | Entries displayed in table/detail views. |
| `tableTitle` | `string` | No | Header title for the list panel. |
| `additionalActions` | `ReactNode` | No | Extra controls rendered on the action stripe. |

---

### HARFileUploader

Uploader for a single `.har` file.

Validation behavior:

- Requires exactly one file.
- Accepts `.har` extension only.
- Emits parsed entries and filename on success.

Props:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `onUpload` | `(args: { harEntries: HAREntry[]; harFileName: string }) => void` | Yes | Called after parse success. |
| `onRemove` | `() => void` | Yes | Called when the uploaded file is removed. |

---

### ListHAREntries

Table view for HAR entries.

Highlights:

- Sortable typed columns (status, time, size, timestamps).
- Dynamic request/response header columns discovered from entries.
- Single- or multi-select mode.
- Persisted table preferences through external state.

Props:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `harEntries` | `HAREntry[]` | Yes | Rows to display. |
| `selectedHAREntries` | `HAREntry[]` | Yes | Controlled selected rows. |
| `onSelectionChange` | `(selectedHAREntries: HAREntry[]) => void` | Yes | Selection callback. |
| `enableMultiSelect` | `boolean` | No | Enables multi-selection mode. |

---

### ViewHAREntry

Tabbed detailed inspector for one HAR entry.

Tabs:

- Request headers.
- Request payload.
- Response headers.
- Response payload.
- Raw HAR entry JSON.

Props:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `harEntry` | `HAREntry` | Yes | Entry to inspect. |
| `initialSelectedTabId` | `string` | No | Initial active tab id. |
| `onSelectedTabIdChange` | `(tabId: string) => void` | No | Active tab change callback. |

---

## External State Utilities

Use `createExternalState` to build reusable preference hooks/providers backed by the external store.

```tsx
import { createExternalState } from '@har-analyzer/components';

export const {
  useExternalState: useIsDarkTheme,
  Provider: DarkThemeProvider,
} = createExternalState('my-app.theme.dark', false);
```

### ExternalStore Interface

```ts
interface ExternalStore {
  get: (key: string) => Promise<string | undefined>;
  set: (key: string, value: string) => Promise<void>;
}
```

## HAR Utility Exports

Top-level utility exports include:

- `getHARContentFromFile`
- `getHAREntriesFilteredByContentType`
- `getHAREntriesWithErrorResponse`
- `isErrorResponse`
- `getUniqueHeaderNames`
- `getHAREntryHeadersToValuesMap`
- `getHAREntryAttributesToValuesMap`
- `getHAREntryId`
- `HAR_HEADER_TYPES`
- `DEFAULT_HAR_ENTRY_ATTRIBUTES_TO_VALUE_MAP`
- Types: `HARContent`, `HAREntry`, `ContentTypeGroup`

## Development

```sh
# from repository root
pnpm install

# develop components package
pnpm --filter @har-analyzer/components dev

# validate components package
pnpm --filter @har-analyzer/components validate
```

Useful scripts in this package:

- `pnpm --filter @har-analyzer/components lint`
- `pnpm --filter @har-analyzer/components check-types`
- `pnpm --filter @har-analyzer/components build`

## Contributing

Contributions are welcome. Please open an issue or pull request:

- https://github.com/theallanjoshua/har-analyzer
