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

Build the entire application for production:
```bash
npm run build
```

This will:
- Build the Next.js frontend into an optimized production bundle
- Build the backend (currently a no-op, but extensible)
- Prepare all dependencies for production deployment

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

Start the development server (runs both frontend and backend concurrently):
```bash
npm run dev
```

This will:
- Start the Next.js frontend on `http://localhost:3000` with hot reloading
- Start the backend API on `http://localhost:3001`
- Set `NODE_ENV=DEV`

Run a specific package:
```bash
npm run dev:frontend  # Frontend only on port 3000
npm run dev:backend   # Backend only on port 3001
```

### Production

Start the production server (serves both frontend and backend from a single Node.js process):
```bash
npm start
```

This will:
- Serve the built Next.js frontend
- Serve the backend API
- Run on HTTP port 80 (or custom via `HTTP_PORT` env var)
- Run on HTTPS port 443 if SSL certificates are available in `certs/` directory
- Set `NODE_ENV=PROD`

**HTTPS Configuration:**

To enable HTTPS in production, place SSL certificates in a `certs/` directory at the project root:
- `certs/key.pem` - Private key
- `certs/cert.pem` - Certificate

If certificates are not found, only HTTP will be available.

**Environment Variables:**
- `NODE_ENV` - Set to `DEV` or `PROD`
- `HTTP_PORT` - HTTP port (default: 3000 for dev, 80 for prod)
- `HTTPS_PORT` - HTTPS port (default: 443)
- `USE_HTTPS` - Set to `false` to disable HTTPS in production
- `FRONTEND_PORT` - Frontend port in dev mode (default: 3000)
- `BACKEND_PORT` - Backend port in dev mode (default: 3001)

### Continuous integration

Every push runs `.github/workflows/ci.yml`: `npm ci`, `npm test`, then `npm run test:ci`.

`npm run test:ci` holds the checks that are repository-wide rather than any one package's, so
they run once per push instead of on every `npm test`. They are skipped unless `CI` is set —
run them locally with:

```bash
CI=1 npm run test:ci
```

Do that before you consider a change finished. A check that only fires in CI is a check you
find out about after you have pushed.

### Monorepo Structure

This is a npm workspaces monorepo with:
- `packages/frontend` - Next.js application
- `packages/backend` - Node.js API server

The root `package.json` defines workspace scripts that run commands across all packages.
