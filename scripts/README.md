# Scripts

This directory contains utility scripts for the monorepo.

## Available Scripts

### build.js

Builds both the Next.js frontend and backend for production deployment.

```bash
node scripts/build.js
# or
npm run build
```

### dev-server.js

Starts both frontend and backend in development mode with hot reloading.

```bash
node scripts/dev-server.js
# or
npm run dev
```

**Configuration:**
- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:3001`
- Environment: `NODE_ENV=DEV`

### server.js

Production server that serves both Next.js frontend and backend API from a single Node.js application.

```bash
node scripts/server.js
# or
npm start
```

**Configuration:**
- HTTP Port: 80 (production) or 3000 (development)
- HTTPS Port: 443 (production, if certificates are available)
- Environment: `NODE_ENV=PROD`

**HTTPS Setup (Production):**

To enable HTTPS in production, place SSL certificates in a `certs/` directory at the project root:
- `certs/key.pem` - Private key
- `certs/cert.pem` - Certificate

If certificates are not found, only HTTP will be available.

### build-all.sh

Legacy build script for all packages in the monorepo.

```bash
sh scripts/build-all.sh
```

### test-all.sh

Runs tests for all packages in the monorepo.

```bash
sh scripts/test-all.sh
```

## Usage

### Development

Start the development servers:

```bash
npm run dev
```

This will start:
- Next.js frontend on port 3000 with hot reloading
- Backend API on port 3001

### Production Build

Build the application for production:

```bash
npm run build
```

### Production Server

Start the production server:

```bash
npm start
```

This serves both frontend and backend from a single Node.js process on:
- HTTP: port 80 (or custom via `HTTP_PORT` env var)
- HTTPS: port 443 (if certificates are available)

### Environment Variables

- `NODE_ENV` - Set to `DEV` or `PROD`
- `HTTP_PORT` - HTTP port (default: 3000 for dev, 80 for prod)
- `HTTPS_PORT` - HTTPS port (default: 443)
- `USE_HTTPS` - Set to `false` to disable HTTPS in production
- `FRONTEND_PORT` - Frontend port in dev mode (default: 3000)
- `BACKEND_PORT` - Backend port in dev mode (default: 3001)
