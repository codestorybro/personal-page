import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const chunksDir = join(process.cwd(), '.next/static/chunks');
const marker = '"trimStart"in String.prototype';

const findBodyEnd = (source, openIndex) => {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === '"' || char === '\'' || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
};

let strippedFiles = 0;

for (const fileName of readdirSync(chunksDir)) {
  if (!fileName.endsWith('.js') || fileName.startsWith('polyfills-')) {
    continue;
  }

  const filePath = join(chunksDir, fileName);
  const source = readFileSync(filePath, 'utf8');
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    continue;
  }

  const openIndex = source.lastIndexOf('{', markerIndex);
  const closeIndex = findBodyEnd(source, openIndex);

  if (openIndex === -1 || closeIndex === -1) {
    throw new Error(`Could not strip Next.js modern polyfills from ${fileName}`);
  }

  const stripped = `${source.slice(0, openIndex + 1)}${source.slice(closeIndex)}`;
  writeFileSync(filePath, stripped);
  strippedFiles += 1;
}

if (strippedFiles > 0) {
  console.log(`Stripped Next.js modern polyfills from ${strippedFiles} chunk(s).`);
}
