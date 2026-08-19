<!-- Changed by Forge v0.1.0 -->
# Playwright Test Visual Flow

This document provides a visual representation of what happens during the Playwright test execution.

## Test 1: Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1: Navigate to Application                                 │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  Browser opens → http://localhost:3000                          │
│                                                                  │
│  Expected: Page title contains "Tic-Tac-Toe"                   │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 2: Display Name Prompt Appears                             │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  ┌───────────────────────────────────────────────────┐         │
│  │  Welcome to Tic-Tac-Toe!                          │         │
│  │                                                    │         │
│  │  Please enter a display name to get started.      │         │
│  │                                                    │         │
│  │  Display Name                                      │         │
│  │  ┌──────────────────────────────────────────┐    │         │
│  │  │ [Enter your name]                        │    │         │
│  │  └──────────────────────────────────────────┘    │         │
│  │                                                    │         │
│  │           [ Continue ]                             │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                  │
│  Expected: Modal visible, input field visible                   │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 3: Enter Display Name                                      │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  ┌───────────────────────────────────────────────────┐         │
│  │  Welcome to Tic-Tac-Toe!                          │         │
│  │                                                    │         │
│  │  Please enter a display name to get started.      │         │
│  │                                                    │         │
│  │  Display Name                                      │         │
│  │  ┌──────────────────────────────────────────┐    │         │
│  │  │ TestPlayer                               │    │         │
│  │  └──────────────────────────────────────────┘    │         │
│  │                                                    │         │
│  │           [ Continue ]                             │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                  │
│  Action: Type "TestPlayer" into input field                     │
│  Expected: Input value = "TestPlayer"                           │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 4: Click Continue Button                                   │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  Action: Click "Continue" button                                │
│  Expected: Modal closes, welcome screen appears                 │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 5: Welcome Screen Displayed                                │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  ┌───────────────────────────────────────────────────┐         │
│  │                                                    │         │
│  │  Welcome,                                          │         │
│  │  TestPlayer                    [ Change Name ]     │         │
│  │                                                    │         │
│  │                                                    │         │
│  │         Tic-Tac-Toe                                │         │
│  │                                                    │         │
│  │  Play tic-tac-toe with your friends online.       │         │
│  │  Game features coming soon!                        │         │
│  │                                                    │         │
│  │         [ Start Game ]                             │         │
│  │                                                    │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                  │
│  Expected: User name "TestPlayer" visible                       │
│  Expected: Main content visible                                 │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Step 6: Change Display Name                                     │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  Action: Click "Change Name" button                             │
│  Result: Modal reappears                                        │
│                                                                  │
│  Action: Clear input and type "NewPlayer"                       │
│  Action: Click "Continue"                                       │
│                                                                  │
│  Expected: Welcome screen shows "NewPlayer"                     │
│  Expected: "TestPlayer" no longer visible                       │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

TEST RESULT: ✓ PASSED (15 seconds)
VIDEO: test-results/.../video.webm (15 seconds)
```

## Test 2: Input Validation

```
┌─────────────────────────────────────────────────────────────────┐
│ Validation Test 1: Empty Input                                  │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  ┌───────────────────────────────────────────────────┐         │
│  │  Display Name                                      │         │
│  │  ┌──────────────────────────────────────────┐    │         │
│  │  │                                          │    │         │
│  │  └──────────────────────────────────────────┘    │         │
│  │  ⚠ Please enter a display name                   │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                  │
│  Action: Click Continue with empty input                        │
│  Expected: Error message appears                                │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Validation Test 2: Too Short (1 character)                      │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  ┌───────────────────────────────────────────────────┐         │
│  │  Display Name                                      │         │
│  │  ┌──────────────────────────────────────────┐    │         │
│  │  │ A                                        │    │         │
│  │  └──────────────────────────────────────────┘    │         │
│  │  ⚠ Display name must be at least 2 characters    │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                  │
│  Action: Type "A" and click Continue                            │
│  Expected: Minimum length error appears                         │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Validation Test 3: Too Long (>20 characters)                    │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  ┌───────────────────────────────────────────────────┐         │
│  │  Display Name                                      │         │
│  │  ┌──────────────────────────────────────────┐    │         │
│  │  │ ThisNameIsWayTooLongForTheValidation     │    │         │
│  │  └──────────────────────────────────────────┘    │         │
│  │  ⚠ Display name must be 20 characters or less    │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                  │
│  Action: Type long name and click Continue                      │
│  Expected: Maximum length error appears                         │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Validation Test 4: Valid Input After Errors                     │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  ┌───────────────────────────────────────────────────┐         │
│  │  Display Name                                      │         │
│  │  ┌──────────────────────────────────────────┐    │         │
│  │  │ ValidPlayer                              │    │         │
│  │  └──────────────────────────────────────────┘    │         │
│  │                                                    │         │
│  │           [ Continue ]                             │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                  │
│  Action: Clear input, type "ValidPlayer", click Continue        │
│  Expected: Modal closes, welcome screen appears                 │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

TEST RESULT: ✓ PASSED (8 seconds)
VIDEO: test-results/.../video.webm (8 seconds)
```

## Test 3: Session Persistence

```
┌─────────────────────────────────────────────────────────────────┐
│ Tab 1: Set Display Name                                         │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  Browser Tab 1: http://localhost:3000                           │
│                                                                  │
│  1. Modal appears                                                │
│  2. Type "PersistentPlayer"                                     │
│  3. Click Continue                                               │
│  4. Welcome screen shows "PersistentPlayer"                     │
│                                                                  │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ Tab 2: Verify Persistence                                       │
│ ─────────────────────────────────────────────────────────────── │
│                                                                  │
│  Browser Tab 2: http://localhost:3000 (new tab, same session)  │
│                                                                  │
│  ┌───────────────────────────────────────────────────┐         │
│  │                                                    │         │
│  │  Welcome,                                          │         │
│  │  PersistentPlayer              [ Change Name ]     │         │
│  │                                                    │         │
│  │         Tic-Tac-Toe                                │         │
│  │                                                    │         │
│  │  Play tic-tac-toe with your friends online.       │         │
│  │                                                    │         │
│  └───────────────────────────────────────────────────┘         │
│                                                                  │
│  Expected: Modal does NOT appear                                │
│  Expected: "PersistentPlayer" immediately visible               │
│  Status: ✓ PASS                                                 │
└─────────────────────────────────────────────────────────────────┘

TEST RESULT: ✓ PASSED (6 seconds)
VIDEO: test-results/.../video.webm (6 seconds)
```

## Summary

```
╔═══════════════════════════════════════════════════════════════╗
║                    TEST EXECUTION SUMMARY                      ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║  Total Tests:     3                                            ║
║  Passed:          3 ✓                                          ║
║  Failed:          0                                            ║
║  Duration:        29 seconds                                   ║
║                                                                ║
║  Videos Generated: 3                                           ║
║  Location:        test-results/                                ║
║  Format:          WebM                                         ║
║  Total Size:      ~2-5 MB                                      ║
║                                                                ║
╚═══════════════════════════════════════════════════════════════╝
```

## Key Features Tested

✓ **User Interface**
  - Modal display and dismissal
  - Form input and validation
  - Button interactions
  - Text display and updates

✓ **User Experience**
  - Clear error messages
  - Smooth transitions
  - Intuitive flow

✓ **Data Persistence**
  - SessionStorage integration
  - Cross-tab data sharing
  - State management

✓ **Validation Rules**
  - Empty input rejection
  - Minimum length (2 chars)
  - Maximum length (20 chars)
  - Whitespace trimming

## Video Recording Features

Each video captures:
- 🖱️ Mouse movements and clicks
- ⌨️ Keyboard input (character by character)
- 🎨 Visual transitions and animations
- ⚠️ Error messages appearing/disappearing
- ✅ Success states and confirmations
- 📱 Page navigation and tab switching

## Accessing the Videos

After running `npm run test:e2e`:

```bash
# List all video files
find test-results -name "*.webm"

# Output example:
# test-results/happy-path-...-chromium/video.webm
# test-results/happy-path-...-chromium/video.webm
# test-results/happy-path-...-chromium/video.webm

# Open in browser (macOS)
open test-results/*/video.webm

# Open in browser (Linux)
xdg-open test-results/*/video.webm

# Or view in HTML report
npm run test:e2e:report
```
