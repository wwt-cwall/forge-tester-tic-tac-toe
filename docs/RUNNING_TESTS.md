<!-- Changed by Forge v0.1.0 -->
# Running Playwright Tests - Quick Start

This guide will help you run the Playwright end-to-end tests and view the video output.

## Prerequisites

Before running the tests, ensure you have:

1. **Node.js** installed (v18 or higher)
2. **Dependencies** installed
3. **Playwright browsers** installed

## Installation Steps

### 1. Install Project Dependencies

```bash
# From the project root
npm install
```

This installs all necessary packages including `@playwright/test`.

### 2. Install Playwright Browsers

```bash
# Install Chromium browser for Playwright
npx playwright install chromium
```

If you encounter issues, try:

```bash
# Install without system dependencies
npx playwright install chromium --no-deps
```

## Running the Tests

### Method 1: Automatic (Recommended)

The easiest way to run tests - automatically starts and stops the server:

```bash
npm run test:e2e
```

**What happens:**
1. Development server starts on port 3000
2. Script waits for server to be ready
3. Playwright tests execute
4. Videos are recorded
5. Server stops automatically
6. Results are displayed

**Expected output:**
```
🚀 Starting Playwright E2E Test Runner

📦 Starting development server...
⏳ Waiting for server to be ready...
✅ Server is ready!

🎭 Running Playwright tests...

Running 3 tests using 1 worker

  ✓  happy-path.spec.ts:15:3 › should complete the full user journey (15s)
  ✓  happy-path.spec.ts:72:3 › should validate display name input (8s)
  ✓  happy-path.spec.ts:108:3 › should persist display name in session (6s)

  3 passed (29s)

✅ All tests passed!

📹 Video recordings are available in: test-results/
```

### Method 2: Manual Server

If you prefer to control the server yourself:

**Terminal 1 - Start the server:**
```bash
npm run dev
```

Wait for the message:
```
✓ Ready in 610ms
- Local:         http://localhost:3000
```

**Terminal 2 - Run the tests:**
```bash
PLAYWRIGHT_SKIP_SERVER=1 npm run test:e2e:direct
```

### Method 3: Interactive UI Mode

Run tests in interactive mode with a visual interface:

```bash
npm run test:e2e:ui
```

This opens a browser-based UI where you can:
- Select which tests to run
- Watch tests execute in real-time
- Debug test failures
- View test code side-by-side

### Method 4: Headed Mode

Run tests with a visible browser window:

```bash
npm run test:e2e:headed
```

This is useful for:
- Debugging test behavior
- Seeing exactly what the test does
- Understanding test failures

## Viewing the Video Output

### Option 1: File System

After running tests, videos are saved in `test-results/`:

```bash
# List all video files
ls -R test-results/

# Example output:
# test-results/happy-path-tic-tac-toe-happy-path-should-complete-the-full-user-journey-chromium:
# video.webm

# test-results/happy-path-tic-tac-toe-happy-path-should-validate-display-name-input-chromium:
# video.webm

# test-results/happy-path-tic-tac-toe-happy-path-should-persist-display-name-in-session-chromium:
# video.webm
```

**Open a video:**

On macOS:
```bash
open test-results/*/video.webm
```

On Linux:
```bash
xdg-open test-results/*/video.webm
```

On Windows:
```bash
start test-results\*\video.webm
```

Or drag and drop the `.webm` file into your browser.

### Option 2: HTML Report

View videos in an interactive HTML report:

```bash
npm run test:e2e:report
```

This opens a browser with:
- Test results summary
- Individual test details
- Embedded video player
- Screenshots (if any failures)
- Test traces (if available)

**Features:**
- Click on any test to see details
- Play videos inline
- Filter by pass/fail status
- Search for specific tests

### Option 3: Playwright Trace Viewer

If a test was retried (failed then passed), you can view the trace:

```bash
npx playwright show-trace test-results/*/trace.zip
```

This shows:
- Timeline of all actions
- Network requests
- Console logs
- Screenshots at each step
- DOM snapshots

## Video Details

### Video Specifications

- **Format**: WebM (VP8 codec)
- **Resolution**: 1280x720 (default viewport)
- **Frame Rate**: ~25 fps
- **Duration**: Matches test duration
- **Size**: ~100-200 KB per second of video

### What's Captured

Each video shows:
- ✅ Browser window with the application
- ✅ Mouse cursor movements
- ✅ Click animations
- ✅ Text being typed character by character
- ✅ Page transitions and animations
- ✅ Modal open/close animations
- ✅ Error messages appearing
- ✅ All visual changes

### Video Files

**Test 1: Complete User Journey**
- **File**: `test-results/happy-path-...-should-complete-the-full-user-journey-chromium/video.webm`
- **Duration**: ~15 seconds
- **Shows**: Full flow from modal to welcome screen to name change

**Test 2: Input Validation**
- **File**: `test-results/happy-path-...-should-validate-display-name-input-chromium/video.webm`
- **Duration**: ~8 seconds
- **Shows**: All validation error messages

**Test 3: Session Persistence**
- **File**: `test-results/happy-path-...-should-persist-display-name-in-session-chromium/video.webm`
- **Duration**: ~6 seconds
- **Shows**: Name persisting across tabs

## Troubleshooting

### Issue: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Find and kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Issue: Browser Not Installed

**Error:**
```
browserType.launch: Executable doesn't exist
```

**Solution:**
```bash
npx playwright install chromium
```

### Issue: Tests Timeout

**Error:**
```
Test timeout of 30000ms exceeded
```

**Solution:**
1. Ensure server is running
2. Check server logs for errors
3. Increase timeout in test:
   ```typescript
   test.setTimeout(60000); // 60 seconds
   ```

### Issue: Out of Memory

**Error:**
```
Killed (exit code 137)
```

**Solution:**
1. Close other applications
2. Use manual server mode (Method 2)
3. Run tests one at a time:
   ```bash
   npx playwright test happy-path.spec.ts -g "complete user journey"
   ```

### Issue: Video Won't Play

**Problem:** Video file won't open

**Solution:**
1. Check file size: `ls -lh test-results/*/video.webm`
2. Try different player (VLC, Chrome, Firefox)
3. Ensure test completed successfully
4. Check Playwright version: `npx playwright --version`

## Advanced Usage

### Run Specific Test

```bash
# Run only one test
npx playwright test happy-path.spec.ts -g "complete user journey"

# Run only validation tests
npx playwright test happy-path.spec.ts -g "validate"
```

### Debug Mode

```bash
# Run in debug mode with Playwright Inspector
PWDEBUG=1 npm run test:e2e:direct
```

### Slow Motion

```bash
# Run tests in slow motion (500ms delay between actions)
npx playwright test --slow-mo=500
```

### Update Snapshots

```bash
# Update visual snapshots (if using screenshot comparison)
npx playwright test --update-snapshots
```

## CI/CD Integration

Tests automatically run in GitHub Actions on:
- Push to `main` or `develop`
- Pull requests
- Manual workflow dispatch

**View CI videos:**
1. Go to GitHub Actions tab
2. Click on workflow run
3. Download `playwright-videos` artifact
4. Extract and view videos

## Next Steps

After running tests successfully:

1. ✅ Review the video recordings
2. ✅ Check the HTML report
3. ✅ Verify all tests passed
4. ✅ Share videos with team if needed
5. ✅ Add more tests as features are developed

## Getting Help

If you encounter issues:

1. Check the [Playwright documentation](https://playwright.dev/)
2. Review `docs/playwright-testing.md` for detailed information
3. Check `e2e/README.md` for quick reference
4. Review test code in `e2e/happy-path.spec.ts`

## Summary

**Quick command to run everything:**
```bash
npm run test:e2e
```

**Quick command to view results:**
```bash
npm run test:e2e:report
```

That's it! You now have video recordings of your end-to-end tests. 🎉
