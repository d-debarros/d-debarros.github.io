#!/usr/bin/env node

/**
 * Converts DOOM.zip to .jsdos format
 * Requires: npm install js-dos-cli
 * 
 * Usage: node convert-doom.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'assets', 'doom', 'DOOM.zip');
const outputPath = path.join(__dirname, 'assets', 'doom', 'DOOM.jsdos');

console.log('🎮 DOOM ZIP to JSDOS Converter');
console.log('================================\n');

// Check if input file exists
if (!fs.existsSync(inputPath)) {
  console.error(`❌ Input file not found: ${inputPath}`);
  process.exit(1);
}

console.log(`📦 Input: ${inputPath}`);
console.log(`📦 Output: ${outputPath}\n`);

try {
  console.log('🔄 Converting DOOM.zip to JSDOS format...\n');
  console.log('ℹ️  This may take a moment as npx downloads js-dos-cli...\n');
  
  // Use npx to run js-dos bundler directly
  execSync(`npx js-dos bundle "${inputPath}" "${outputPath}"`, { 
    stdio: 'inherit',
    cwd: __dirname 
  });

  console.log('\n✅ Conversion successful!');
  console.log(`✨ Your DOOM.jsdos file is ready at: assets/doom/DOOM.jsdos\n`);
  
  // Show file size
  const stats = fs.statSync(outputPath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  console.log(`📊 File size: ${sizeKB} KB\n`);
  
  console.log('ℹ️  You can now use this .jsdos file with js-dos!');
  console.log('The website will load it automatically.\n');

} catch (error) {
  console.error('❌ Conversion failed:', error.message);
  console.error('\n💡 Alternative: Use the web-based bundler at https://js-dos.com/documents/api/#js-dos-studio');
  process.exit(1);
}
