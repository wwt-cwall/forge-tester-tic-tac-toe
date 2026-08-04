# Scripts

This directory contains utility scripts for the monorepo.

## Available Scripts

### build-all.sh

Builds all packages in the monorepo.

```bash
sh scripts/build-all.sh
```

### test-all.sh

Runs tests for all packages in the monorepo.

```bash
sh scripts/test-all.sh
```

## Usage

These scripts can be run directly or through npm:

```bash
# Using npm (preferred)
npm run build
npm run test

# Using scripts directly (fallback)
sh scripts/build-all.sh
sh scripts/test-all.sh
```
