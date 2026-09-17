import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const publicDir = path.resolve('public');
const scriptsDir = path.resolve('scripts');

if (!fs.existsSync(edgePath)) {
  console.error(`Edge executable not found at: ${edgePath}`);
  process.exit(1);
}

// 1. The Stable Flow Loop Emblem SVG component for icons
function renderLoopEmblem({ size, scale = 1, bgSolid = '#F8F5EE', showBorder = false }) {
  // Center is 256, 256 for a 512x512 base coordinate system
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}" style="display:block;">
      <defs>
        <linearGradient id="g-terracotta" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8C431D" />
          <stop offset="100%" stop-color="#723414" />
        </linearGradient>
        <linearGradient id="g-amber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#D97706" />
          <stop offset="100%" stop-color="#B45309" />
        </linearGradient>
        <filter id="g-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#1C1917" flood-opacity="0.09" />
        </filter>
      </defs>

      <!-- Full solid background bleed -->
      <rect width="512" height="512" fill="${bgSolid}" />
      ${showBorder ? `<rect x="4" y="4" width="504" height="504" rx="96" fill="none" stroke="#E2DDD3" stroke-width="8" />` : ''}

      <g transform="translate(${256 * (1 - scale)}, ${256 * (1 - scale)}) scale(${scale})" filter="url(#g-shadow)">
        <!-- Vertical Architectural Pillar -->
        <rect x="238" y="96" width="36" height="320" rx="18" fill="url(#g-terracotta)" />
        <line x1="256" y1="120" x2="256" y2="392" stroke="#F8F5EE" stroke-opacity="0.3" stroke-width="4" stroke-linecap="round" />

        <!-- Continuous Liquidity Flow Loop: Left -->
        <path d="M 256 256 C 200 180 106 180 106 256 C 106 332 200 332 256 256" 
              fill="none" 
              stroke="url(#g-terracotta)" 
              stroke-width="32" 
              stroke-linecap="round" 
              stroke-linejoin="round" />

        <!-- Continuous Liquidity Flow Loop: Right -->
        <path d="M 256 256 C 312 180 406 180 406 256 C 406 332 312 332 256 256" 
              fill="none" 
              stroke="url(#g-terracotta)" 
              stroke-width="32" 
              stroke-linecap="round" 
              stroke-linejoin="round" />

        <!-- Accents -->
        <circle cx="156" cy="218" r="6" fill="#F8F5EE" fill-opacity="0.85" />
        <circle cx="356" cy="294" r="6" fill="#F8F5EE" fill-opacity="0.85" />

        <!-- Center Weave Depth Overlap -->
        <rect x="242" y="234" width="28" height="44" rx="14" fill="#723414" />

        <!-- Discipline Anchor Node (Stoic 24-Hour Cooling Lock) -->
        <circle cx="256" cy="256" r="30" fill="url(#g-amber)" stroke="#F8F5EE" stroke-width="5" />
        <circle cx="256" cy="256" r="15" fill="#FEF9C3" />
        <circle cx="256" cy="256" r="5" fill="#B45309" />
      </g>
    </svg>
  `;
}

// 2. Render targets configuration
const targets = [
  {
    filename: 'icon-192.png',
    width: 192,
    height: 192,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 192px; height: 192px; background: #F8F5EE; overflow: hidden; }
  </style>
</head>
<body>
  ${renderLoopEmblem({ size: 192, scale: 0.85, bgSolid: '#F8F5EE', showBorder: true })}
</body>
</html>`
  },
  {
    filename: 'icon-512.png',
    width: 512,
    height: 512,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 512px; height: 512px; background: #F8F5EE; overflow: hidden; }
  </style>
</head>
<body>
  ${renderLoopEmblem({ size: 512, scale: 0.88, bgSolid: '#F8F5EE', showBorder: true })}
</body>
</html>`
  },
  {
    filename: 'apple-touch-icon.png',
    width: 180,
    height: 180,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 180px; height: 180px; background: #F8F5EE; overflow: hidden; }
  </style>
</head>
<body>
  <!-- Solid #F8F5EE background without transparency, content padded to prevent iOS squircle clip -->
  ${renderLoopEmblem({ size: 180, scale: 0.80, bgSolid: '#F8F5EE', showBorder: false })}
</body>
</html>`
  },
  {
    filename: 'icon-maskable.png',
    width: 512,
    height: 512,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 512px; height: 512px; background: #F8F5EE; overflow: hidden; }
  </style>
</head>
<body>
  <!-- Strictly within 80% inner circle (384px diameter safe zone) with solid #F8F5EE background bleed -->
  ${renderLoopEmblem({ size: 512, scale: 0.72, bgSolid: '#F8F5EE', showBorder: false })}
</body>
</html>`
  },
  {
    filename: 'og-image.png',
    width: 1200,
    height: 630,
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 1200px;
      height: 630px;
      background-color: #F8F5EE;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 60px 72px;
      border: 1px solid #E2DDD3;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .brand-title {
      font-size: 52px;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #8C431D;
      line-height: 1;
    }

    .badge {
      display: inline-block;
      background: #F1ECE2;
      border: 1px solid #C4BCAC;
      color: #B45309;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding: 6px 14px;
      border-radius: 9999px;
      text-transform: uppercase;
    }

    .main-body {
      margin-top: 20px;
    }

    .tagline-ar {
      font-size: 38px;
      font-weight: 800;
      color: #1C1917;
      direction: rtl;
      text-align: right;
      line-height: 1.35;
      margin-bottom: 12px;
    }

    .tagline-en {
      font-size: 24px;
      font-weight: 600;
      color: #57534E;
      letter-spacing: -0.01em;
      line-height: 1.3;
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-top: 36px;
    }

    .pillar-card {
      background: #FFFFFF;
      border: 1px solid #E2DDD3;
      border-radius: 16px;
      padding: 16px 20px;
      box-shadow: 0 4px 8px rgba(28, 25, 23, 0.04);
    }

    .pillar-label {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #B45309;
      margin-bottom: 4px;
    }

    .pillar-title {
      font-size: 15px;
      font-weight: 700;
      color: #1C1917;
      line-height: 1.3;
    }

    .pillar-ar {
      font-size: 13px;
      font-weight: 600;
      color: #6B645C;
      direction: rtl;
      margin-top: 4px;
    }

    .footer-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #E2DDD3;
      padding-top: 20px;
      font-size: 15px;
      font-weight: 600;
      color: #6B645C;
    }

    .url-chip {
      color: #8C431D;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
  </style>
</head>
<body>
  <div class="top-bar">
    <div class="brand-group">
      ${renderLoopEmblem({ size: 84, scale: 0.95, bgSolid: 'transparent', showBorder: false })}
      <div>
        <div class="brand-title">Flowbel</div>
      </div>
    </div>
    <div class="badge">Local-First PWA | Egypt</div>
  </div>

  <div class="main-body">
    <div class="tagline-ar">دليلك العملي للمال وأصول التعامل في الشارع</div>
    <div class="tagline-en">Your practical guide to money and real-world street smarts</div>

    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-label">Envelope Budget</div>
        <div class="pillar-title">4-Week Payday Cycle</div>
        <div class="pillar-ar">مظاريف الأسابيع الأربعة</div>
      </div>
      <div class="pillar-card">
        <div class="pillar-label">Impulse Guardrail</div>
        <div class="pillar-title">24-Hour Cooling Lock</div>
        <div class="pillar-ar">قفل التهدئة لكسر النبض</div>
      </div>
      <div class="pillar-card">
        <div class="pillar-label">Street Protocols</div>
        <div class="pillar-title">Egyptian Life Playbooks</div>
        <div class="pillar-ar">أدلة المعاملات والشارع</div>
      </div>
      <div class="pillar-card">
        <div class="pillar-label">100% Privacy</div>
        <div class="pillar-title">On-Device IndexedDB</div>
        <div class="pillar-ar">بياناتك على جهازك فقط</div>
      </div>
    </div>
  </div>

  <div class="footer-bar">
    <div>Zero tracking. Zero ads. Built for students and young professionals.</div>
    <div class="url-chip">https://flowbel.vercel.app</div>
  </div>
</body>
</html>`
  }
];

console.log(`Starting generation of ${targets.length} raster assets using Microsoft Edge headless...`);

for (const target of targets) {
  const tempHtmlPath = path.join(scriptsDir, `temp-${target.filename}.html`);
  const outputPath = path.join(publicDir, target.filename);

  fs.writeFileSync(tempHtmlPath, target.html, 'utf-8');

  try {
    execFileSync(edgePath, [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${target.width},${target.height}`,
      `--screenshot=${outputPath}`,
      `file://${tempHtmlPath}`
    ]);

    const stat = fs.statSync(outputPath);
    console.log(`[SUCCESS] Generated ${target.filename} (${target.width}x${target.height}) - ${stat.size} bytes`);
  } catch (err) {
    console.error(`[ERROR] Failed generating ${target.filename}:`, err);
  } finally {
    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }
  }
}

console.log('Raster asset generation complete.');
