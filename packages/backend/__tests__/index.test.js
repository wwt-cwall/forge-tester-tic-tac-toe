const http = require('http');
const server = require('../src/index');

const TEST_PORT = 3002;
let testServer;

/**
 * Make an HTTP request to the test server
 */
function makeRequest(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: TEST_PORT,
      path: path,
      method: method,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({ 
            statusCode: res.statusCode, 
            body: JSON.parse(data),
            headers: res.headers
          });
        } catch (error) {
          resolve({ 
            statusCode: res.statusCode, 
            body: data,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Test assertion helper
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('Running backend tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  try {
    // Start test server
    testServer = server.listen(TEST_PORT);
    
    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Test 1: Health endpoint returns 200
    try {
      const response = await makeRequest('/health');
      assert(response.statusCode === 200, 
        `Health check failed: expected 200, got ${response.statusCode}`);
      console.log('✓ Health endpoint returns 200 status code');
      passed++;
    } catch (error) {
      console.error('✗ Health endpoint returns 200 status code:', error.message);
      failed++;
    }
    
    // Test 2: Health endpoint returns ok status
    try {
      const response = await makeRequest('/health');
      assert(response.body.status === 'ok', 
        `Health check failed: expected status 'ok', got '${response.body.status}'`);
      console.log('✓ Health endpoint returns ok status');
      passed++;
    } catch (error) {
      console.error('✗ Health endpoint returns ok status:', error.message);
      failed++;
    }
    
    // Test 3: Health endpoint returns message
    try {
      const response = await makeRequest('/health');
      assert(response.body.message === 'Tic-tac-toe backend is running',
        `Health check failed: unexpected message '${response.body.message}'`);
      console.log('✓ Health endpoint returns correct message');
      passed++;
    } catch (error) {
      console.error('✗ Health endpoint returns correct message:', error.message);
      failed++;
    }
    
    // Test 4: Health endpoint returns JSON content type
    try {
      const response = await makeRequest('/health');
      assert(response.headers['content-type'] === 'application/json',
        `Health check failed: expected JSON content type, got '${response.headers['content-type']}'`);
      console.log('✓ Health endpoint returns JSON content type');
      passed++;
    } catch (error) {
      console.error('✗ Health endpoint returns JSON content type:', error.message);
      failed++;
    }
    
    // Test 5: Health endpoint returns uptimeSeconds field
    try {
      const response = await makeRequest('/health');
      assert(response.body.hasOwnProperty('uptimeSeconds'),
        'Health check failed: missing uptimeSeconds field');
      console.log('✓ Health endpoint returns uptimeSeconds field');
      passed++;
    } catch (error) {
      console.error('✗ Health endpoint returns uptimeSeconds field:', error.message);
      failed++;
    }
    
    // Test 6: uptimeSeconds is a number
    try {
      const response = await makeRequest('/health');
      assert(typeof response.body.uptimeSeconds === 'number',
        `Health check failed: uptimeSeconds should be a number, got ${typeof response.body.uptimeSeconds}`);
      console.log('✓ uptimeSeconds is a number');
      passed++;
    } catch (error) {
      console.error('✗ uptimeSeconds is a number:', error.message);
      failed++;
    }
    
    // Test 7: uptimeSeconds is non-negative
    try {
      const response = await makeRequest('/health');
      assert(response.body.uptimeSeconds >= 0,
        `Health check failed: uptimeSeconds should be non-negative, got ${response.body.uptimeSeconds}`);
      console.log('✓ uptimeSeconds is non-negative');
      passed++;
    } catch (error) {
      console.error('✗ uptimeSeconds is non-negative:', error.message);
      failed++;
    }
    
    // Test 8: uptimeSeconds increases over time
    try {
      const response1 = await makeRequest('/health');
      const uptime1 = response1.body.uptimeSeconds;
      
      // Wait a bit
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      const response2 = await makeRequest('/health');
      const uptime2 = response2.body.uptimeSeconds;
      
      assert(uptime2 >= uptime1,
        `Health check failed: uptimeSeconds should increase over time, got ${uptime1} then ${uptime2}`);
      console.log('✓ uptimeSeconds increases over time');
      passed++;
    } catch (error) {
      console.error('✗ uptimeSeconds increases over time:', error.message);
      failed++;
    }
    
    // Test 9: Game API endpoint returns 200
    try {
      const response = await makeRequest('/api/game');
      assert(response.statusCode === 200,
        `Game API failed: expected 200, got ${response.statusCode}`);
      console.log('✓ Game API endpoint returns 200 status code');
      passed++;
    } catch (error) {
      console.error('✗ Game API endpoint returns 200 status code:', error.message);
      failed++;
    }
    
    // Test 10: Game API endpoint returns message
    try {
      const response = await makeRequest('/api/game');
      assert(response.body.message,
        'Game API failed: expected message property');
      console.log('✓ Game API endpoint returns message');
      passed++;
    } catch (error) {
      console.error('✗ Game API endpoint returns message:', error.message);
      failed++;
    }
    
    // Test 11: Unknown routes return 404
    try {
      const response = await makeRequest('/unknown');
      assert(response.statusCode === 404,
        `404 handling failed: expected 404, got ${response.statusCode}`);
      console.log('✓ Unknown routes return 404 status code');
      passed++;
    } catch (error) {
      console.error('✗ Unknown routes return 404 status code:', error.message);
      failed++;
    }
    
    // Test 12: 404 response includes error message
    try {
      const response = await makeRequest('/unknown');
      assert(response.body.error === 'Not found',
        `404 handling failed: expected error message 'Not found', got '${response.body.error}'`);
      console.log('✓ 404 response includes error message');
      passed++;
    } catch (error) {
      console.error('✗ 404 response includes error message:', error.message);
      failed++;
    }
    
    // Print summary
    console.log(`\n${passed} tests passed, ${failed} tests failed`);
    
    if (failed === 0) {
      console.log('\nAll backend tests passed! ✓');
      testServer.close();
      process.exit(0);
    } else {
      console.error('\nSome tests failed! ✗');
      testServer.close();
      process.exit(1);
    }
    
  } catch (error) {
    console.error('Test suite error:', error.message);
    if (testServer) {
      testServer.close();
    }
    process.exit(1);
  }
}

runTests();
