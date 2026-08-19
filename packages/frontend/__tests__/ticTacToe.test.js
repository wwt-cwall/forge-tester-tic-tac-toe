// Changed by Forge v0.1.0
/**
 * Tests for Tic Tac Toe game logic
 */

let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  try {
    fn();
    testsPassed++;
    console.log(`✓ ${name}`);
  } catch (error) {
    testsFailed++;
    console.log(`✗ ${name}`);
    console.error(error.message);
  }
}

function expect(value) {
  return {
    toBe(expected) {
      if (value !== expected) {
        throw new Error(`Expected ${expected} but got ${value}`);
      }
    },
    toEqual(expected) {
      if (JSON.stringify(value) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(value)}`);
      }
    },
    toBeTruthy() {
      if (!value) {
        throw new Error('Expected value to be truthy');
      }
    },
    toBeFalsy() {
      if (value) {
        throw new Error('Expected value to be falsy');
      }
    },
    toBeNull() {
      if (value !== null) {
        throw new Error('Expected value to be null');
      }
    }
  };
}

// Winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Check for winner function
function checkWinner(board) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Check if board is full
function isBoardFull(board) {
  return board.every(cell => cell !== null);
}

// Run tests
test('empty board has no winner', () => {
  const board = Array(9).fill(null);
  expect(checkWinner(board)).toBeNull();
});

test('horizontal win - top row', () => {
  const board = ['X', 'X', 'X', null, null, null, null, null, null];
  expect(checkWinner(board)).toBe('X');
});

test('horizontal win - middle row', () => {
  const board = [null, null, null, 'O', 'O', 'O', null, null, null];
  expect(checkWinner(board)).toBe('O');
});

test('horizontal win - bottom row', () => {
  const board = [null, null, null, null, null, null, 'X', 'X', 'X'];
  expect(checkWinner(board)).toBe('X');
});

test('vertical win - left column', () => {
  const board = ['X', null, null, 'X', null, null, 'X', null, null];
  expect(checkWinner(board)).toBe('X');
});

test('vertical win - middle column', () => {
  const board = [null, 'O', null, null, 'O', null, null, 'O', null];
  expect(checkWinner(board)).toBe('O');
});

test('vertical win - right column', () => {
  const board = [null, null, 'X', null, null, 'X', null, null, 'X'];
  expect(checkWinner(board)).toBe('X');
});

test('diagonal win - top-left to bottom-right', () => {
  const board = ['X', null, null, null, 'X', null, null, null, 'X'];
  expect(checkWinner(board)).toBe('X');
});

test('diagonal win - top-right to bottom-left', () => {
  const board = [null, null, 'O', null, 'O', null, 'O', null, null];
  expect(checkWinner(board)).toBe('O');
});

test('no winner with incomplete board', () => {
  const board = ['X', 'O', 'X', null, null, null, null, null, null];
  expect(checkWinner(board)).toBeNull();
});

test('no winner in a draw', () => {
  const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
  expect(checkWinner(board)).toBeNull();
});

test('board is not full when empty', () => {
  const board = Array(9).fill(null);
  expect(isBoardFull(board)).toBeFalsy();
});

test('board is not full with some moves', () => {
  const board = ['X', 'O', null, null, null, null, null, null, null];
  expect(isBoardFull(board)).toBeFalsy();
});

test('board is full when all cells occupied', () => {
  const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
  expect(isBoardFull(board)).toBeTruthy();
});

test('winning combinations count', () => {
  expect(WINNING_COMBINATIONS.length).toBe(8);
});

test('each winning combination has 3 positions', () => {
  for (const combo of WINNING_COMBINATIONS) {
    expect(combo.length).toBe(3);
  }
});

test('no duplicate winning combinations', () => {
  const uniqueCombos = new Set(WINNING_COMBINATIONS.map(c => c.join(',')));
  expect(uniqueCombos.size).toBe(WINNING_COMBINATIONS.length);
});

// Summary
console.log(`\n${testsPassed} tests passed, ${testsFailed} tests failed\n`);

if (testsFailed > 0) {
  process.exit(1);
}

console.log('Tic Tac Toe game logic tests passed! ✓');
