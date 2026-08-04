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
npm run dev:frontend
npm run dev:backend
```

### Building

Build both projects:

```bash
npm run build
```

### Testing

Run tests for all packages:

```bash
npm run test
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
