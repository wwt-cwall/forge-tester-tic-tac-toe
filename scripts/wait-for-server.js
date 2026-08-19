// Changed by Forge v0.1.0
// Simple script to wait for server to be ready
const http = require('http');

const maxAttempts = 30;
const delayMs = 1000;
let attempts = 0;

function checkServer() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer() {
  while (attempts < maxAttempts) {
    attempts++;
    console.log(`Attempt ${attempts}/${maxAttempts}...`);
    
    const isReady = await checkServer();
    if (isReady) {
      console.log('Server is ready!');
      process.exit(0);
    }
    
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  
  console.error('Server failed to start within timeout');
  process.exit(1);
}

waitForServer();
