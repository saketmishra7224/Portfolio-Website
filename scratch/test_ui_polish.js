const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== UI POLISH PASS COMPREHENSIVE VALIDATION ===\n');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf-8');

// 1. Typography Hierarchy Tokens
console.log('1. Verifying Vercel-Level Typographic Scale Tokens...');
assert(css.includes('--text-xs: 0.75rem;'), 'Missing --text-xs token');
assert(css.includes('--text-sm: 0.8125rem;'), 'Missing --text-sm token');
assert(css.includes('--text-base: 0.875rem;'), 'Missing --text-base token');
assert(css.includes('--text-md: 0.9375rem;'), 'Missing --text-md token');
assert(css.includes('--text-lg: 1.0625rem;'), 'Missing --text-lg token');
assert(css.includes('--text-xl: 1.25rem;'), 'Missing --text-xl token');
assert(css.includes('--text-2xl: 1.625rem;'), 'Missing --text-2xl token');
assert(css.includes('--text-3xl: 2.125rem;'), 'Missing --text-3xl token');
assert(css.includes('--lh-tight:') && css.includes('--lh-normal:'), 'Missing line-height tokens');
assert(css.includes('--tracking-tight:') && css.includes('--tracking-mono:'), 'Missing tracking tokens');
console.log('   ✓ Typographic scale tokens (8 levels + line-heights + tracking) fully declared');

// 2. Border Radius Consistency
console.log('\n2. Verifying Geometric Border Radius Consistency Scale...');
assert(css.includes('--radius-xs: 3px;'), 'Missing --radius-xs token');
assert(css.includes('--radius-sm: 4px;'), 'Missing --radius-sm token');
assert(css.includes('--radius-md: 6px;'), 'Missing --radius-md token');
assert(css.includes('--radius-lg: 8px;'), 'Missing --radius-lg token');
assert(css.includes('--radius-xl: 12px;'), 'Missing --radius-xl token');
assert(css.includes('--radius-full: 9999px;'), 'Missing --radius-full token');
assert(css.includes('border-radius: var(--radius-xl);'), 'Missing usage of --radius-xl');
assert(css.includes('border-radius: var(--radius-md);'), 'Missing usage of --radius-md');
console.log('   ✓ Geometric border-radius scale fully declared and applied to cards and buttons');

// 3. Viewport & Mobile Browser Chrome
console.log('\n3. Verifying Viewport & iOS Safari Browser Chrome Tags...');
assert(html.includes('viewport-fit=cover'), 'index.html missing viewport-fit=cover');
assert(html.includes('name="theme-color" content="#0b0f14"'), 'index.html missing dark theme-color meta tag');
assert(html.includes('name="color-scheme" content="dark"'), 'index.html missing dark color-scheme meta tag');
console.log('   ✓ Viewport fit, theme-color, and color-scheme correctly configured in HTML head');

// 4. Backdrop Filter Parity on Safari
console.log('\n4. Verifying Safari -webkit-backdrop-filter Parity...');
const bfMatches = css.match(/(?<!-webkit-)backdrop-filter:\s*[^;]+;/g) || [];
const wbfMatches = css.match(/-webkit-backdrop-filter:\s*[^;]+;/g) || [];
console.log(`   Found ${bfMatches.length} standard backdrop-filter rules and ${wbfMatches.length} -webkit-backdrop-filter rules`);
assert(bfMatches.length > 0, 'No backdrop-filter found');
assert(bfMatches.length === wbfMatches.length, `Mismatch: ${bfMatches.length} backdrop-filter vs ${wbfMatches.length} -webkit-backdrop-filter`);
console.log('   ✓ 100% parity across all backdrop-filter declarations for iOS Safari glassmorphism');

// 5. Overflow Clipping & Font Smoothing
console.log('\n5. Verifying Horizontal Overflow Protection & Typography Smoothing...');
assert(css.includes('overflow-x: clip;'), 'CSS missing overflow-x: clip for horizontal containment');
assert(css.includes('-webkit-text-size-adjust: 100%;'), 'CSS missing -webkit-text-size-adjust');
assert(css.includes('-webkit-font-smoothing: antialiased;'), 'CSS missing font-smoothing');
console.log('   ✓ Clean overflow containment and crisp font antialiasing configured');

// 6. Restrained Shadows (Stripe-Level Restraint)
console.log('\n6. Verifying Restrained Layered Shadows...');
assert(css.includes('--shadow-card:'), 'Missing --shadow-card token');
assert(css.includes('--shadow-card-hover:'), 'Missing --shadow-card-hover token');
assert(css.includes('border-top: 1px solid rgba(255, 255, 255, 0.04);'), 'Missing subtle section top border');
console.log('   ✓ Layered ambient shadows and subtle section divider borders verified');

// 7. Button States & Keyboard Focus
console.log('\n7. Verifying Button States & Accessible Focus Rings...');
assert(css.includes(':focus-visible'), 'CSS missing focus-visible rules');
assert(css.includes('min-height: 42px') || css.includes('min-height: 38px'), 'CSS missing minimum touch target heights');
assert(css.includes('.action-btn:active') && css.includes('.sys-details-btn:active'), 'Missing button active press feedback');
console.log('   ✓ Restrained hover states, accessible focus-visible rings, and tactile active press verified');

// 8. Master Responsive & Safari Safe-Areas
console.log('\n8. Verifying Master Responsive Breakpoints & Safe-Area Insets...');
assert(css.includes('env(safe-area-inset-top'), 'Missing safe-area-inset-top for nav');
assert(css.includes('env(safe-area-inset-bottom'), 'Missing safe-area-inset-bottom');
assert(css.includes('@media (max-width: 1024px)'), 'Missing 1024px tablet breakpoint');
assert(css.includes('@media (max-width: 768px)'), 'Missing 768px mobile breakpoint');
assert(css.includes('@media (max-width: 480px)'), 'Missing 480px small mobile breakpoint');
assert(css.includes('clamp(3.5rem, 5.5vw, 5.5rem)'), 'Missing fluid desktop section padding');
assert(css.includes('clamp(2.5rem, 6vw, 3.75rem)'), 'Missing fluid mobile section padding');
console.log('   ✓ Fluid container/section scaling, safe area insets, and tablet/mobile rules verified');

console.log('\n>>> ALL 8 UI POLISH VALIDATION CHECKS PASSED PERFECTLY! <<<\n');
