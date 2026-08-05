# Changelog

One line per pull request, newest first, each ending in the pull request number.
CI checks for it: a pull request whose number is not in this file fails
`npm run test:ci`, so the entry can only be written once the pull request exists.

- Add uptimeSeconds field to GET /health endpoint to distinguish deploys from restarts (#6)
- Document the HTTP API and check it against the router in CI (#0)
