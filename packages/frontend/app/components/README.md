<!-- Changed by Forge v0.1.0 -->
# Components

This directory contains React components for the Tic Tac Toe application.

## TicTacToeCanvas

The main game component that implements a fully functional Tic Tac Toe game.

### Features

- **Canvas Rendering**: Game board rendered on HTML5 canvas with visual X's and O's
- **Turn-Based Gameplay**: Human player (X) alternates with bot opponent (O)
- **Bot AI**: Strategic opponent that:
  - Takes winning moves when available
  - Blocks player from winning
  - Prefers center and corner positions
  - Provides challenging but beatable gameplay
- **Sound Effects**: Plays click sound when any space is claimed
- **Interactive**: Click any empty cell to place your mark
- **Win Detection**: Checks all 8 winning combinations (3 rows, 3 columns, 2 diagonals)
- **Draw Detection**: Recognizes when board is full with no winner
- **Responsive**: Adapts canvas size to screen dimensions

### Implementation Details

#### Game Logic

The component implements classic Tic Tac Toe rules with:
- 3x3 grid (9 cells, indexed 0-8)
- Win conditions: Three in a row horizontally, vertically, or diagonally
- Draw condition: All cells filled with no winner
- Turn alternation: Player always goes first as X

#### Bot AI Algorithm

The bot uses a priority-based strategy:

1. **Win**: If bot can complete three in a row, take that move
2. **Block**: If player can win next turn, block them
3. **Center**: Take center position (index 4) if available
4. **Corners**: Take any available corner (indices 0, 2, 6, 8)
5. **Any**: Take any remaining available space

This creates a challenging opponent that's difficult but not impossible to beat.

#### Sound System

- Audio file: `/click-sound.wav` (generated WAV file)
- Volume: 30% to avoid being jarring
- Trigger: Plays on every move (player or bot)
- Error handling: Catches and logs autoplay restrictions

#### Canvas Rendering

The game board is drawn using Canvas 2D API:
- Grid lines: Dark gray (#374151), 3px width
- X marks: Red (#ef4444), diagonal crosses with rounded caps
- O marks: Blue (#3b82f6), circles with rounded caps
- Padding: 20% inside each cell for visual clarity
- Responsive: Canvas scales to fit screen (max 450x450px)

### Usage

```tsx
import TicTacToeCanvas from './components/TicTacToeCanvas';

export default function GamePage() {
  return (
    <div>
      <TicTacToeCanvas />
    </div>
  );
}
```

### State Management

The component uses React hooks for state:

- `gameState`: Current board, player turn, game status, winner
- `canvasSize`: Responsive canvas dimensions
- `canvasRef`: Reference to canvas element for drawing
- `audioRef`: Reference to audio element for sound effects

### Key Functions

- `checkWinner(board)`: Returns winning player ('X' or 'O') or null
- `isBoardFull(board)`: Returns true if all cells are occupied
- `getBotMove(board)`: Returns optimal move index for bot
- `makeMove(index, player)`: Updates board and game state
- `playSound()`: Plays click sound effect
- `resetGame()`: Resets to initial empty board state

### Testing

Unit tests are located in `__tests__/ticTacToe.test.js` and cover:
- Winner detection for all 8 winning combinations
- Board full detection
- Draw game scenarios
- Empty board state
- Winning combinations structure

Run tests with:
```bash
npm test --workspace=packages/frontend
```

## DisplayNamePrompt

A modal component that prompts users to enter their display name on first visit.

### Features

- Session storage persistence
- Input validation (3-20 characters)
- Modal overlay with backdrop
- Responsive design

See `docs/specs/features/display-name.md` for full specification.
