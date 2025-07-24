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

## Components

Below are the available components and their usage examples:

### HarAnalyzer

```jsx
import { HarAnalyzer } from '@har-analyzer/components';

function App() {
  return <HarAnalyzer appName="HAR Analyzer" />;
}
```

**Props:**

| Name      | Type            | Required | Description                          |
|-----------|-----------------|----------|--------------------------------------|
| logo      | React.ReactNode | No       | A logo to display in the header.    |
| appName   | string          | Yes      | The name of the application.        |

---

### HAREntriesViewer

```jsx
import { HAREntriesViewer } from '@har-analyzer/components';

function App() {
  return (
    <HAREntriesViewer
      harFileName="example.har"
      harContent={yourHarContent}
      onChange={(selectedEntry) => console.log(selectedEntry)}
    />
  );
}
```

**Props:**

| Name          | Type                          | Required | Description                                      |
|---------------|-------------------------------|----------|--------------------------------------------------|
| harFileName   | string                        | No       | The name of the HAR file being viewed.          |
| harContent    | HarContent                    | No       | The HAR file content object.                    |
| onChange      | (entry: HAREntry) => void     | Yes      | Callback when a HAR entry is selected.          |

---

### HAREntryViewer

```jsx
import { HAREntryViewer } from '@har-analyzer/components';

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
import { HARFileUploader } from '@har-analyzer/components';

function App() {
  return (
    <HARFileUploader
      onChange={(harContent, fileName) => console.log(harContent, fileName)}
    />
  );
}
```

**Props:**

| Name      | Type                                      | Required | Description                                      |
|-----------|-------------------------------------------|----------|--------------------------------------------------|
| onChange  | (harContent: HarContent, fileName?: string) => void | Yes      | Callback when a HAR file is uploaded.           |

---

## Development

- Run `pnpm dev` to start development in watch mode.
- Run `pnpm build` to build the package.

## Contributing

Contributions are welcome! Please open issues or pull requests on [GitHub](https://github.com/theallanjoshua/har-analyzer).

## License

MIT