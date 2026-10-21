const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createOgImage() {
  const width = 1200;
  const height = 630;
  
  // 1. Resize the trimmed logo so it fits comfortably within the center safe zone
  // Center safe square is 630x630. With max dimension 460px, it fits perfectly both in 1200x630 and in 630x630!
  const logo = await sharp('public/logo.png')
    .resize({ width: 460, height: 460, fit: 'inside' })
    .toBuffer();
    
  const logoMeta = await sharp(logo).metadata();
  console.log('Resized logo:', logoMeta.width, 'x', logoMeta.height);

  // 2. Create the luxury dark background SVG with subtle amber glow & telemetry accents
  const svgBg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.18" />
          <stop offset="55%" stop-color="#f59e0b" stop-opacity="0.04" />
          <stop offset="100%" stop-color="#040507" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0" />
          <stop offset="25%" stop-color="#f59e0b" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#fbbf24" stop-opacity="1" />
          <stop offset="75%" stop-color="#f59e0b" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
        </linearGradient>
      </defs>
      
      <!-- Solid Obsidian Black Base (Essential for WhatsApp light/dark consistency) -->
      <rect width="${width}" height="${height}" fill="#040507" />
      
      <!-- Subtle Ambient Amber Core Glow behind Logo -->
      <circle cx="${width / 2}" cy="${height / 2}" r="320" fill="url(#amberGlow)" />
      
      <!-- Fine Golden Amber Horizon Line Top & Bottom -->
      <rect x="0" y="0" width="${width}" height="3" fill="url(#goldLine)" />
      <rect x="0" y="${height - 3}" width="${width}" height="3" fill="url(#goldLine)" opacity="0.6" />
      
      <!-- Corner Tech HUD Accents -->
      <path d="M 40 60 L 40 40 L 60 40" stroke="#f59e0b" stroke-width="1.5" fill="none" opacity="0.6" />
      <path d="M ${width - 40} 60 L ${width - 40} 40 L ${width - 60} 40" stroke="#f59e0b" stroke-width="1.5" fill="none" opacity="0.6" />
      <path d="M 40 ${height - 60} L 40 ${height - 40} L 60 ${height - 40}" stroke="#f59e0b" stroke-width="1.5" fill="none" opacity="0.6" />
      <path d="M ${width - 40} ${height - 60} L ${width - 40} ${height - 40} L ${width - 60} ${height - 40}" stroke="#f59e0b" stroke-width="1.5" fill="none" opacity="0.6" />
    </svg>
  `);

  // 3. Composite the background + resized logo centered
  const left = Math.round((width - logoMeta.width) / 2);
  const top = Math.round((height - logoMeta.height) / 2);

  // Generate public/og-image.png (standard OpenGraph landscape 1200x630)
  await sharp(svgBg)
    .composite([
      { input: logo, left, top }
    ])
    .png({ compressionLevel: 9, quality: 90 })
    .toFile('public/og-image.png');

  // Also copy to app/opengraph-image.png for Next.js App Router automatic metadata discovery!
  fs.copyFileSync('public/og-image.png', 'app/opengraph-image.png');

  // Also generate a square version public/og-image-square.png (600x600) just in case
  const squareSize = 600;
  const squareLogo = await sharp('public/logo.png')
    .resize({ width: 440, height: 440, fit: 'inside' })
    .toBuffer();
  const squareLogoMeta = await sharp(squareLogo).metadata();

  const svgSquareBg = Buffer.from(`
    <svg width="${squareSize}" height="${squareSize}" viewBox="0 0 ${squareSize}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="amberGlowSq" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.2" />
          <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.04" />
          <stop offset="100%" stop-color="#040507" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="${squareSize}" height="${squareSize}" fill="#040507" />
      <circle cx="${squareSize / 2}" cy="${squareSize / 2}" r="260" fill="url(#amberGlowSq)" />
      <rect x="0" y="0" width="${squareSize}" height="2.5" fill="#f59e0b" opacity="0.8" />
      <rect x="0" y="${squareSize - 2.5}" width="${squareSize}" height="2.5" fill="#f59e0b" opacity="0.8" />
    </svg>
  `);

  await sharp(svgSquareBg)
    .composite([
      {
        input: squareLogo,
        left: Math.round((squareSize - squareLogoMeta.width) / 2),
        top: Math.round((squareSize - squareLogoMeta.height) / 2)
      }
    ])
    .png({ compressionLevel: 9, quality: 90 })
    .toFile('public/og-image-square.png');

  const stats = fs.statSync('public/og-image.png');
  const appStats = fs.statSync('app/opengraph-image.png');
  const squareStats = fs.statSync('public/og-image-square.png');

  console.log('✓ public/og-image.png size:', Math.round(stats.size / 1024), 'KB');
  console.log('✓ app/opengraph-image.png size:', Math.round(appStats.size / 1024), 'KB');
  console.log('✓ public/og-image-square.png size:', Math.round(squareStats.size / 1024), 'KB');
}

createOgImage().catch(console.error);
