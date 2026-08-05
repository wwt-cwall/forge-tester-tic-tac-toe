# HTTP API

Everything the backend (`packages/backend/src/index.js`) answers on. A route that is not
listed here fails CI: `npm run test:ci` reads the router and this file and requires them to
agree, so the documentation cannot fall behind the server.

## `/health` — GET

Whether the backend is up.

```json
{ "status": "ok", "message": "Tic-tac-toe backend is running" }
```

## `/api/game` — GET

Placeholder for the game endpoint.

```json
{ "message": "Game API endpoint" }
```

Anything else answers `404` with `{ "error": "Not found" }`.
