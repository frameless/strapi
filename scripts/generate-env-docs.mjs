import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .envsrc.json relative to this script
const envJsonPath = path.resolve(__dirname, '..', '.envrc.json');

if (!fs.existsSync(envJsonPath)) {
  process.exit(0);
}

const envJson = JSON.parse(fs.readFileSync(envJsonPath, 'utf8'));

// Markdown table header
const header = `## Environment Variables\n\n| Name | Value Type | Required | Secret | Description | Example | Default (Dev) |\n|------|------------|----------|--------|-------------|---------|----------------|\n`;
const escapePipes = (str) => String(str || '').replace(/\|/g, '\\|');

// Generate table rows
const rows = (envJson.spec || [])
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(
    (varObj) =>
      `| \`${varObj.name}\` | ${escapePipes(varObj.valueType)} | ${varObj.required ? '✅' : ''} | ${
        varObj.secret ? '✅' : ''
      } | ${escapePipes(varObj.description)} | \`${varObj.example || ''}\` | \`${varObj.developmentDefault || ''}\` |`,
  )
  .join('\n');

const output = header + rows + '\n';

// Output paths (absolute)
const outputPaths = [
  path.resolve(__dirname, '..', 'ENVIRONMENT_VARIABLES.md'),
  path.resolve(__dirname, '..', 'apps', 'strapi.frameless.io', 'docs', 'developers', 'ENVIRONMENT_VARIABLES.md'),
];

outputPaths.forEach((filePath) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true }); // ensure folder exists
  fs.writeFileSync(filePath, output, 'utf8');
});

// eslint-disable-next-line no-undef
console.log('✅ Environment variables table generated successfully.');
