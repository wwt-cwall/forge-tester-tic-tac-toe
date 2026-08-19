<!-- Changed by Forge v0.1.0 -->
# Playwright End-to-End Testing

This document describes the Playwright end-to-end testing setup for the Tic-Tac-Toe application.

## Overview

The E2E tests use [Playwright](https://playwright.dev/) to test the complete user journey through the application. Tests are configured to record videos of all test runs, providing visual verification of the application behavior.

## Test Coverage

### Happy Path Test (`e2e/happy-path.spec.ts`)

The main test suite covers three key scenarios:

#### 1. Complete User Journey
Tests the full flow from landing to welcome screen:
- User navigates to the application
- Display name prompt modal appears automatically
- User enters a valid display name ("TestPlayer")
- Modal closes and welcome screen appears
- User's name is displayed in the welcome message
- Main application content is visible
- User can click "Change Name" to update their display name
- New name ("NewPlayer") is displayed after update

#### 2. Input Validation
Tests all validation rules for the display name:
- **Empty input**: Shows error "Please enter a display name"
- **Too short** (1 character): Shows error "Display name must be at least 2 characters"
- **Too long** (>20 characters): Shows error "Display name must be 20 characters or less"
- **Valid input**: Accepts names between 2-20 characters and closes modal

#### 3. Session Persistence
Tests that the display name persists:
- Display name is saved in sessionStorage
- Opening a new tab in the same session remembers the name
- Modal does not reappear when name is already set

## Configuration

### Playwright Config (`playwright.config.ts`)

Key configuration settings:

```typescript
{
  testDir: './e2e',
  baseURL: 'http://localhost:3000',
  video: 'on',                    // Record video for all tests
  screenshot: 'only-on-failure',  // Screenshot on test failure
  trace: 'on-first-retry',        // Trace for debugging retries
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    timeout: 120000,
  }
}
```

## Running Tests

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```

### Run Tests

#### Recommended: Managed Server
The easiest way to run tests (automatically starts/stops server):

```bash
npm run test:e2e
```

This uses `scripts/run-e2e.js` which:
1. Starts the development server
2. Waits for it to be ready
3. Runs the Playwright tests
4. Stops the server when done

#### Alternative: Manual Server
If you prefer to manage the server yourself:

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. In another terminal, run tests:
   ```bash
   PLAYWRIGHT_SKIP_SERVER=1 npm run test:e2e:direct
   ```

#### Other Test Commands

- **UI Mode** (interactive test runner):
  ```bash
  npm run test:e2e:ui
  ```

- **Headed Mode** (see the browser):
  ```bash
  npm run test:e2e:headed
  ```

- **View HTML Report**:
  ```bash
  npm run test:e2e:report
  ```

## Video Output

### Location
Videos are saved in the `test-results/` directory after each test run.

### Structure
```
test-results/
├── happy-path-complete-user-journey-chromium/
│   └── video.webm
├── happy-path-input-validation-chromium/
│   └── video.webm
└── happy-path-session-persistence-chromium/
    └── video.webm
```

### Viewing Videos
Videos are in WebM format and can be viewed in:
- Modern web browsers (Chrome, Firefox, Edge)
- VLC Media Player
- Any video player that supports WebM

### Video Content
Each video shows:
- The browser window during the test
- All user interactions (clicks, typing)
- Page transitions and modal appearances
- Visual confirmation of test assertions

## Continuous Integration

### GitHub Actions
Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Manual workflow dispatch

See `.github/workflows/playwright.yml` for the CI configuration.

### CI Artifacts
After each CI run, the following artifacts are uploaded:
- **playwright-report**: HTML test report
- **playwright-videos**: Video recordings of all tests

Artifacts are retained for 30 days and can be downloaded from the GitHub Actions run page.

## Test Structure

### Test Organization
Tests use Playwright's `test.describe` and `test.step` for clear organization:

```typescript
test.describe('Tic-Tac-Toe Happy Path', () => {
  test('should complete the full user journey', async ({ page }) => {
    await test.step('Navigate to home page', async () => {
      // Test code
    });
    
    await test.step('Display name prompt should be visible', async () => {
      // Test code
    });
    
    // More steps...
  });
});
```

### Assertions
Tests use Playwright's built-in assertions:
- `expect(page).toHaveTitle()` - Check page title
- `expect(element).toBeVisible()` - Check element visibility
- `expect(element).toHaveValue()` - Check input values
- `expect(element).not.toBeVisible()` - Check element is hidden

### Selectors
Tests use semantic selectors for reliability:
- `page.getByRole('heading', { name: /Welcome/i })` - By ARIA role
- `page.getByLabel(/Display Name/i)` - By label text
- `page.getByText(/Welcome,/i)` - By text content

## Troubleshooting

### Memory Issues
If tests fail with "Killed" or exit code 137:
- Close other applications to free memory
- Use manual server mode
- Run tests one at a time: `npx playwright test happy-path.spec.ts -g "complete user journey"`

### Server Timeout
If server doesn't start within 120 seconds:
- Check if port 3000 is already in use
- Verify dependencies are installed
- Check server logs for errors

### Browser Installation
If browsers fail to install:
```bash
# Try without system dependencies
npx playwright install chromium --no-deps

# Or install specific version
npx playwright install chromium@1.40.0
```

### Test Failures
1. Check the HTML report: `npm run test:e2e:report`
2. View the video recording in `test-results/`
3. Check screenshots in `test-results/` (if test failed)
4. Review trace files (if test was retried)

## Adding New Tests

### Example Test
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await test.step('Step description', async () => {
      await page.goto('/');
      await expect(page.getByRole('heading')).toBeVisible();
    });
  });
});
```

### Best Practices
1. Use semantic selectors (role, label, text)
2. Organize tests with `test.describe` and `test.step`
3. Add descriptive test names
4. Use `await` for all async operations
5. Assert expected behavior explicitly
6. Keep tests independent (no shared state)

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright Test Assertions](https://playwright.dev/docs/test-assertions)
