#!/usr/bin/env node
// Changed by Forge v0.1.0
/**
 * Minimal script to generate Playwright test videos
 * Runs tests one at a time to minimize memory usage
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const VIDEOS_DIR = 'docs/videos';
const TEST_RESULTS_DIR = 'test-results';

// Ensure directories exist
if (!fs.existsSync(VIDEOS_DIR)) {
  fs.mkdirSync(VIDEOS_DIR, { recursive: true });
}

console.log('📹 Generating Playwright test videos...\n');
console.log('This will run tests one at a time to minimize memory usage.\n');

// Tests to run
const tests = [
  {
    grep: 'should complete the full user journey',
    output: 'complete-user-journey.webm'
  },
  {
    grep: 'should validate display name input',
    output: 'input-validation.webm'
  },
  {
    grep: 'should persist display name across sessions',
    output: 'session-persistence.webm'
  }
];

let successCount = 0;

for (const test of tests) {
  console.log(`\n🎬 Running: ${test.grep}`);
  
  try {
    // Clean previous test results
    if (fs.existsSync(TEST_RESULTS_DIR)) {
      execSync(`rm -rf ${TEST_RESULTS_DIR}`, { stdio: 'inherit' });
    }
    
    // Run single test
    execSync(
      `PLAYWRIGHT_SKIP_SERVER=1 npx playwright test --project=chromium --workers=1 --grep "${test.grep}"`,
      { stdio: 'inherit' }
    );
    
    // Find and copy the video
    const testDirs = fs.readdirSync(TEST_RESULTS_DIR);
    let videoFound = false;
    
    for (const dir of testDirs) {
      const videoPath = path.join(TEST_RESULTS_DIR, dir, 'video.webm');
      if (fs.existsSync(videoPath)) {
        const targetPath = path.join(VIDEOS_DIR, test.output);
        fs.copyFileSync(videoPath, targetPath);
        console.log(`✅ Saved: ${test.output}`);
        videoFound = true;
        successCount++;
        break;
      }
    }
    
    if (!videoFound) {
      console.log(`⚠️  No video found for: ${test.grep}`);
    }
    
  } catch (error) {
    console.error(`❌ Failed to run test: ${test.grep}`);
    console.error(error.message);
  }
}

console.log(`\n✅ Generated ${successCount}/${tests.length} videos`);
console.log(`📁 Videos saved to: ${VIDEOS_DIR}/`);

if (successCount < tests.length) {
  console.log('\n⚠️  Some videos failed to generate. This may be due to:');
  console.log('   - Insufficient memory (Playwright needs ~2-4GB)');
  console.log('   - Server not running (start with: npm run dev:frontend)');
  console.log('   - Missing dependencies (run: npm install)');
  process.exit(1);
}
