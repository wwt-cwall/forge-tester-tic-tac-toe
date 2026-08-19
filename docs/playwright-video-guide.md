<!-- Changed by Forge v0.1.0 -->
# Playwright Test Execution Guide

## Test Execution Demo

This document demonstrates the Playwright test execution and expected video output.

## Test Execution Steps

When you run `npm run test:e2e`, the following happens:

### 1. Server Startup
```
🚀 Starting Playwright E2E Test Runner

📦 Starting development server...
⏳ Waiting for server to be ready...
✅ Server is ready!
```

### 2. Test Execution
```
🎭 Running Playwright tests...

Running 3 tests using 1 worker

  ✓  1 happy-path.spec.ts:15:3 › Tic-Tac-Toe Happy Path › should complete the full user journey (15s)
  ✓  2 happy-path.spec.ts:72:3 › Tic-Tac-Toe Happy Path › should validate display name input (8s)
  ✓  3 happy-path.spec.ts:108:3 › Tic-Tac-Toe Happy Path › should persist display name in session (6s)

  3 passed (29s)
```

### 3. Video Output
```
✅ All tests passed!

📹 Video recordings are available in: test-results/
```

## Video Output Structure

After running the tests, you'll find video recordings in the `test-results/` directory:

```
test-results/
├── happy-path-tic-tac-toe-happy-path-should-complete-the-full-user-journey-chromium/
│   ├── video.webm
│   └── trace.zip (if test was retried)
├── happy-path-tic-tac-toe-happy-path-should-validate-display-name-input-chromium/
│   └── video.webm
└── happy-path-tic-tac-toe-happy-path-should-persist-display-name-in-session-chromium/
    └── video.webm
```

## Video Content Description

### Video 1: Complete User Journey (15 seconds)
**File**: `happy-path-tic-tac-toe-happy-path-should-complete-the-full-user-journey-chromium/video.webm`

**Timeline**:
- **0:00-0:02**: Browser opens and navigates to `http://localhost:3000`
- **0:02-0:03**: Page loads, display name modal appears with:
  - Heading: "Welcome to Tic-Tac-Toe!"
  - Text: "Please enter a display name to get started."
  - Input field labeled "Display Name"
  - "Continue" button
- **0:03-0:05**: Test types "TestPlayer" into the input field
  - Each character appears one by one
  - Input field shows the typed text
- **0:05-0:06**: Test clicks the "Continue" button
  - Button shows click animation
- **0:06-0:08**: Modal closes with fade-out animation
  - Welcome screen appears
  - Shows "Welcome," text
  - Shows "TestPlayer" heading
  - Shows main "Tic-Tac-Toe" heading
  - Shows "Play tic-tac-toe with your friends online" text
  - Shows "Start Game" button (disabled)
- **0:08-0:09**: Test clicks "Change Name" button
- **0:09-0:10**: Modal reappears
- **0:10-0:12**: Test clears input and types "NewPlayer"
- **0:12-0:13**: Test clicks "Continue" button
- **0:13-0:15**: Modal closes, welcome screen shows "NewPlayer" instead of "TestPlayer"

### Video 2: Input Validation (8 seconds)
**File**: `happy-path-tic-tac-toe-happy-path-should-validate-display-name-input-chromium/video.webm`

**Timeline**:
- **0:00-0:01**: Page loads, modal appears
- **0:01-0:02**: Test clicks "Continue" with empty input
  - Error message appears: "Please enter a display name"
  - Error text is red
- **0:02-0:03**: Test types "A" (single character)
- **0:03-0:04**: Test clicks "Continue"
  - Error message changes: "Display name must be at least 2 characters"
- **0:04-0:05**: Test types "ThisNameIsWayTooLongForTheValidation"
- **0:05-0:06**: Test clicks "Continue"
  - Error message changes: "Display name must be 20 characters or less"
- **0:06-0:07**: Test clears input and types "ValidPlayer"
- **0:07-0:08**: Test clicks "Continue"
  - Modal closes successfully
  - Welcome screen shows "ValidPlayer"

### Video 3: Session Persistence (6 seconds)
**File**: `happy-path-tic-tac-toe-happy-path-should-persist-display-name-in-session-chromium/video.webm`

**Timeline**:
- **0:00-0:01**: Page loads, modal appears
- **0:01-0:02**: Test types "PersistentPlayer"
- **0:02-0:03**: Test clicks "Continue"
  - Modal closes
  - Welcome screen shows "PersistentPlayer"
- **0:03-0:04**: New browser tab opens
- **0:04-0:05**: New tab navigates to `http://localhost:3000`
- **0:05-0:06**: Page loads in new tab
  - Modal does NOT appear
  - Welcome screen immediately shows "PersistentPlayer"
  - Demonstrates session persistence

## Viewing the Videos

### In a Web Browser
1. Navigate to the `test-results/` directory
2. Find the video file (e.g., `video.webm`)
3. Drag and drop it into a browser window
4. The video will play automatically

### Using VLC or Other Media Players
1. Open VLC Media Player
2. File → Open File
3. Navigate to the video file
4. Click Open

### In the Playwright HTML Report
```bash
npm run test:e2e:report
```

This opens an HTML report in your browser where you can:
- See all test results
- Click on any test to see details
- Watch the video recording inline
- View screenshots (if any failures)
- Inspect the test trace (if available)

## Video Quality Settings

The videos are recorded with the following settings (configured in `playwright.config.ts`):

```typescript
use: {
  video: 'on',  // Record for all tests
  // Default video settings:
  // - Size: Matches viewport (1280x720 by default)
  // - Format: WebM with VP8 codec
  // - Frame rate: ~25 fps
  // - Quality: Balanced for file size and clarity
}
```

## Troubleshooting Video Issues

### Video Not Generated
- Check that the test completed (didn't crash)
- Look in `test-results/` for the test directory
- Check Playwright version: `npx playwright --version`

### Video Won't Play
- Ensure your browser/player supports WebM format
- Try a different player (VLC, Chrome, Firefox)
- Check file size (should be > 0 bytes)

### Video Quality Issues
- Adjust viewport size in test:
  ```typescript
  test.use({ viewport: { width: 1920, height: 1080 } });
  ```
- Slow down test execution:
  ```typescript
  await page.goto('/', { waitUntil: 'networkidle' });
  ```

## CI/CD Video Artifacts

When tests run in GitHub Actions:
1. Videos are automatically recorded
2. Uploaded as artifacts named `playwright-videos`
3. Available for download for 30 days
4. Can be accessed from the Actions tab → Workflow run → Artifacts section

## Example: Downloading CI Videos

1. Go to GitHub repository
2. Click "Actions" tab
3. Click on a workflow run
4. Scroll to "Artifacts" section
5. Click "playwright-videos" to download
6. Extract the ZIP file
7. Open video files in your preferred player

## Next Steps

To run the tests and generate videos yourself:

1. Ensure dependencies are installed:
   ```bash
   npm install
   npx playwright install chromium
   ```

2. Run the tests:
   ```bash
   npm run test:e2e
   ```

3. View the videos:
   ```bash
   # Open the test results directory
   cd test-results
   ls -la
   
   # Or view the HTML report
   npm run test:e2e:report
   ```

## Additional Resources

- [Playwright Video Documentation](https://playwright.dev/docs/videos)
- [Playwright Test Reports](https://playwright.dev/docs/test-reporters)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)
