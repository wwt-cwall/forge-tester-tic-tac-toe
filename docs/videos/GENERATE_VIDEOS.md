<!-- Changed by Forge v0.1.0 -->
# Video Files Needed

This directory is ready to receive Playwright test execution videos.

## How to Add Videos

Run the following commands locally to generate and save the videos:

```bash
# 1. Run the E2E tests (this generates videos in test-results/)
npm run test:e2e

# 2. Copy videos to this directory with descriptive names
npm run test:e2e:save-videos

# 3. Commit the video files
git add docs/videos/*.webm
git commit -m "Add Playwright test execution videos"
```

## Expected Video Files

Once generated, this directory should contain:

- `complete-user-journey.webm` - Full user flow test
- `input-validation.webm` - Input validation test  
- `session-persistence.webm` - Session persistence test

## Why Videos Aren't Pre-committed

The video files are binary artifacts that need to be generated in an environment with:
- Sufficient memory for browser automation
- Display/graphics capabilities for video recording
- All project dependencies installed

Generate them locally and commit to this repository to fulfill the acceptance criteria of providing video output.

## File Size Note

WebM video files are typically 1-5 MB each. Git handles binary files, but keep in mind:
- Videos increase repository size
- Consider using Git LFS for very large videos
- Current videos at 720p should be reasonable size

## Alternative: CI Artifacts

Videos are also available as GitHub Actions artifacts:
1. Go to the Actions tab
2. Click on a workflow run
3. Download the "playwright-videos" artifact

However, the acceptance criteria requests videos be provided with the PR, so committing them here is the preferred approach.
