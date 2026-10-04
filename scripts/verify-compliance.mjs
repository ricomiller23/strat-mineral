import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🛡️  [STRAT-MINERAL STANDING RULES GUARD] Running pre-build validation...');

// 1. DATASET INTEGRITY (Rule 1)
const dataPath = path.join(rootDir, 'data', 'minerals.json');
if (!fs.existsSync(dataPath)) {
  console.error('❌ FATAL [Rule 1]: data/minerals.json missing!');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 2. RECEIPT ASSERTIONS (Rule 4 & 5)
let totalMinerals = 0;
for (const m of data.minerals) {
  totalMinerals++;
  if (!m.source_url || !m.source_url.startsWith('http')) {
    console.error(`❌ [Rule 4] Mineral ${m.name} lacks authoritative source_url!`);
    process.exit(1);
  }
  if (!m.retrieved_at) {
    console.error(`❌ [Rule 4] Mineral ${m.name} lacks retrieved_at timestamp!`);
    process.exit(1);
  }
}

let totalChokepoints = 0;
for (const cp of data.chokepoints) {
  totalChokepoints++;
  if (!cp.source_url || !cp.source_url.startsWith('http')) {
    console.error(`❌ [Rule 4] Chokepoint ${cp.name} lacks authoritative source_url!`);
    process.exit(1);
  }
  if (!cp.retrieved_at) {
    console.error(`❌ [Rule 4] Chokepoint ${cp.name} lacks retrieved_at timestamp!`);
    process.exit(1);
  }
}

let totalPlatforms = 0;
for (const p of data.defense_platforms) {
  totalPlatforms++;
  if (!p.source_url || !p.source_url.startsWith('http')) {
    console.error(`❌ [Rule 4] Defense platform ${p.name} lacks authoritative source_url!`);
    process.exit(1);
  }
  if (!p.retrieved_at) {
    console.error(`❌ [Rule 4] Defense platform ${p.name} lacks retrieved_at timestamp!`);
    process.exit(1);
  }
}

let totalInitiatives = 0;
for (const init of data.stockpile_initiatives) {
  totalInitiatives++;
  if (!init.source_url || !init.source_url.startsWith('http')) {
    console.error(`❌ [Rule 4] Initiative ${init.project_name} lacks authoritative source_url!`);
    process.exit(1);
  }
  if (!init.retrieved_at) {
    console.error(`❌ [Rule 4] Initiative ${init.project_name} lacks retrieved_at timestamp!`);
    process.exit(1);
  }
}

console.log(`  ✓ Receipts Verified: ${totalMinerals} minerals, ${totalChokepoints} chokepoints, ${totalPlatforms} defense platforms, ${totalInitiatives} stockpile projects with primary receipts.`);

// 3. BANNED WORDS AUDIT (Rule 9 & 11)
const BANNED_WORDS = [
  'verified', 'certified', '100%', 'zero', 'complete', 'exhaustive', 'audited', 'parity', 'accurate'
];

let bannedCount = 0;

function checkFile(fullPath) {
  const code = fs.readFileSync(fullPath, 'utf8');
  for (const w of BANNED_WORDS) {
    const regex = new RegExp(`\\b${w}\\b`, 'i');
    if (regex.test(code)) {
      console.error(`❌ [Rule 9/11] Banned word "${w}" found in: ${path.relative(rootDir, fullPath)}`);
      bannedCount++;
    }
  }
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        scanDir(fullPath);
      }
    } else if (/\.(tsx|ts|jsx|js|html)$/.test(entry.name)) {
      if (fullPath.includes('scripts/verify-compliance') || fullPath.includes('scripts/verify-live-site')) continue;
      checkFile(fullPath);
    }
  }
}

scanDir(path.join(rootDir, 'src'));
if (fs.existsSync(path.join(rootDir, 'index.html'))) {
  checkFile(path.join(rootDir, 'index.html'));
}

if (bannedCount > 0) {
  console.error(`❌ [Rule 9/11 FAILED] ${bannedCount} banned marketing words detected! Replace with computed counts.`);
  process.exit(1);
}
console.log('  ✓ Rule 9 Banned Words: Zero unearned marketing claims in UI text.');

console.log('🎉 [STANDING RULES AUDIT PASSED] Strat-Mineral data layer compliant.');
process.exit(0);
