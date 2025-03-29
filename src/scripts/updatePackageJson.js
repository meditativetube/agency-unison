
const fs = require('fs');
const path = require('path');

// Read the current package.json
const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get the repository info from package.json or from git config
let repoUrl = packageJson.repository ? 
  (typeof packageJson.repository === 'string' ? packageJson.repository : packageJson.repository.url) : 
  '';

// If no repo info in package.json, try to get it from git
if (!repoUrl) {
  try {
    const { execSync } = require('child_process');
    const gitRemote = execSync('git remote get-url origin').toString().trim();
    if (gitRemote) {
      repoUrl = gitRemote;
    }
  } catch (error) {
    console.warn('Could not detect git repository URL:', error.message);
  }
}

// Extract repo name for GitHub Pages
let homepage = packageJson.homepage || '';
if (!homepage && repoUrl) {
  // Extract username/repo from git URL
  const match = repoUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
  if (match) {
    const [, username, repo] = match;
    homepage = `https://${username}.github.io/${repo}`;
    console.log(`Detected GitHub Pages URL: ${homepage}`);
  }
}

// Add or update the required properties for GitHub Pages
packageJson.homepage = homepage || ".";
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.predeploy = "npm run build";
packageJson.scripts.deploy = "gh-pages -d dist";

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Updated package.json with GitHub Pages deployment configuration');
console.log(`Homepage set to: ${packageJson.homepage}`);

