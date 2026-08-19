<!-- Changed by Forge v0.1.0 -->
# GitHub Actions Workflow for Playwright Tests

This file contains the GitHub Actions workflow configuration for running Playwright E2E tests in CI/CD.

**Note**: This workflow file requires the `workflow` scope permission to be added to the repository. It should be added manually by a repository administrator.

## Workflow File

Create `.github/workflows/playwright.yml` with the following content:

```yaml
name: Playwright E2E Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  workflow_dispatch:

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps chromium
    
    - name: Run Playwright tests
      run: npm run test:e2e
    
    - name: Upload test results
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
    
    - name: Upload video recordings
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-videos
        path: test-results/
        retention-days: 30
```

## Features

This workflow:
- ✅ Runs on push to `main` or `develop` branches
- ✅ Runs on pull requests
- ✅ Can be triggered manually
- ✅ Installs dependencies and Playwright browsers
- ✅ Runs all E2E tests
- ✅ Uploads HTML test report as artifact
- ✅ Uploads video recordings as artifact
- ✅ Retains artifacts for 30 days

## Viewing Results

After the workflow runs:

1. Go to the **Actions** tab in GitHub
2. Click on the workflow run
3. Scroll to **Artifacts** section
4. Download:
   - `playwright-report` - HTML test report
   - `playwright-videos` - Video recordings of all tests

## Manual Installation

To add this workflow:

1. Create the directory:
   ```bash
   mkdir -p .github/workflows
   ```

2. Create the file:
   ```bash
   touch .github/workflows/playwright.yml
   ```

3. Copy the YAML content above into the file

4. Commit and push:
   ```bash
   git add .github/workflows/playwright.yml
   git commit -m "Add Playwright CI workflow"
   git push
   ```

## Alternative: Local CI Simulation

To test the workflow locally before adding it to GitHub:

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps chromium

# Run tests
npm run test:e2e

# Check results
npm run test:e2e:report
```

## Troubleshooting

### Workflow Fails to Install Browsers

If the workflow fails during browser installation:

```yaml
- name: Install Playwright Browsers
  run: npx playwright install chromium  # Remove --with-deps
```

### Workflow Times Out

If tests take too long:

```yaml
jobs:
  test:
    timeout-minutes: 120  # Increase from 60 to 120
```

### Out of Memory

If the workflow runs out of memory:

```yaml
- name: Run Playwright tests
  run: npm run test:e2e
  env:
    NODE_OPTIONS: --max-old-space-size=4096
```

## See Also

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Documentation](https://playwright.dev/docs/ci)
- [GitHub Actions Artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)
