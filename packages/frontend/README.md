# Frontend

Next.js application for the tic-tac-toe game.

## Tech Stack

- **Next.js 16.3.0** - React framework with App Router
- **React 19.2.8** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building

Build the production application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Testing

Run the test suite:

```bash
npm run test
```

## Linting

Run ESLint:

```bash
npm run lint
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── postcss.config.mjs    # PostCSS configuration
└── package.json
```

## Features

- Server-side rendering with Next.js App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Optimized for production builds
