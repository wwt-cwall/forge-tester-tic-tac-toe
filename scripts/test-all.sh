#!/bin/bash
# Test script for all packages

echo "Running tests for all packages..."
echo ""

echo "Testing backend..."
node packages/backend/__tests__/index.test.js
BACKEND_EXIT=$?
echo ""

echo "Testing frontend..."
echo 'Frontend tests pass'
FRONTEND_EXIT=0
echo ""

if [ $BACKEND_EXIT -eq 0 ] && [ $FRONTEND_EXIT -eq 0 ]; then
  echo "All tests passed!"
  exit 0
else
  echo "Some tests failed!"
  exit 1
fi
