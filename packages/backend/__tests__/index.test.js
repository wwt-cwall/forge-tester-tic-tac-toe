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
    
    // Test 5: Game API endpoint returns 200
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
    
    // Test 6: Game API endpoint returns message
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
    
    // Test 7: Unknown routes return 404
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
    
    // Test 8: 404 response includes error message
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
    
    // Test 9: Board endpoint returns 200
    try {
      const response = await makeRequest('/api/board');
      assert(response.statusCode === 200,
        `Board endpoint failed: expected 200, got ${response.statusCode}`);
      console.log('✓ Board endpoint returns 200 status code');
      passed++;
    } catch (error) {
      console.error('✗ Board endpoint returns 200 status code:', error.message);
      failed++;
    }
    
    // Test 10: Board endpoint returns nine-element array
    try {
      const response = await makeRequest('/api/board');
      assert(Array.isArray(response.body.board),
        `Board endpoint failed: board is not an array`);
      assert(response.body.board.length === 9,
        `Board endpoint failed: expected 9 elements, got ${response.body.board.length}`);
      console.log('✓ Board endpoint returns nine-element array');
      passed++;
    } catch (error) {
      console.error('✗ Board endpoint returns nine-element array:', error.message);
      failed++;
    }
    
    // Test 11: Board endpoint returns whoseTurn field
    try {
      const response = await makeRequest('/api/board');
      assert(response.body.whoseTurn !== undefined,
        `Board endpoint failed: whoseTurn field is missing`);
      assert(typeof response.body.whoseTurn === 'string',
        `Board endpoint failed: whoseTurn should be a string, got ${typeof response.body.whoseTurn}`);
      console.log('✓ Board endpoint returns whoseTurn field');
      passed++;
    } catch (error) {
      console.error('✗ Board endpoint returns whoseTurn field:', error.message);
      failed++;
    }
    
    // Test 12: Board endpoint returns JSON content type
    try {
      const response = await makeRequest('/api/board');
      assert(response.headers['content-type'] === 'application/json',
        `Board endpoint failed: expected JSON content type, got '${response.headers['content-type']}'`);
      console.log('✓ Board endpoint returns JSON content type');
      passed++;
    } catch (error) {
      console.error('✗ Board endpoint returns JSON content type:', error.message);
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
