# HTTP API

Everything the backend (`packages/backend/src/index.js`) answers on. A route that is not
listed here fails CI: `npm run test:ci` reads the router and this file and requires them to
agree, so the documentation cannot fall behind the server.

## `/health` — GET

Whether the backend is up.

```json
{ "status": "ok", "message": "Tic-tac-toe backend is running" }
```

## `/api/board` — GET

Returns the current board state as a nine-element array and whose turn it is.

```json
{
  "board": [null, null, null, null, null, null, null, null, null],
  "whoseTurn": "X"
}
```

The `board` array represents the 3x3 grid in row-major order (indices 0-2 are the top row,
3-5 are the middle row, 6-8 are the bottom row). Each cell is `null` for empty, `"X"` for
player X, or `"O"` for player O.

The `whoseTurn` field indicates which player should move next: `"X"` or `"O"`.

## `/api/game` — GET

Placeholder for the game endpoint.

```json
{ "message": "Game API endpoint" }
```

Anything else answers `404` with `{ "error": "Not found" }`.
