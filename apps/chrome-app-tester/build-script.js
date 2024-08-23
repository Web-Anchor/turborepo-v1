import { copyFileSync } from 'fs';
import { resolve } from 'path';

const src = resolve('./manifest.json'); // Adjust the source path as needed
const dest = resolve('dist/manifest.json');
console.log(`🏋️‍♂️ Copying manifest.json from ${src} to ${dest}`);

copyFileSync(src, dest);

console.log(`✨ Copied manifest.json to dist folder`);
