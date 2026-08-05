#!/usr/bin/env node
/**
 * Checks that only run in CI.
 *
 * These are the ones too slow or too repository-wide to sit in a package's own
 * test script, so they run once per push instead of on every `npm test`. Right
 * now there is one: the backend's routes and `docs/api.md` have to agree, so the
 * documentation cannot quietly fall behind the server.
 */
const { readFileSync } = require('fs');
const { join } = require('path');

if (!process.env.CI) {
  console.log('Not CI — skipping. Set CI=1 to run these locally.');
  process.exit(0);
}

const root = join(__dirname, '..');
const server = readFileSync(join(root, 'packages/backend/src/index.js'), 'utf8');
const docs = readFileSync(join(root, 'docs/api.md'), 'utf8');

/* Every path the router answers on, as the router spells it. */
const routes = [...server.matchAll(/req\.url === '([^']+)'/g)].map((match) => match[1]);
const undocumented = routes.filter((route) => !docs.includes(`\`${route}\``));

console.log(`Routes the backend serves: ${routes.join(', ')}`);

if (undocumented.length > 0) {
  console.error(
    `\nThese routes are not in docs/api.md: ${undocumented.join(', ')}\n` +
      'Add a section for each one — path, method, and what it answers with — and this check passes.'
  );
  process.exit(1);
}

console.log('Every route is documented.');
