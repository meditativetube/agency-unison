
const fs = require('fs');
const path = require('path');

// Read the current package.json
const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add or update the required properties for GitHub Pages
packageJson.homepage = packageJson.homepage || ".";
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.predeploy = "npm run build";
packageJson.scripts.deploy = "gh-pages -d dist";

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Updated package.json with GitHub Pages deployment configuration');
