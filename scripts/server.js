#!/usr/bin/env node

/**
 * Production server that serves both Next.js frontend and backend API
 * from a single Node.js application.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');
const { spawn } = require('child_process');
const next = require('next');

// Environment configuration
const isDev = process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'PROD' || process.env.NODE_ENV === 'production';

// Port configuration
const HTTP_PORT = process.env.HTTP_PORT || (isDev ? 3000 : 80);
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const BACKEND_PORT = process.env.BACKEND_PORT || 3001;
const USE_HTTPS = isProd && process.env.USE_HTTPS !== 'false';

// Next.js configuration
const frontendDir = path.join(__dirname, '../packages/frontend');
const app = next({ 
  dev: isDev, 
  dir: frontendDir,
  hostname: 'localhost',
  port: HTTP_PORT
});
const handle = app.getRequestHandler();

// Backend process reference
let backendProcess = null;

/**
 * Main request handler that routes between backend API and Next.js frontend
 */
function createRequestHandler(req, res) {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  // Route API requests to backend
  if (pathname.startsWith('/api/') || pathname === '/health') {
    // Proxy request to backend server
    const options = {
      hostname: 'localhost',
      port: BACKEND_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (error) => {
      console.error('Backend proxy error:', error);
      res.statusCode = 502;
      res.end(JSON.stringify({ error: 'Backend unavailable' }));
    });

    req.pipe(proxyReq);
  } else {
    // Route all other requests to Next.js
    handle(req, res, parsedUrl);
  }
}

/**
 * Load SSL certificates for HTTPS
 */
function loadSSLCertificates() {
  const certDir = path.join(__dirname, '../certs');
  const keyPath = path.join(certDir, 'key.pem');
  const certPath = path.join(certDir, 'cert.pem');

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    return {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    };
  }

  console.warn('SSL certificates not found. HTTPS server will not start.');
  console.warn(`Expected certificates at: ${certDir}`);
  return null;
}

/**
 * Start the backend server as a separate process
 */
function startBackend() {
  return new Promise((resolve, reject) => {
    console.log(`Starting backend server on port ${BACKEND_PORT}...`);
    
    backendProcess = spawn('node', ['packages/backend/src/index.js'], {
      env: { ...process.env, PORT: BACKEND_PORT },
      stdio: ['ignore', 'pipe', 'pipe']
    });

    backendProcess.stdout.on('data', (data) => {
      console.log(`[Backend] ${data.toString().trim()}`);
    });

    backendProcess.stderr.on('data', (data) => {
      console.error(`[Backend Error] ${data.toString().trim()}`);
    });

    backendProcess.on('error', (error) => {
      console.error('Failed to start backend:', error);
      reject(error);
    });

    backendProcess.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Backend process exited with code ${code}`);
      }
    });

    // Give backend a moment to start
    setTimeout(() => resolve(), 1000);
  });
}

/**
 * Start the server
 */
async function startServer() {
  try {
    console.log(`Starting server in ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'} mode...`);
    
    // Start backend first
    await startBackend();
    
    // Prepare Next.js
    await app.prepare();
    console.log('Next.js application prepared');

    // Create HTTP server
    const httpServer = http.createServer(createRequestHandler);
    
    httpServer.listen(HTTP_PORT, (err) => {
      if (err) throw err;
      console.log(`> HTTP Server ready on http://localhost:${HTTP_PORT}`);
      console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Create HTTPS server in production if enabled
    if (USE_HTTPS) {
      const sslOptions = loadSSLCertificates();
      
      if (sslOptions) {
        const httpsServer = https.createServer(sslOptions, createRequestHandler);
        
        httpsServer.listen(HTTPS_PORT, (err) => {
          if (err) throw err;
          console.log(`> HTTPS Server ready on https://localhost:${HTTPS_PORT}`);
        });
      } else {
        console.log('> HTTPS server not started (certificates not found)');
      }
    }

    // Handle graceful shutdown
    const shutdown = (signal) => {
      console.log(`\n${signal} received, shutting down gracefully...`);
      
      // Kill backend process
      if (backendProcess) {
        backendProcess.kill();
      }
      
      httpServer.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
