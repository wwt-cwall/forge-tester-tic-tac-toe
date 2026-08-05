#!/usr/bin/env node

/**
 * Development server with concurrent frontend and backend processes
 * Uses concurrently to run both Next.js dev server and backend API
 */

const { spawn } = require('child_process');
const path = require('path');

// Set development environment
process.env.NODE_ENV = 'DEV';

const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 3001;

console.log('Starting development servers...');
console.log(`Frontend will run on: http://localhost:${FRONTEND_PORT}`);
console.log(`Backend will run on: http://localhost:${BACKEND_PORT}`);

// Start frontend dev server
const frontend = spawn('npm', ['run', 'dev', '--workspace=packages/frontend'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: FRONTEND_PORT }
});

// Start backend dev server
const backend = spawn('npm', ['run', 'dev', '--workspace=packages/backend'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: BACKEND_PORT }
});

// Handle process termination
const cleanup = () => {
  console.log('\nShutting down development servers...');
  frontend.kill();
  backend.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Handle child process errors
frontend.on('error', (error) => {
  console.error('Frontend process error:', error);
  cleanup();
});

backend.on('error', (error) => {
  console.error('Backend process error:', error);
  cleanup();
});

// Handle child process exits
frontend.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Frontend process exited with code ${code}`);
    cleanup();
  }
});

backend.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Backend process exited with code ${code}`);
    cleanup();
  }
});
