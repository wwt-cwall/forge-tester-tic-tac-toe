# AGENTS.md

Guidance for coding agents working in `forge-tester-tic-tac-toe`. This is a starting point —
edit it to fit the project.

## Overview

A simple web based tic tac toe game to play with friends.

## Project layout

- `docs/` — project documentation; start at `docs/index.md`.
- `docs/specs/` — a spec per larger concept.
- `docs/specs/features/` — a spec per feature.

## Conventions

### Installation

```bash
npm install
```

### Building

Build all packages:
```bash
npm run build
```

Build a specific package:
```bash
npm run build --workspace=packages/frontend
npm run build --workspace=packages/backend
```

### Testing

Run all tests:
```bash
npm run test
```

Run tests for a specific package:
```bash
npm run test --workspace=packages/frontend
npm run test --workspace=packages/backend
```

### Development

Run all packages in dev mode:
```bash
npm run dev
```

Run a specific package:
```bash
npm run dev:frontend
npm run dev:backend
```

### Monorepo Structure

This is a npm workspaces monorepo with:
- `packages/frontend` - Next.js application
- `packages/backend` - Node.js API server

The root `package.json` defines workspace scripts that run commands across all packages.
