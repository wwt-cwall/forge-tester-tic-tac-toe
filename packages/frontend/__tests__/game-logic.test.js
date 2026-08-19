// Changed by Forge v0.1.0
/**
 * Tests for Tic-Tac-Toe game logic
 */

// Helper function to check for winner
function checkWinner(board) {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: line };
    }
  }

  // Check for draw
  if (board.every(cell => cell !== null)) {
    return { winner: 'draw', winningLine: null };
  }

  return { winner: null, winningLine: null };
}

// Test cases
console.log('Running Tic-Tac-Toe game logic tests...\n');

let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    testsPassed++;
  } catch (error) {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${error.message}`);
    testsFailed++;
  }
}

function assertEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\n  Expected: ${JSON.stringify(expected)}\n  Actual: ${JSON.stringify(actual)}`);
  }
}

// Test horizontal wins
test('Detects horizontal win in top row', () => {
  const board = ['X', 'X', 'X', null, null, null, null, null, null];
  const result = checkWinner(board);
  assertEqual(result.winner, 'X', 'Should detect X wins');
  assertEqual(result.winningLine, [0, 1, 2], 'Should return correct winning line');
});

test('Detects horizontal win in middle row', () => {
  const board = [null, null, null, 'O', 'O', 'O', null, null, null];
  const result = checkWinner(board);
  assertEqual(result.winner, 'O', 'Should detect O wins');
  assertEqual(result.winningLine, [3, 4, 5], 'Should return correct winning line');
});

test('Detects horizontal win in bottom row', () => {
  const board = [null, null, null, null, null, null, 'X', 'X', 'X'];
  const result = checkWinner(board);
  assertEqual(result.winner, 'X', 'Should detect X wins');
  assertEqual(result.winningLine, [6, 7, 8], 'Should return correct winning line');
});

// Test vertical wins
test('Detects vertical win in left column', () => {
  const board = ['X', null, null, 'X', null, null, 'X', null, null];
  const result = checkWinner(board);
  assertEqual(result.winner, 'X', 'Should detect X wins');
  assertEqual(result.winningLine, [0, 3, 6], 'Should return correct winning line');
});

test('Detects vertical win in middle column', () => {
  const board = [null, 'O', null, null, 'O', null, null, 'O', null];
  const result = checkWinner(board);
  assertEqual(result.winner, 'O', 'Should detect O wins');
  assertEqual(result.winningLine, [1, 4, 7], 'Should return correct winning line');
});

test('Detects vertical win in right column', () => {
  const board = [null, null, 'X', null, null, 'X', null, null, 'X'];
  const result = checkWinner(board);
  assertEqual(result.winner, 'X', 'Should detect X wins');
  assertEqual(result.winningLine, [2, 5, 8], 'Should return correct winning line');
});

// Test diagonal wins
test('Detects diagonal win from top-left to bottom-right', () => {
  const board = ['O', null, null, null, 'O', null, null, null, 'O'];
  const result = checkWinner(board);
  assertEqual(result.winner, 'O', 'Should detect O wins');
  assertEqual(result.winningLine, [0, 4, 8], 'Should return correct winning line');
});

test('Detects diagonal win from top-right to bottom-left', () => {
  const board = [null, null, 'X', null, 'X', null, 'X', null, null];
  const result = checkWinner(board);
  assertEqual(result.winner, 'X', 'Should detect X wins');
  assertEqual(result.winningLine, [2, 4, 6], 'Should return correct winning line');
});

// Test draw
test('Detects draw when board is full with no winner', () => {
  const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
  const result = checkWinner(board);
  assertEqual(result.winner, 'draw', 'Should detect draw');
  assertEqual(result.winningLine, null, 'Should have no winning line');
});

// Test no winner yet
test('Returns null when game is not finished', () => {
  const board = ['X', 'O', null, null, 'X', null, null, null, null];
  const result = checkWinner(board);
  assertEqual(result.winner, null, 'Should return null for unfinished game');
  assertEqual(result.winningLine, null, 'Should have no winning line');
});

test('Returns null for empty board', () => {
  const board = [null, null, null, null, null, null, null, null, null];
  const result = checkWinner(board);
  assertEqual(result.winner, null, 'Should return null for empty board');
  assertEqual(result.winningLine, null, 'Should have no winning line');
});

// Summary
console.log(`\n${testsPassed} tests passed, ${testsFailed} tests failed`);

if (testsFailed > 0) {
  console.log('\nSome tests failed! ✗');
  process.exit(1);
} else {
  console.log('\nAll game logic tests passed! ✓');
  process.exit(0);
}
