#!/bin/bash
# Changed by Forge v0.1.0
# Script to run Playwright tests with manual server management

set -e

echo "Building the application..."
npm run build

echo "Starting the production server in the background..."
npm start &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to be ready..."
sleep 5

# Check if server is running
if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo "Server failed to start"
    exit 1
fi

echo "Running Playwright tests..."
PLAYWRIGHT_SKIP_SERVER=1 npx playwright test "$@"
TEST_EXIT_CODE=$?

echo "Stopping the server..."
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true

exit $TEST_EXIT_CODE
