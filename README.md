# Spike-Multi-Environment-Deployment-01

This is a spike project to explore and describe how to set up a CI/CD pipeline for a frontend application deployed to Cloudflare Workers, which supports multiple environments (`dev`, `uat`, `pp`, `prod`), using GitHub Actions, releases, and Git tags. 

## Deployments 

- `dev`: [spike-multi-env-deployment-01.<strong>apps-dev</strong>.hortfrancis.dev](https://spike-multi-env-deployment-01.apps-dev.hortfrancis.dev/)
- `uat`: [spike-multi-env-deployment-01.<strong>apps-uat</strong>.hortfrancis.dev](https://spike-multi-env-deployment-01.apps-uat.hortfrancis.dev/)
- `pp`: [spike-multi-env-deployment-01.<strong>apps-pp</strong>.hortfrancis.dev](https://spike-multi-env-deployment-01.apps-pp.hortfrancis.dev/)
- `prod`: [spike-multi-env-deployment-01.<strong>apps</strong>.hortfrancis.dev](https://spike-multi-env-deployment-01.apps.hortfrancis.dev/)

## Tour 

- GitHub Actions workflows: 
  - [`deploy`](.github/workflows/deploy.yaml): Handles deployment to all environments based on Git tags and branch pushes
  - [`prepare-release`](.github/workflows/prepare-release.yaml): Prepares a release by creating a release branch, bumping version, and creating a PR to `main`
- Cloudflare Workers configuration:
  - [`wrangler.jsonc`](wrangler.jsonc): Configures the Cloudflare Workers deployment per environment (including deployment URLs)
- Version management:
  - 'Package' version is found in [`package.json`](package.json) and is used for release versioning
    - This is automatically bumped by the `prepare-release` workflow when preparing a production release -- which means it reflects the most recent `prod` release version
- [`App.tsx`](src/App.tsx): Basic React app to display explanatory text and environment variable values

## Environments 

- `dev` (development): Automatically deploys on every push to `main`
- `uat` (user acceptance testing): Deploys when a tag with `-uat` suffix is created (e.g. `v1.0.0-uat`)
- `pp` (pre-production): Deploys when a tag with `-pp` suffix is created (e.g. `v1.0.0-pp`)
- `prod` (production): Deploys when a tag without suffix is created (e.g. `v1.0.0`)

## Release workflows

- Deploy to `dev` on every push to `main`
- When ready for `uat` release, create a new release with a tag like `v1.0.0-uat` to trigger deployment to `uat` enviroment  
- When ready for `pp` release, create a new release with a tag like `v1.0.0-pp` to trigger deployment to `pp` environment 
- Finally, when ready for `prod` release, manually trigger the `prepare-release` GitHuv Actions workflow
  - This will create a `release/` branch: `release/<intended release version>` (e.g.: `release/1.2.3`)
    - The workflow will also bump the version in `package.json` to the intended release version (e.g.: `1.2.3`) and commit the change to the `release/` branch
    - The workflow will then create a pull request from the `release/` branch to `main` (with instructions on next steps)
  - After merging the PR, create a release with the tag `v1.2.3` to trigger deployment to production

## Tech stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Deployment**: Cloudflare Workers (Static Assets)
- **CI/CD**: GitHub Actions
- **Version Management**: npm version + Git tags

## Local development

### Prerequisites

- Node.js 22+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/spike-multi-env-deployment-01.git
cd spike-multi-env-deployment-01

# Install dependencies
npm install

# Run dev server (simulates dev environment)
npm run dev

# Run UAT mode locally
npm run uat
```

## 🔧 Configuration

### GitHub Secrets Required

Add these secrets to your GitHub repository settings:

- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Workers deploy permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

### Environment Configuration

Each environment is configured in [`wrangler.jsonc`](wrangler.jsonc) with custom domains and routes. The deployment URLs are configured here. 

### GitHub Actions permissions

Go to your repository's "Settings" > "Actions" > "General" and ensure that the workflow permissions are set to "Read and write permissions" to allow the workflows to create branches, commit changes, and create pull requests as needed for the release process.

### Set up GitHub environments (optional)

You can also set up GitHub Environments for `dev`, `uat`, `pp`, and `prod` in your repository settings. This allows you to add environment-specific secrets and protection rules if needed.

Note: The `deploy` workflow is set to use GitHub environments, so you may get an error if you haven't set these up..
