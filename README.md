# HAR Viewer

HAR Viewer is a modern, interactive web application for analyzing [HTTP Archive (HAR)](https://w3c.github.io/web-performance/specs/HAR/Overview.html) files. It allows you to inspect network requests, view request/response headers, payloads, and visualize content with syntax highlighting.

Try it out [here](https://theallanjoshua.github.io/har-file-viewer/)

## Features

- Upload and view `.har` files
- Filter and search network entries
- Inspect request and response headers
- View request payloads and response bodies with syntax highlighting
- Supports JSON, XML, HTML, CSS, JavaScript, and image content types
- Responsive UI with split panel for detailed entry inspection
- User preferences for theme and content width
- Built with React, Vite, and Cloudscape Design System

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or use npm/yarn)

### Installation

```sh
pnpm install
```

### Running the Development Server

```sh
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
pnpm build
```

### Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting:

```sh
pnpm biome check
pnpm biome format
```

## Project Structure

```
src/
  app.tsx                # Main app component
  index.tsx              # Entry point
  index.scss             # Global styles
  components/
    har-file-uploader/   # HAR file upload UI
    har-entries-viewer/  # Table and filters for HAR entries
    har-entry-viewer/    # Split panel for entry details
    enhanced-table.tsx   # Table abstraction
    top-navigation/      # App navigation bar
    ...
  constants/
    har.ts               # HAR constants
  hooks/                 # Custom React hooks
  utils/                 # Utility functions
index.html               # HTML template
biome.json               # Linter/formatter config
vite.config.ts           # Vite config
tsconfig.json            # TypeScript config
```

## Usage

1. Upload a `.har` file using the file uploader.
2. Browse and filter network requests in the main table.
3. Click on a row to inspect details in the split panel.

## Technologies

- React
- Vite
- Cloudscape Design System
- Biome (linting/formatting)
- TypeScript

## License

MIT
