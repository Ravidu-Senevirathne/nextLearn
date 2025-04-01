/**
 * Simple script to start the standalone Next.js server
 * Usage: node start.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if we're in production mode with standalone output
const standaloneServerPath = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServerPath)) {
  console.log('Starting standalone server...');
  const server = spawn('node', [standaloneServerPath], { stdio: 'inherit' });
  
  server.on('close', (code) => {
    console.log(`Server exited with code ${code}`);
  });
} else {
  console.log('Standalone server not found. Running development server instead...');
  const devServer = spawn('npx', ['next', 'dev'], { stdio: 'inherit' });
  
  devServer.on('close', (code) => {
    console.log(`Dev server exited with code ${code}`);
  });
}
