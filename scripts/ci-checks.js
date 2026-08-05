#!/usr/bin/env node
/**
 * Checks that only run in CI.
 *
 * These are the ones too repository-wide to sit in a package's own test script,
 * so they run once per push instead of on every `npm test`:
 *
 *   1. the backend's routes and `docs/api.md` have to agree;
 *   2. a pull request has to have a line in `docs/CHANGELOG.md` carrying its
 *      number — which is only knowable after the pull request is opened.
 */
const { readFileSync } = require('fs');
const { join } = require('path');

if (!process.env.CI) {
  console.log('Not CI — skipping. Set CI=1 to run these locally.');
  process.exit(0);
}

const root = join(__dirname, '..');
const read = (path) => readFileSync(join(root, path), 'utf8');
const failures = [];

/* Every route the backend answers on has to be in docs/api.md. */
const routes = [...read('packages/backend/src/index.js').matchAll(/req\.url === '([^']+)'/g)].map(
  (match) => match[1]
);
const api = read('docs/api.md');
const undocumented = routes.filter((route) => !api.includes(`\`${route}\``));

console.log(`Routes the backend serves: ${routes.join(', ')}`);
if (undocumented.length > 0) {
  failures.push(
    `These routes are not in docs/api.md: ${undocumented.join(', ')}. Add a section for each ` +
      'one — path, method, and what it answers with.'
  );
} else {
  console.log('Every route is documented.');
}

/* A pull request has to name itself in docs/CHANGELOG.md. */
const pullRequest = (process.env.GITHUB_REF || '').match(/^refs\/pull\/(\d+)\//);
if (pullRequest) {
  const number = pullRequest[1];
  console.log(`Pull request #${number} — looking for its line in docs/CHANGELOG.md`);
  if (!read('docs/CHANGELOG.md').includes(`(#${number})`)) {
    failures.push(
      `docs/CHANGELOG.md has no line for this pull request. Add one at the top of the list, ` +
        `describing the change in a sentence and ending in "(#${number})", then push again.`
    );
  } else {
    console.log('The changelog names it.');
  }
}

if (failures.length > 0) {
  console.error(`\n${failures.join('\n\n')}`);
  process.exit(1);
}
console.log('\nAll CI-only checks passed.');
