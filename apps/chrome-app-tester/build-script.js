import { copyFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

try {
  const src = resolve('./workers/background.js'); // Adjust the source path as needed
  const dest = resolve('./dist/workers/background.js');
  console.log(`🏋️‍♂️ Copying manifest.json from ${src} to ${dest}`);
  // create a new directory in the dist folder workers
  mkdirSync(resolve('./dist/workers'), { recursive: true });

  copyFileSync(src, dest);

  console.log(`✨ Copied manifest.json to dist folder`);
} catch (error) {
  console.error('Error copying manifest.json', error);
}
