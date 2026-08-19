<!-- Changed by Forge v0.1.0 -->
# Tic Tac Toe Game

## Overview

A web-based Tic Tac Toe game where a player competes against a bot opponent. The game is rendered on an HTML5 canvas and features turn-based gameplay with visual and audio feedback.

## Implementation Details

### Game Logic

The game implements classic Tic Tac Toe rules:

- **Board**: 3x3 grid with 9 cells
- **Players**: Human player (X) vs Bot opponent (O)
- **Turn-based**: Players alternate turns, human always goes first
- **Win conditions**: Three in a row (horizontal, vertical, or diagonal)
- **Draw condition**: All cells filled with no winner

#### Winning Combinations

The game checks 8 possible winning combinations:
- 3 horizontal rows: [0,1,2], [3,4,5], [6,7,8]
- 3 vertical columns: [0,3,6], [1,4,7], [2,5,8]
- 2 diagonals: [0,4,8], [2,4,6]

### Bot Opponent

The bot uses a strategic AI algorithm with the following priority:

1. **Win**: If the bot can win on this turn, it takes that move
2. **Block**: If the player can win on their next turn, the bot blocks them
3. **Center**: If the center cell (position 4) is available, take it
4. **Corners**: Take an available corner (positions 0, 2, 6, 8)
5. **Any**: Take any remaining available cell

The bot's move is delayed by 500ms to provide a more natural gameplay experience.

### Canvas Rendering

The game is rendered on an HTML5 canvas element:

- **Grid**: Dark gray lines forming a 3x3 grid
- **X marks**: Red diagonal crosses with rounded line caps
- **O marks**: Blue circles with rounded line caps
- **Responsive**: Canvas size adapts to screen size (max 450px)
- **Padding**: 20% padding inside each cell for visual clarity

### Sound Effects

When a player or bot claims a space:
- A click sound (`/click-sound.wav`) plays at 30% volume
- Sound is generated using the Web Audio API
- Playback errors are caught and logged (for browsers that block autoplay)

### User Interface

#### Game Status Display
- Shows current turn: "Your turn (X)" or "Bot's turn (O)..."
- Shows game result: "You won! 🎉", "Bot won! 🤖", or "It's a draw! 🤝"

#### Interactive Canvas
- Clickable cells for player moves
- Cursor changes to pointer on hover
- Clicks are only processed during player's turn
- Invalid moves (occupied cells, game over) are ignored

#### New Game Button
- Resets the board to empty state
- Resets to player's turn (X)
- Clears game status

#### Instructions
- Help text below the game: "Click on any empty square to place your X. The bot will automatically play as O."

## User Experience

### Starting a Game
1. Page loads with an empty 3x3 grid
2. Status shows "Your turn (X)"
3. Player clicks any cell to make their first move

### During Gameplay
1. Player clicks an empty cell
2. Click sound plays
3. X appears in the clicked cell
4. Status changes to "Bot's turn (O)..."
5. After 500ms, bot makes its move
6. Click sound plays
7. O appears in bot's chosen cell
8. Status returns to "Your turn (X)"
9. Repeat until game ends

### Game End
1. When three in a row is achieved or board is full:
   - Status updates with result
   - Board remains interactive but moves are ignored
2. Player clicks "New Game" to start over

## Edge Cases

### Invalid Moves
- Clicking an occupied cell: Ignored, no action taken
- Clicking during bot's turn: Ignored, no action taken
- Clicking after game ends: Ignored, no action taken

### Audio
- Browser blocks autoplay: Error is caught and logged, game continues without sound
- Audio file missing: Error is caught and logged, game continues without sound

### Responsive Design
- Small screens: Canvas scales down to fit (minimum handled by CSS)
- Large screens: Canvas caps at 450x450 pixels
- Window resize: Canvas size updates dynamically

## Testing

### Unit Tests
Located in `packages/frontend/__tests__/ticTacToe.test.js`:
- Winner detection for all 8 winning combinations
- Board full detection
- Draw game detection
- Empty board state
- Winning combinations structure validation

### Manual Testing
1. **Clickability**: Click each cell to verify it accepts moves
2. **Turn-based**: Verify player and bot alternate turns
3. **Sound**: Listen for click sound on each move
4. **Win detection**: Create three in a row and verify win message
5. **Draw detection**: Fill board without winner and verify draw message
6. **Bot AI**: Verify bot blocks player wins and takes winning moves
7. **New Game**: Verify reset button clears board and restarts game

## Technical Implementation

### Component: `TicTacToeCanvas.tsx`

**State Management:**
- `gameState`: Tracks board, current player, status, and winner
- `canvasSize`: Responsive canvas dimensions

**Key Functions:**
- `checkWinner(board)`: Returns winning player or null
- `isBoardFull(board)`: Returns true if no empty cells
- `getBotMove(board)`: Returns optimal move index for bot
- `makeMove(index, player)`: Updates board and game state
- `playSound()`: Plays click sound effect
- `resetGame()`: Resets to initial state

**Effects:**
- Audio initialization on mount
- Responsive sizing on window resize
- Canvas rendering on board changes
- Bot move trigger on bot's turn

**Event Handlers:**
- `handleCanvasClick`: Processes player clicks and validates moves

### Dependencies
- React hooks: `useState`, `useEffect`, `useRef`, `useCallback`
- Next.js: Client-side rendering with `'use client'` directive
- Web Audio API: For sound playback
- HTML5 Canvas API: For game rendering

## Future Enhancements

Potential improvements for future iterations:
- Multiplayer mode (two human players)
- Difficulty levels for bot AI
- Score tracking across multiple games
- Animation for winning line
- Different themes/color schemes
- Touch gesture support for mobile
- Accessibility improvements (keyboard navigation, screen reader support)
