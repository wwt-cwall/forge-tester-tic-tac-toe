#!/usr/bin/env node
// Changed by Forge v0.1.0
/**
 * Script to run Playwright E2E tests with proper server management
 * This handles starting/stopping the dev server and running tests
 */

const { spawn } = require('child_process');
const http = require('http');

let serverProcess = null;
let testExitCode = 0;

// Cleanup function
function cleanup() {
  if (serverProcess) {
    console.log('\n🛑 Stopping development server...');
    serverProcess.kill('SIGTERM');
    
    // Force kill after 5 seconds if still running
    setTimeout(() => {
      if (serverProcess && !serverProcess.killed) {
        serverProcess.kill('SIGKILL');
      }
    }, 5000);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  cleanup();
  process.exit(130);
});

process.on('SIGTERM', () => {
  cleanup();
  process.exit(143);
});

// Check if server is ready
async function waitForServer(maxAttempts = 60, delayMs = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get('http://localhost:3000', (res) => {
          if (res.statusCode === 200) {
            resolve();
          } else {
            reject(new Error(`Server returned ${res.statusCode}`));
          }
        });
        req.on('error', reject);
        req.setTimeout(1000, () => {
          req.destroy();
          reject(new Error('Timeout'));
        });
      });
      
      console.log('✅ Server is ready!');
      return true;
    } catch (error) {
      if (attempt % 10 === 0) {
        console.log(`⏳ Waiting for server... (attempt ${attempt}/${maxAttempts})`);
      }
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  return false;
}

// Main execution
async function main() {
  console.log('🚀 Starting Playwright E2E Test Runner\n');
  
  // Start the development server
  console.log('📦 Starting development server...');
  serverProcess = spawn('npm', ['run', 'dev'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NODE_ENV: 'DEV' }
  });
  
  // Log server output
  serverProcess.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Ready') || output.includes('started')) {
      console.log('📡', output.trim());
    }
  });
  
  serverProcess.stderr.on('data', (data) => {
    const output = data.toString();
    // Only log errors, not warnings
    if (output.includes('Error') || output.includes('error')) {
      console.error('❌', output.trim());
    }
  });
  
  serverProcess.on('error', (error) => {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  });
  
  serverProcess.on('exit', (code) => {
    if (code !== null && code !== 0 && code !== 143 && code !== 130) {
      console.error(`❌ Server exited with code ${code}`);
      process.exit(code);
    }
  });
  
  // Wait for server to be ready
  console.log('⏳ Waiting for server to be ready...');
  const serverReady = await waitForServer();
  
  if (!serverReady) {
    console.error('❌ Server failed to start within timeout');
    cleanup();
    process.exit(1);
  }
  
  // Run Playwright tests
  console.log('\n🎭 Running Playwright tests...\n');
  const testProcess = spawn('npx', ['playwright', 'test', ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, PLAYWRIGHT_SKIP_SERVER: '1' }
  });
  
  testProcess.on('exit', (code) => {
    testExitCode = code || 0;
    cleanup();
    
    if (testExitCode === 0) {
      console.log('\n✅ All tests passed!');
      console.log('\n📹 Video recordings are available in: test-results/');
    } else {
      console.log('\n❌ Some tests failed');
    }
    
    process.exit(testExitCode);
  });
}

main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  cleanup();
  process.exit(1);
});
