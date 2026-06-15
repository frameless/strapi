#!/usr/bin/env node
/**
 * Checks whether the TranslatedEnumerationInput workaround in pdc-dashboard is still needed.
 *
 * Run this after every Strapi upgrade:
 *   node scripts/check-strapi-enum-workaround.mjs
 *
 * Exit codes:
 *   0 — workaround still needed, no action required
 *   1 — Strapi appears to have restored enum translation; workaround can likely be removed
 *   2 — could not locate or parse the file; manual inspection needed
 */

import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PNPM_STORE = join(ROOT, 'node_modules', '.pnpm');
const TARGET_SUFFIX = '/@strapi/content-manager/dist/admin/pages/EditView/components/InputRenderer.js';
const WORKAROUND_FILE = 'apps/pdc-dashboard/src/admin/extensions/TranslatedEnumerationInput.tsx';

// Locate the installed InputRenderer.js inside the pnpm content-addressable store.
let inputRendererPath;
try {
  const result = execSync(`find "${PNPM_STORE}" -path "*${TARGET_SUFFIX}" 2>/dev/null`, { encoding: 'utf-8' }).trim();
  inputRendererPath = result.split('\n')[0];
} catch {
  // execSync throws if the command itself fails (not just empty output)
}

if (!inputRendererPath) {
  console.error('ERROR: Could not find @strapi/content-manager InputRenderer.js under', PNPM_STORE);
  console.error('       Is @strapi/content-manager installed?');
  process.exit(2);
}

console.log('Checking:', inputRendererPath);

const source = readFileSync(inputRendererPath, 'utf-8');

// Isolate the enumeration case block. It ends at the next `case '` or `default:`.
const enumCaseMatch = source.match(/case 'enumeration':([\s\S]*?)(?=case '|default:)/);

if (!enumCaseMatch) {
  console.warn('WARNING: Could not isolate the enumeration case block.');
  console.warn('         Strapi may have restructured InputRenderer.js — inspect manually.');
  console.warn('         File:', inputRendererPath);
  process.exit(2);
}

const enumBlock = enumCaseMatch[1];
const hasTranslation = /formatMessage/.test(enumBlock);

if (hasTranslation) {
  console.log('');
  console.log('ACTION REQUIRED: Strapi has restored enum translation support.');
  console.log('The workaround can likely be removed. Steps:');
  console.log('  1. Delete', WORKAROUND_FILE);
  console.log('  2. Remove the addFields({ type: "enumeration", ... }) call in');
  console.log('     apps/pdc-dashboard/src/admin/app.ts');
  console.log('  3. Verify in the UI: open a Product with a logo button and confirm');
  console.log('     the Appearance dropdown still shows translated labels.');
  process.exit(1);
} else {
  console.log('OK: Strapi still omits translation for enum options — workaround still needed.');
  console.log('    No action required.');
  process.exit(0);
}
