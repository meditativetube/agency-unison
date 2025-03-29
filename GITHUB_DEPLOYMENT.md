
# Deploying to GitHub Pages

This document provides instructions for deploying this React application to GitHub Pages.

## Prerequisites

1. You need to have a GitHub account.
2. You need to have a repository for this project on GitHub.

## Deployment Steps

1. Make sure all your changes are committed and pushed to GitHub.

2. Run the script to update package.json for GitHub Pages deployment:
   ```
   node src/scripts/updatePackageJson.js
   ```

3. Deploy the application to GitHub Pages:
   ```
   npm run deploy
   ```

4. Wait for the deployment to complete. This might take a few minutes.

5. Visit your GitHub Pages URL to see your deployed application.
   - The URL format is typically: `https://[your-username].github.io/[repository-name]/`

## Notes

- The application uses HashRouter when deployed on GitHub Pages to handle client-side routing correctly.
- If you update your code, you need to run `npm run deploy` again to update the deployed version.
- Make sure your repository settings have GitHub Pages enabled and set to the gh-pages branch.
