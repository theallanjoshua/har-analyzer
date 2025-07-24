# HAR Analyzer Monorepo

HAR Analyzer is a modern, interactive web application for analyzing [HTTP Archive (HAR)](https://w3c.github.io/web-performance/specs/HAR/Overview.html) files. It allows you to inspect network requests, view request/response headers, payloads, and visualize content with syntax highlighting.

Try it out [here](https://theallanjoshua.github.io/har-analyzer/)

---

## Features

- Upload and view `.har` files
- Filter and search network entries
- Inspect request and response headers
- View request payloads and response bodies with syntax highlighting
- Supports JSON, XML, HTML, CSS, JavaScript, and image content types
- Responsive UI with split panel for detailed entry inspection
- User preferences for theme and content width
- Built with React, Vite, and Cloudscape Design System
- Modular component library for reuse in other projects

---

## Monorepo Structure

```
.
├── biome.json
├── package.json                # Root config and scripts
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.base.json
└── packages/
    ├── components/             # Reusable React component library
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── vite.config.ts
    │   └── lib/
    │       ├── index.ts
    │       ├── components/
    │       │   ├── har-analyzer/
    │       │   ├── har-entries-viewer/
    │       │   ├── har-entry-viewer/
    │       │   ├── har-file-uploader/
    │       │   └── shared/
    │       ├── hooks/
    │       └── utils/
    └── website/                # Main web application
        ├── index.html
        ├── index.scss
        ├── index.tsx
        ├── package.json
        ├── tsconfig.json
        └── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or use npm/yarn)

### Installation

```sh
pnpm install
```

---

## Development

### Run the Website App

```sh
pnpm dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build All Packages

```sh
pnpm build
```

### Build Only the Component Library

```sh
pnpm --filter @har-analyzer/components build
```

### Build Only the Website

```sh
pnpm --filter @har-analyzer/website build
```

---

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting:

```sh
pnpm biome check
pnpm biome format
```

---

## Usage

1. Upload a `.har` file using the file uploader.
2. Browse and filter network requests in the main table.
3. Click on a row to inspect details in the split panel.

---

## Technologies

- React
- Vite
- Cloudscape Design System
- Biome (linting/formatting)
- TypeScript
- pnpm (monorepo management)

---

## License