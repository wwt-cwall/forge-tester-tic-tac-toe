#!/usr/bin/env node
// Changed by Forge v0.1.0
/**
 * Minimal script to capture screenshots of the application
 * as a fallback if video generation fails due to memory constraints
 */

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = 'docs/videos/screenshots';
const BASE_URL = 'http://localhost:3000';

async function captureScreenshots() {
  console.log('📸 Capturing application screenshots...\n');
  
  // Ensure directory exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  let browser;
  try {
    // Launch browser with minimal resources
    browser = await chromium.launch({
      headless: true,
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu'
      ]
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    
    const page = await context.newPage();

    // Screenshot 1: Initial modal
    console.log('1. Capturing initial modal...');
    await page.goto(BASE_URL);
    await page.waitForSelector('text=Welcome to Tic-Tac-Toe!', { timeout: 10000 });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-initial-modal.png') });
    console.log('   ✓ Saved: 01-initial-modal.png');

    // Screenshot 2: Filled input
    console.log('2. Capturing filled input...');
    await page.fill('input[type="text"]', 'TestPlayer');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-filled-input.png') });
    console.log('   ✓ Saved: 02-filled-input.png');

    // Screenshot 3: Welcome screen
    console.log('3. Capturing welcome screen...');
    await page.click('button:has-text("Continue")');
    await page.waitForSelector('text=Welcome,', { timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-welcome-screen.png') });
    console.log('   ✓ Saved: 03-welcome-screen.png');

    // Screenshot 4: Change name modal
    console.log('4. Capturing change name modal...');
    await page.click('button:has-text("Change Name")');
    await page.waitForSelector('text=Welcome to Tic-Tac-Toe!', { timeout: 5000 });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-change-name-modal.png') });
    console.log('   ✓ Saved: 04-change-name-modal.png');

    console.log('\n✅ Successfully captured 4 screenshots');
    console.log(`📁 Screenshots saved to: ${SCREENSHOTS_DIR}/`);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    console.error('\nThis may be due to:');
    console.error('  - Server not running (start with: npm run dev:frontend)');
    console.error('  - Insufficient memory');
    console.error('  - Missing dependencies');
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

captureScreenshots();
