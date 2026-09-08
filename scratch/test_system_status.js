const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== SYSTEM STATUS COMPONENT VALIDATION SUITE ===\n');

const htmlPath = path.join(__dirname, '..', 'index.html');
const cssPath = path.join(__dirname, '..', 'style.css');
const jsPath = path.join(__dirname, '..', 'script.js');
const termPath = path.join(__dirname, '..', 'terminal.js');
const palettePath = path.join(__dirname, '..', 'palette.js');

const html = fs.readFileSync(htmlPath, 'utf-8');
const css = fs.readFileSync(cssPath, 'utf-8');
const js = fs.readFileSync(jsPath, 'utf-8');
const term = fs.readFileSync(termPath, 'utf-8');
const palette = fs.readFileSync(palettePath, 'utf-8');

// 1. HTML Element & Structure
console.log('1. Verifying HTML Structure & Text Content...');
assert(html.includes('id="system-status-widget"'), 'Missing #system-status-widget in index.html');
assert(html.includes('SYSTEM STATUS'), 'Missing "SYSTEM STATUS" text in index.html');
assert(html.includes('ONLINE'), 'Missing "ONLINE" status badge in index.html');
assert(html.includes('PORTFOLIO'), 'Missing "PORTFOLIO" metric label in index.html');
assert(html.includes('OPERATIONAL'), 'Missing "OPERATIONAL" metric value in index.html');
assert(html.includes('PROJECTS'), 'Missing "PROJECTS" metric label in index.html');
assert(html.includes('ACTIVE'), 'Missing "ACTIVE" metric value in index.html');
assert(html.includes('API'), 'Missing "API" metric label in index.html');
assert(html.includes('CONNECTED'), 'Missing "CONNECTED" metric value in index.html');
assert(html.includes('BUILD'), 'Missing "BUILD" metric label in index.html');
assert(html.includes('STABLE'), 'Missing "STABLE" metric value in index.html');
console.log('   ✓ All required status lines present: SYSTEM STATUS, ONLINE, PORTFOLIO OPERATIONAL, PROJECTS ACTIVE, API CONNECTED, BUILD STABLE');

// 2. Static Portfolio Specification Disclaimer
console.log('\n2. Verifying Static Portfolio Specification Disclaimer...');
assert(html.includes('STATIC PORTFOLIO SPECIFICATION') || html.includes('static portfolio element'),
    'Missing visual portfolio disclaimer in HTML');
assert(term.includes('Static visual telemetry specification') || term.includes('visual portfolio element'),
    'Missing disclaimer in terminal.js status command');
console.log('   ✓ Transparently disclaimed as static portfolio specification rather than real backend monitoring');

// 3. CSS Styling and Animations
console.log('\n3. Verifying Terminal Theme CSS & Animations...');
assert(css.includes('.system-status-widget'), 'Missing .system-status-widget CSS styles');
assert(css.includes('.ssw-online-badge'), 'Missing .ssw-online-badge CSS styles');
assert(css.includes('.ssw-grid'), 'Missing .ssw-grid CSS styles');
assert(css.includes('.ssw-dots'), 'Missing .ssw-dots terminal dotted line styling');
assert(css.includes('sswRadarPulse') || css.includes('radarPulse') || css.includes('animation'), 'Missing animation in system status widget');
assert(css.includes('prefers-reduced-motion'), 'CSS missing prefers-reduced-motion handling');
console.log('   ✓ Glassmorphic terminal theme styling and subtle animations verified');

// 4. JS Upgraded SystemStatus with Session Uptime
console.log('\n4. Verifying JS SystemStatus Class...');
assert(js.includes('SystemStatus'), 'Missing SystemStatus class in script.js');
assert(js.includes('ssw-session-uptime'), 'Missing session uptime timer handling in script.js');
assert(js.includes('updateUptime') && js.includes('updateStatuses'), 'Missing updateUptime and updateStatuses methods in script.js');
console.log('   ✓ SystemStatus handles session uptime timer ticker and widget pulse synchronization');

// 5. Terminal.js Integration
console.log('\n5. Verifying terminal.js status command...');
assert(term.includes('status:'), 'Missing status command in terminal.js');
assert(term.includes('PORTFOLIO') && term.includes('OPERATIONAL'), 'terminal status command missing portfolio metrics');
assert(term.includes('PROJECTS') && term.includes('ACTIVE'), 'terminal status command missing projects metrics');
assert(term.includes('API') && term.includes('CONNECTED'), 'terminal status command missing api metrics');
assert(term.includes('BUILD') && term.includes('STABLE'), 'terminal status command missing build metrics');
console.log('   ✓ Terminal status command displays full formatted telemetry block with static disclaimer note');

// 6. Palette.js Integration
console.log('\n6. Verifying palette.js navigation...');
assert(palette.includes('nav-status'), 'Missing nav-status item in palette.js');
assert(palette.includes('#system-status-widget'), 'Missing anchor to #system-status-widget in palette.js');
console.log('   ✓ Command palette includes View System Status action pointing to widget');

console.log('\n>>> ALL SYSTEM STATUS TESTS PASSED SUCCESSFULLY! <<<\n');
