
const fs = require('fs');
const path = require('path');

// Read the current package.json
const packageJsonPath = path.join(__dirname, '../../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get the repository info from package.json or from git config
let repoUrl = packageJson.repository ? 
  (typeof packageJson.repository === 'string' ? packageJson.repository : packageJson.repository.url) : 
  '';

// If no repo info in package.json, try to get it from git with more verbose error handling
if (!repoUrl) {
  try {
    const { execSync } = require('child_process');
    console.log('Trying to detect git repository URL...');
    
    try {
      const gitRemote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
      if (gitRemote) {
        repoUrl = gitRemote;
        console.log(`Detected git repository URL: ${repoUrl}`);
      }
    } catch (gitError) {
      console.warn('Could not detect git repository URL from git remote:', gitError.message);
      
      // Try alternative method: check if there's a .git directory and parse config
      try {
        const gitConfigPath = path.join(__dirname, '../../.git/config');
        if (fs.existsSync(gitConfigPath)) {
          const gitConfig = fs.readFileSync(gitConfigPath, 'utf8');
          const urlMatch = gitConfig.match(/url\s*=\s*(.+)/i);
          if (urlMatch && urlMatch[1]) {
            repoUrl = urlMatch[1].trim();
            console.log(`Detected git repository URL from .git/config: ${repoUrl}`);
          }
        }
      } catch (configError) {
        console.warn('Could not detect git repository URL from .git/config:', configError.message);
      }
    }
  } catch (error) {
    console.warn('Error during git repository detection:', error.message);
  }
}

// Extract repo name for GitHub Pages with improved pattern matching
let homepage = packageJson.homepage || '';
if (!homepage && repoUrl) {
  console.log('Attempting to extract GitHub Pages URL from repository URL...');
  
  // Handle various Git URL formats (HTTPS, SSH, etc.)
  let match;
  
  // https://github.com/username/repo.git
  match = repoUrl.match(/github\.com[\/:]([^\/]+)\/([^\/\.]+)/);
  
  if (match) {
    const [, username, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, '');
    homepage = `https://${username}.github.io/${cleanRepo}`;
    console.log(`Detected GitHub Pages URL: ${homepage}`);
  } else {
    console.warn('Could not extract GitHub Pages URL from repository URL. Setting homepage to "."');
    homepage = ".";
  }
}

// Add or update the required properties for GitHub Pages
packageJson.homepage = homepage || ".";
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.predeploy = "npm run build";
packageJson.scripts.deploy = "gh-pages -d dist";

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('\nGitHub Pages configuration:');
console.log(`Homepage set to: ${packageJson.homepage}`);
console.log('Deploy script added: "npm run deploy"');
console.log('\nTo deploy your app to GitHub Pages:');
console.log('1. Run: npm run deploy');
console.log('2. Wait a few minutes for GitHub to build your site');
console.log('3. Visit your site at: ' + packageJson.homepage);
