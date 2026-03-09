# HAR Analyzer

A modern, interactive web application for inspecting and analyzing HTTP Archive (.har) files. Built with React and the Cloudscape Design System, this monorepo provides both a standalone reusable component library and a fully-featured client-side web application.

Try it out [here](https://theallanjoshua.github.io/har-analyzer/)

---

## 🚀 Features

- **Local Processing:** Upload and view `.har` files entirely in the browser (no data is sent to a server).
- **Entry Comparison:** Compare multiple HAR entries side-by-side to easily spot differences in headers, payloads, and responses by simply selecting multiple rows in the network table.
- **Advanced Filtering:** Filter and search network entries by content type, errors, and text.
- **Deep Inspection:** Inspect request/response headers, cookies, and timings.
- **Syntax Highlighting:** View request payloads and response bodies with formatting for JSON, XML, HTML, CSS, and JavaScript.
- **Customizable UI:** Responsive split-panel layout with user preferences for dark/light themes and content width.
- **Browser Extension:** Inspect HTTP traffic directly within Chromium-based browsers using the dedicated developer tools extension.
- **Modular:** Core functionality is packaged as a reusable React component library.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **UI Components:** [Cloudscape Design System](https://cloudscape.design/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Monorepo Management:** [Turborepo](https://turbo.build/) & [pnpm workspaces](https://pnpm.io/)
- **Linting:** [ESLint](https://eslint.org/) (via [@antfu/eslint-config](https://github.com/antfu/eslint-config))

---

## 📦 Monorepo Structure

This project is a monorepo managed with [pnpm](https://pnpm.io/) workspaces and [Turborepo](https://turbo.build/).

```text
.
├── packages/
│   ├── chromium-extension/ # Developer tools browser extension for Chromium (@har-analyzer/chromium-extension)
│   ├── components/         # Reusable UI component library (@har-analyzer/components) - See [README](./packages/components/README.md)
│   └── website/            # Main web application using the components (@har-analyzer/website)
├── tsconfigs/              # Shared TypeScript base configurations
├── eslint.config.ts        # Shared ESLint Flat Config
└── turbo.json              # Turborepo pipeline configuration
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/theallanjoshua/har-analyzer.git
   cd har-analyzer
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

### Development

Start the development servers for the packages in parallel:

```sh
pnpm run dev
```

The web application will be available at `http://localhost:3000`

#### Testing GitHub Actions Locally

You can test the GitHub Actions workflows locally using [act](https://github.com/nektos/act).

1. Install a Docker runtime like [OrbStack](https://orbstack.dev/) (recommended for macOS) or Docker Desktop. Wait for it to be fully running.
   ```sh
   brew install --cask orbstack
   ```
2. Install `act`:
   ```sh
   brew install act
   ```
3. Run a workflow locally (e.g., using dry-run `-n` to prevent actual git pushes and npm publishes):
   ```sh
   act workflow_dispatch -W .github/workflows/publish-har-analyzer-components.yml -n
   ```

## 📜 Available Scripts

From the root directory, you can run the following commands:

- `pnpm run dev`: Starts development mode for all packages.
- `pnpm run build`: Builds all packages (components, extension, and website).
- `pnpm run lint`: Runs ESLint check across the codebase.
- `pnpm run lint:fix`: Automatically fixes ESLint errors.
- `pnpm run check-types`: Runs TypeScript type checking.
- `pnpm run clean`: Removes all build artifacts (`dist` folders).
- `pnpm run validate`: Runs linting, type-checking, and other validation pipelines through Turbo.