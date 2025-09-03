import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = join(__dirname, '../dist');

import * as acorn from "acorn";

/**
 * Fix common invalid syntax issues that creep into bundled JS.
 * - Converts stray HTML-style comments into valid JS comments
 * - Handles spacing and multiline safely
 * - Optionally decodes &lt; and &gt; entities
 */
const fixJavaScriptSyntax = (content, { decodeEntities = false } = {}) => {
  let fixed = content;

  // 1. Fix malformed HTML comments like < !-- ... -->
  fixed = fixed.replace(/<\s*!--([\s\S]*?)-->/g, (_, inner) => {
    return `/* ${inner.trim()} */`;
  });

  // 2. Convert proper <!-- ... --> comments
  // Use block comments instead of // to safely handle multi-line
  fixed = fixed.replace(/<!--([\s\S]*?)-->/g, (_, inner) => {
    return `/* ${inner.trim()} */`;
  });

  // 3. Decode HTML entities only if requested
  if (decodeEntities) {
    fixed = fixed.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }

  // 4. Validate with Acorn (throws if still invalid)
  try {
    acorn.parse(fixed, { ecmaVersion: "latest", sourceType: "module" });
  } catch (err) {
    console.error("❌ Still invalid after fix:", err.message);
    throw err;
  }

  return fixed;
};


const removeFile = async () => {
  try {
    const filePath = join(distDir, 'editoria11y.esm.js');
    await fs.unlink(filePath);
    console.log('🗑️ Removed old bundle:', filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('ℹ️ File does not exist, nothing to remove.');
    } else {
      console.error('❌ Error removing file:', err);
    }
  }
};

/**
 * Replace a pattern in the input string, or throw if not found.
 */
const requestReplace = (input, pattern, replacement, description = 'pattern') => {
  const regex = typeof pattern === 'string' ? new RegExp(pattern, 'g') : pattern;
  const result = input.replace(regex, replacement);

  if (result === input) {
    throw new Error(`❌ Could not find ${description}`);
  }

  return result;
}
// Add nonce modifications
const addNonceSupport = (content) => {
  // Flexible patterns to handle spaces/newlines/minified code
  content = requestReplace(
    content,
    /customTests\s*:\s*0\s*,[\s\S]*?};/,
    `customTests: 0,

  nonce: false,

};`,
    'customTests block'
  );

  content = requestReplace(
    content,
    /Ed11y\.attachCSS\s*=\s*function\s*\(appendTo\)\s*{[\s\S]*?};/,
    `Ed11y.attachCSS = function(appendTo) {
  const bundle = cssBundle.cloneNode(true);
  if (Ed11y.options.nonce) {
    bundle.querySelectorAll('link').forEach(link => {
      link.setAttribute('nonce', Ed11y.options.nonce);
    });
  }
  appendTo.appendChild(bundle);
};`,
    'attachCSS function'
  );

  return content;
}

const buildBundle = async (files) => {
  return files.reduce(async (bundlePromise, file) => {
    const bundle = await bundlePromise; // wait for previous iteration
    const filePath = join(__dirname, '../js', file);

    try {
      await fs.access(filePath);
      let content = await fs.readFile(filePath, 'utf8');
      // Apply fixes to all files
      content = fixJavaScriptSyntax(content);
      if (file === 'ed11y.js') {
        content = addNonceSupport(content);
      }

      return bundle + content + '\n';
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log(`⚠️ Skipping missing file: ${filePath}`);
        return bundle;
      } else {
        console.error(`❌ Error processing ${filePath}:`, err);
        return bundle;
      }
    }
  }, Promise.resolve('')); // start with an empty bundle
};

const writeFiles = async (esmBundle) => {
  try {
    const esmPath = join(distDir, 'editoria11y.esm.js');
    await fs.writeFile(esmPath, esmBundle, 'utf8');
    console.log('✅ Wrote JS bundle:', esmPath);

    const cssSrcPath = join(distDir, 'editoria11y.min.css');
    const cssDestPath = join(distDir, 'editoria11y.css');
    await fs.copyFile(cssSrcPath, cssDestPath);
    console.log('✅ Copied CSS to:', cssDestPath);
  } catch (err) {
    console.error('❌ Error writing files:', err);
  }
};

const buildESM = async () => {
  await removeFile();

  const files = [
    'ed11y-localization.js',
    'ed11y-test-embeds.js',
    'ed11y-test-headings.js',
    'ed11y-test-images.js',
    'ed11y-test-links.js',
    'ed11y-test-text.js',
    'ed11y.js',
    'ed11y-element-alt.js',
    'ed11y-element-panel.js',
    'ed11y-element-result.js',
    'ed11y-element-tip.js',
  ];

  const jsBundle = await buildBundle(files);

  const esmBundle = `${jsBundle}

export default Ed11y;
export { Ed11y };
`;
  await writeFiles(esmBundle);

  console.log('🎉 Build complete with nonce support and syntax fixes');
  console.log('   - Original files unchanged');
  console.log('   - Generated: dist/editoria11y.esm.js');
  console.log('   - Generated: dist/editoria11y.css');
};

await buildESM();
