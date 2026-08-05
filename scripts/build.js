#!/usr/bin/env node

/**
 * Build script that builds both frontend and backend for production
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Building tic-tac-toe application...\n');

try {
  // Ensure frontend dependencies are available
  console.log('📦 Preparing frontend dependencies...');
  const frontendNodeModules = path.join(__dirname, '../packages/frontend/node_modules/@tailwindcss');
  const rootTailwindModules = path.join(__dirname, '../node_modules/@tailwindcss');
  
  if (!fs.existsSync(frontendNodeModules)) {
    fs.mkdirSync(frontendNodeModules, { recursive: true });
  }
  
  // Copy @tailwindcss modules to frontend if not present
  if (fs.existsSync(rootTailwindModules)) {
    const modules = fs.readdirSync(rootTailwindModules);
    modules.forEach(mod => {
      const src = path.join(rootTailwindModules, mod);
      const dest = path.join(frontendNodeModules, mod);
      if (!fs.existsSync(dest)) {
        fs.cpSync(src, dest, { recursive: true });
      }
    });
  }
  
  // Build frontend (Next.js)
  console.log('📦 Building frontend...');
  try {
    execSync('npm run build --workspace=packages/frontend', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
    console.log('✅ Frontend build complete\n');
  } catch (error) {
    console.error('❌ Frontend build failed');
    throw error;
  }

  // Build backend
  console.log('📦 Building backend...');
  execSync('npm run build --workspace=packages/backend', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('✅ Backend build complete\n');

  // Verify build outputs
  const frontendBuildDir = path.join(__dirname, '../packages/frontend/.next');
  if (!fs.existsSync(frontendBuildDir)) {
    throw new Error('Frontend build directory not found');
  }

  console.log('✅ All builds completed successfully!');
  console.log('\nTo start the production server, run:');
  console.log('  npm start\n');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
