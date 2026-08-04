# Backend

Node.js HTTP server for the tic-tac-toe game API.

## API Endpoints

### Health Check

Check if the server is running.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "message": "Tic-tac-toe backend is running"
}
```

**Status Code:** `200 OK`

### Game API

Game API endpoint (placeholder for future game logic).

**Endpoint:** `GET /api/game`

**Response:**
```json
{
  "message": "Game API endpoint"
}
```

**Status Code:** `200 OK`

### Error Handling

Unknown routes return a 404 error:

**Response:**
```json
{
  "error": "Not found"
}
```

**Status Code:** `404 Not Found`

Server errors return a 500 error:

**Response:**
```json
{
  "error": "Internal server error"
}
```

**Status Code:** `500 Internal Server Error`

## Development

Start the development server:

```bash
npm run dev
```

The server will start on port 3001 (or the port specified in the `PORT` environment variable).

## Testing

Run the test suite:

```bash
npm run test
```

The test suite includes:
- Health endpoint validation
- Game API endpoint validation
- 404 error handling
- Response format validation
- Content-Type header validation

## Project Structure

```
backend/
├── src/
│   └── index.js          # Main server file with route handlers
├── __tests__/
│   └── index.test.js     # Test suite
└── package.json
```

## Code Organization

The server code is organized into:

- **Route handlers**: Individual functions for each endpoint
- **Request router**: Central routing logic with error handling
- **Server creation**: HTTP server setup and export for testing
