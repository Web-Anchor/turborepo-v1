// tailwind config is required for editor support

import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    './src/app/**/*.tsx',
    '../../packages/**/*.{ts,tsx}', // 🚧 to specify package dir
  ],
  presets: [sharedConfig],
};

export default config;
