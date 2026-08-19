<!-- Changed by Forge v0.1.0 -->
# End-to-End Tests

This directory contains Playwright end-to-end tests for the Tic-Tac-Toe application.

## Prerequisites

- Node.js installed
- Dependencies installed (`npm install`)
- Playwright browsers installed (`npx playwright install chromium`)

## Running the Tests

### Option 1: Automatic Server Start (Recommended)

The tests will automatically start the development server:

```bash
npm run test:e2e
```

### Option 2: Manual Server Start

If you prefer to start the server manually or are experiencing memory issues:

1. Start the development server in one terminal:
   ```bash
   npm run dev
   ```

2. In another terminal, run the tests with the server skip flag:
   ```bash
   PLAYWRIGHT_SKIP_SERVER=1 npm run test:e2e
   ```

### Other Test Commands

- **Run tests in UI mode** (interactive):
  ```bash
  npm run test:e2e:ui
  ```

- **Run tests in headed mode** (see the browser):
  ```bash
  npm run test:e2e:headed
  ```

- **View the test report**:
  ```bash
  npm run test:e2e:report
  ```

## Test Structure

### `happy-path.spec.ts`

The main happy path test covers:

1. **Complete User Journey**: 
   - User visits the application
   - Display name prompt appears
   - User enters a valid display name
   - Welcome screen displays with user's name
   - User can change their display name

2. **Input Validation**:
   - Empty input validation
   - Minimum length validation (2 characters)
   - Maximum length validation (20 characters)
   - Valid input acceptance after errors

3. **Session Persistence**:
   - Display name persists across page reloads
   - Display name is shared across tabs in the same session

## Video Output

Playwright is configured to record videos for all test runs. Videos are saved in the `test-results/` directory after each test execution.

To view videos:
1. Run the tests: `npm run test:e2e`
2. Check the `test-results/` directory for video files
3. Videos are organized by test name and attempt

## Configuration

The Playwright configuration is in `playwright.config.ts` at the root of the project. Key settings:

- **Base URL**: `http://localhost:3000`
- **Video Recording**: Enabled for all tests
- **Screenshots**: Captured on failure
- **Trace**: Captured on first retry
- **Browser**: Chromium (Desktop Chrome)

## Troubleshooting

### Memory Issues

If you encounter memory issues (process killed), try:

1. Close other applications to free up memory
2. Use the manual server start option (Option 2 above)
3. Run tests one at a time: `npx playwright test happy-path.spec.ts`

### Server Not Starting

If the server fails to start automatically:

1. Check if port 3000 is already in use
2. Try starting the server manually (Option 2 above)
3. Check the console output for error messages

### Browser Installation Issues

If Playwright browsers are not installed:

```bash
npx playwright install chromium
```

If you encounter permission issues, try:

```bash
npx playwright install chromium --no-deps
```
