#!/usr/bin/env node
// Changed by Forge v0.1.0
// Script to copy and rename Playwright test videos to docs/videos/

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TEST_RESULTS_DIR = 'test-results';
const VIDEOS_DIR = 'docs/videos';

// Map of test names to video filenames
const VIDEO_MAPPING = {
  'should complete the full user journey': 'complete-user-journey.webm',
  'should validate display name input': 'input-validation.webm',
  'should persist display name across sessions': 'session-persistence.webm'
};

console.log('📹 Saving Playwright test videos...\n');

// Ensure videos directory exists
if (!fs.existsSync(VIDEOS_DIR)) {
  fs.mkdirSync(VIDEOS_DIR, { recursive: true });
  console.log(`✓ Created ${VIDEOS_DIR} directory`);
}

// Find all video files in test-results
let videoCount = 0;
let savedCount = 0;

try {
  if (!fs.existsSync(TEST_RESULTS_DIR)) {
    console.error(`❌ No ${TEST_RESULTS_DIR} directory found. Run tests first with: npm run test:e2e`);
    process.exit(1);
  }

  const testDirs = fs.readdirSync(TEST_RESULTS_DIR);
  
  for (const testDir of testDirs) {
    const testPath = path.join(TEST_RESULTS_DIR, testDir);
    const videoPath = path.join(testPath, 'video.webm');
    
    if (fs.existsSync(videoPath)) {
      videoCount++;
      
      // Try to match test name from directory name
      let targetName = null;
      for (const [testName, fileName] of Object.entries(VIDEO_MAPPING)) {
        // Simple matching - directory name contains part of test name
        const normalizedTestName = testName.toLowerCase().replace(/\s+/g, '-');
        if (testDir.toLowerCase().includes(normalizedTestName.substring(0, 20))) {
          targetName = fileName;
          break;
        }
      }
      
      // Fallback to generic naming
      if (!targetName) {
        targetName = `test-${savedCount + 1}.webm`;
      }
      
      const targetPath = path.join(VIDEOS_DIR, targetName);
      fs.copyFileSync(videoPath, targetPath);
      console.log(`✓ Saved: ${targetName}`);
      savedCount++;
    }
  }
  
  if (videoCount === 0) {
    console.error(`❌ No video files found in ${TEST_RESULTS_DIR}/`);
    console.error('   Make sure tests ran successfully and video recording is enabled.');
    process.exit(1);
  }
  
  console.log(`\n✅ Saved ${savedCount} video(s) to ${VIDEOS_DIR}/`);
  console.log(`\nView them with:`);
  console.log(`  open ${VIDEOS_DIR}/*.webm`);
  
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
