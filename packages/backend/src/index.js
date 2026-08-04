const http = require('http');

const PORT = process.env.PORT || 3001;

/**
 * Route handlers
 */
const routes = {
  health: (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify({ 
      status: 'ok', 
      message: 'Tic-tac-toe backend is running' 
    }));
  },
  
  gameApi: (req, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify({ 
      message: 'Game API endpoint' 
    }));
  },
  
  notFound: (req, res) => {
    res.statusCode = 404;
    res.end(JSON.stringify({ 
      error: 'Not found' 
    }));
  }
};

/**
 * Request router
 */
function handleRequest(req, res) {
  // Set common headers
  res.setHeader('Content-Type', 'application/json');
  
  try {
    // Route matching
    if (req.url === '/health' && req.method === 'GET') {
      routes.health(req, res);
    } else if (req.url === '/api/game' && req.method === 'GET') {
      routes.gameApi(req, res);
    } else {
      routes.notFound(req, res);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ 
      error: 'Internal server error' 
    }));
  }
}

/**
 * Create HTTP server
 */
const server = http.createServer(handleRequest);

/**
 * Start server if this is the main module
 */
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

module.exports = server;
