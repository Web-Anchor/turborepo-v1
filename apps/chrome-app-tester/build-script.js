import fs, { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';

async function copyDirectory(srcDir, destDir) {
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
  await incPackageVersion('patch');
  await patchManifestVersion();
  await copyDir();
} catch (error) {
  console.error('Error copying content', error);
}

async function incPackageVersion(type = 'patch') {
  try {
    // update package version
    const packageJsonPath = resolve('package.json');
    console.log(`📦 Reading package.json from ${packageJsonPath}`);

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    console.log(`📦 Current package version: ${packageJson.version}`);

    const [major, minor, patch] = packageJson.version.split('.').map(Number);
    let newVersion = packageJson.version;

    switch (type) {
      case 'major':
        newVersion = `${major + 1}.0.0`;
        break;
      case 'minor':
        newVersion = `${major}.${minor + 1}.0`;
        break;
      case 'patch':
        newVersion = `${major}.${minor}.${patch + 1}`;
        break;
      default:
        throw new Error(`Invalid version type: ${type}`);
    }

    packageJson.version = newVersion;
    console.log(`📦 Updating package version to ${packageJson.version}`);

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n'
    );
  } catch (error) {
    console.error('Error updating package version', error);
  }
}

async function copyDir() {
  try {
    const srcDir = resolve('./workers'); // Adjust the source directory path as needed
    const destDir = resolve('./dist/workers');

    console.log(`🏋️‍♂️ Copying all content from ${srcDir} to ${destDir}`);

    copyDirectory(srcDir, destDir);

    console.log(`✨ Successfully copied all content to ${destDir}`);
  } catch (error) {
    console.error('Error copying content', error);
  }
}

async function patchManifestVersion() {
  // update manifest version
  const packageJsonPath = resolve('package.json');
  console.log(`📦 Reading package.json from ${packageJsonPath}`);

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  console.log(`📦 Current package version: ${packageJson.version}`);

  const manifestJsonPath = resolve('public/manifest.json');
  console.log(`📦 Reading manifest.json from ${manifestJsonPath}`);
  const manifestJson = JSON.parse(fs.readFileSync(manifestJsonPath, 'utf-8'));

  manifestJson.version = packageJson.version;
  console.log(`📦 Updating manifest version to ${manifestJson.version}`);

  fs.writeFileSync(
    manifestJsonPath,
    JSON.stringify(manifestJson, null, 2) + '\n'
  );
}
