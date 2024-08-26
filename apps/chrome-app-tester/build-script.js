import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';

function copyDirectory(srcDir, destDir) {
  // Ensure the destination directory exists
  mkdirSync(destDir, { recursive: true });

  // Read all files and directories in the source directory
  const entries = readdirSync(srcDir);

  for (const entry of entries) {
    const srcPath = join(srcDir, entry);
    const destPath = join(destDir, entry);

    // Check if the current entry is a directory or a file
    if (statSync(srcPath).isDirectory()) {
      // If it's a directory, recursively copy it
      copyDirectory(srcPath, destPath);
    } else {
      // If it's a file, copy it to the destination directory
      console.log(`🏋️‍♂️ Copying ${srcPath} to ${destPath}`);
      copyFileSync(srcPath, destPath);
    }
  }
}

try {
  const srcDir = resolve('./workers'); // Adjust the source directory path as needed
  const destDir = resolve('./dist/workers');

  console.log(`🏋️‍♂️ Copying all content from ${srcDir} to ${destDir}`);

  copyDirectory(srcDir, destDir);

  console.log(`✨ Successfully copied all content to ${destDir}`);
} catch (error) {
  console.error('Error copying content', error);
}
