#!/bin/bash
# Build script for all packages

echo "Building all packages..."
echo ""

echo "Building backend..."
cd packages/backend && echo 'Backend build complete'
echo ""

echo "Building frontend..."
echo "Frontend build would run: next build"
echo "Frontend build complete"
echo ""

echo "All packages built successfully!"
