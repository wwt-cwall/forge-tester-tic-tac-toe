const http = require('http');
const server = require('../src/index');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3002,
      path: path,
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  const testServer = server.listen(3002);
  
  try {
    console.log('Running backend tests...');
    
    // Test 1: Health endpoint
    const healthResponse = await makeRequest('/health');
    if (healthResponse.statusCode !== 200) {
      throw new Error(`Health check failed: expected 200, got ${healthResponse.statusCode}`);
    }
    if (healthResponse.body.status !== 'ok') {
      throw new Error(`Health check failed: expected status 'ok', got '${healthResponse.body.status}'`);
    }
    console.log('✓ Health endpoint test passed');

    // Test 2: Game API endpoint
    const gameResponse = await makeRequest('/api/game');
    if (gameResponse.statusCode !== 200) {
      throw new Error(`Game API failed: expected 200, got ${gameResponse.statusCode}`);
    }
    if (!gameResponse.body.message) {
      throw new Error('Game API failed: expected message property');
    }
    console.log('✓ Game API endpoint test passed');

    console.log('\nAll backend tests passed!');
    testServer.close();
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error.message);
    testServer.close();
    process.exit(1);
  }
}

runTests();
