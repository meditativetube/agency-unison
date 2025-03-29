
# Deploying to GitHub Pages

This document provides instructions for deploying this React application to GitHub Pages.

## Prerequisites

1. You need to have a GitHub account.
2. You need to have a repository for this project on GitHub.
3. Make sure `gh-pages` package is installed (it's already installed in this project).

## Deployment Steps

1. Make sure all your changes are committed and pushed to GitHub.

2. Run the script to update package.json for GitHub Pages deployment:
   ```
   node src/scripts/updatePackageJson.js
   ```
   This script will automatically detect your GitHub repository and configure the correct homepage URL.

3. Deploy the application to GitHub Pages:
   ```
   npm run deploy
   ```

4. Wait for the deployment to complete. This might take a few minutes.

5. Visit your GitHub Pages URL to see your deployed application.
   - The URL format is typically: `https://[your-username].github.io/[repository-name]/`

## Custom Domain Configuration

If you want to use a custom domain with GitHub Pages:

1. Go to your repository on GitHub.
2. Navigate to Settings > Pages.
3. Under "Custom domain", enter your domain name and click "Save".
4. Add a CNAME file to your project's public directory containing your custom domain:
   ```
   echo "yourdomain.com" > public/CNAME
   ```
5. Deploy your application again:
   ```
   npm run deploy
   ```

6. Set up DNS records with your domain provider:
   - For an apex domain (e.g., example.com), create 4 A records pointing to GitHub's IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - For a subdomain (e.g., www.example.com), create a CNAME record pointing to your GitHub Pages URL.

7. Wait for DNS changes to propagate (can take up to 24 hours).

## Troubleshooting

1. **Blank Page on GitHub Pages**: If your deployed site shows a blank page, check your browser console for errors. It's likely a routing issue. Make sure you're using HashRouter for GitHub Pages deployments (already configured in this app).

2. **404 Errors**: If you're getting 404 errors on your GitHub Pages site, check:
   - The repository settings to ensure GitHub Pages is enabled and set to the gh-pages branch
   - That your homepage in package.json is correctly set
   - That your routes are properly configured with HashRouter

3. **Custom Domain Not Working**: If your custom domain isn't working:
   - Check your DNS configuration with your domain provider
   - Verify that the CNAME file exists in your built application
   - Make sure your repository settings have the custom domain configured

Remember that changes to your GitHub Pages settings or DNS records may take some time to propagate.
