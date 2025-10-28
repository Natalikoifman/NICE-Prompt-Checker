const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create color icon (192x192)
const colorCanvas = createCanvas(192, 192);
const colorCtx = colorCanvas.getContext('2d');

// Background
colorCtx.fillStyle = '#4A90E2';
colorCtx.fillRect(0, 0, 192, 192);

// Checkmark
colorCtx.fillStyle = 'white';
colorCtx.font = 'bold 80px Arial';
colorCtx.textAlign = 'center';
colorCtx.textBaseline = 'middle';
colorCtx.fillText('✓', 96, 85);

// Text
colorCtx.font = 'bold 24px Arial';
colorCtx.fillText('NICE', 96, 140);

// Save
const colorBuffer = colorCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, '../appPackage/color.png'), colorBuffer);
console.log('Created color.png');

// Create outline icon (32x32)
const outlineCanvas = createCanvas(32, 32);
const outlineCtx = outlineCanvas.getContext('2d');

// Background - transparent
outlineCtx.fillStyle = 'transparent';
outlineCtx.fillRect(0, 0, 32, 32);

// Border
outlineCtx.strokeStyle = '#4A90E2';
outlineCtx.lineWidth = 2;
outlineCtx.strokeRect(1, 1, 30, 30);

// Checkmark
outlineCtx.fillStyle = '#4A90E2';
outlineCtx.font = 'bold 18px Arial';
outlineCtx.textAlign = 'center';
outlineCtx.textBaseline = 'middle';
outlineCtx.fillText('✓', 16, 16);

// Save
const outlineBuffer = outlineCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, '../appPackage/outline.png'), outlineBuffer);
console.log('Created outline.png');

console.log('\nIcons created successfully!');
