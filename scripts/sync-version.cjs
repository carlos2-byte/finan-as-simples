#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to build.gradle
const gradlePath = path.join(__dirname, '..', 'android', 'app', 'build.gradle');
// Output path for version.ts
const outputPath = path.join(__dirname, '..', 'src', 'lib', 'version.ts');

function extractVersion() {
  try {
    // Read build.gradle
    const gradleContent = fs.readFileSync(gradlePath, 'utf8');

    // Find versionName "X.X.X"
    const versionMatch = gradleContent.match(/versionName\s+"([^"]+)"/);

    if (!versionMatch) {
      console.warn('Warning: versionName not found in build.gradle, using default 1.0.0');
      return '1.0.0';
    }

    const version = versionMatch[1];
    console.log(`Extracted version: ${version}`);
    return version;
  } catch (error) {
    console.warn('Warning: Could not read build.gradle, using default 1.0.0');
    console.warn(error.message);
    return '1.0.0';
  }
}

function generateVersionFile(version) {
  const content = `// Auto-generated file - do not edit manually
// Generated from android/app/build.gradle versionName
export const APP_VERSION = '${version}';
`;

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`Generated ${outputPath}`);
}

function main() {
  const version = extractVersion();
  generateVersionFile(version);
}

if (require.main === module) {
  main();
}

module.exports = { extractVersion, generateVersionFile };