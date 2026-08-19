<!-- Changed by Forge v0.1.0 -->
# Playwright Test Videos

## ⚠️ Videos Need to Be Generated

This directory is ready to receive Playwright test execution videos, but they need to be generated in an environment with sufficient resources.

### Quick Start (Local Machine)

```bash
# Ensure you have at least 4GB RAM available
npm install
npm run test:e2e
npm run test:e2e:save-videos
git add docs/videos/*.webm
git commit -m "Add Playwright test execution videos"
```

### Why Videos Aren't Included

The automated CI environment has insufficient memory to run Playwright with Chromium browser automation. Attempts to generate videos result in OOM (Out of Memory) errors (exit code 137).

### What Should Be Here

Once generated, this directory should contain three video files:

1. **complete-user-journey.webm** - Full user flow from modal to name change
2. **input-validation.webm** - Display name validation tests  
3. **session-persistence.webm** - Cross-tab session storage tests

### File Specifications

- Format: WebM (VP8 codec)
- Resolution: 1280x720
- Size: 1-4 MB per video
- Duration: 10-30 seconds per test

### Detailed Instructions

See [ACTION_REQUIRED.md](./ACTION_REQUIRED.md) for complete instructions on generating and committing the videos.

### Alternative: CI Artifacts

Videos are also available as GitHub Actions artifacts when tests run successfully in CI. However, the acceptance criteria requests videos be provided with the PR, so committing them to this directory is preferred.

---

**Status**: ⏳ Awaiting video generation and commit
**Required By**: PR #11 acceptance criteria
**Contact**: @wwt-cwall or @cwallwwtsecondary
