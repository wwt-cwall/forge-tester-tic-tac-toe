<!-- Changed by Forge v0.1.0 -->
# forge-tester-tic-tac-toe

A simple web based tic tac toe game to play with friends.

## Monorepo Structure

This project is organized as a monorepo with the following structure:

```
forge-tester-tic-tac-toe/
├── package.json (root workspace configuration)
├── packages/
│   ├── frontend/ (Next.js application)
│   └── backend/ (Node.js API server)
```

## Getting Started

### Installation

Install dependencies for all packages:

```bash
npm install
```

### Development

Run both frontend and backend in development mode:

```bash
npm run dev
```

Or run them individually:

```bash
npm run dev:frontend  # Starts Next.js dev server on port 3000
npm run dev:backend   # Starts Node.js API server on port 3001
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

#### Unit Tests

Run unit tests for all packages:

```bash
npm run test
```

Run tests for a specific package:

```bash
npm run test --workspace=packages/frontend
npm run test --workspace=packages/backend
```

#### End-to-End Tests

Run Playwright E2E tests with video recording:

```bash
npm run test:e2e
```

View the test report:

```bash
npm run test:e2e:report
```

For detailed instructions, see [docs/RUNNING_TESTS.md](docs/RUNNING_TESTS.md).

**Video Output**: All E2E tests are recorded and saved in `test-results/` directory.

### Linting

Run linters for all packages:

```bash
npm run lint
```

## Packages

### Frontend (`packages/frontend`)

A Next.js application with TypeScript and Tailwind CSS.

- **Dev**: `npm run dev:frontend`
- **Build**: `npm run build --workspace=packages/frontend`
- **Test**: `npm run test --workspace=packages/frontend`

### Backend (`packages/backend`)

A Node.js API server for the tic-tac-toe game.

- **Dev**: `npm run dev:backend`
- **Build**: `npm run build --workspace=packages/backend`
- **Test**: `npm run test --workspace=packages/backend`
