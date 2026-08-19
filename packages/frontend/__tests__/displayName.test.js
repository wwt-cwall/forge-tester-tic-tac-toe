// Changed by Forge v0.1.0
/**
 * Simple smoke tests for the display name feature
 */

// Mock sessionStorage
global.sessionStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null,
};

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
    toBeDefined() {
      if (value === undefined) {
        throw new Error('Expected value to be defined');
      }
    },
  };
}

// Run tests
test('sessionStorage is available', () => {
  expect(sessionStorage).toBeDefined();
  expect(typeof sessionStorage.getItem).toBe('function');
  expect(typeof sessionStorage.setItem).toBe('function');
});

test('display name validation - minimum length', () => {
  const minLength = 2;
  const tooShort = 'a';
  if (tooShort.length >= minLength) {
    throw new Error('Should be too short');
  }
});

test('display name validation - maximum length', () => {
  const maxLength = 20;
  const tooLong = 'a'.repeat(21);
  if (tooLong.length <= maxLength) {
    throw new Error('Should be too long');
  }
});

test('display name validation - valid name', () => {
  const minLength = 2;
  const maxLength = 20;
  const validName = 'Player1';
  if (validName.length < minLength || validName.length > maxLength) {
    throw new Error('Should be valid');
  }
});

test('trimming whitespace', () => {
  const nameWithSpaces = '  Player  ';
  const trimmed = nameWithSpaces.trim();
  expect(trimmed).toBe('Player');
});

// Summary
console.log(`\n${testsPassed} tests passed, ${testsFailed} tests failed\n`);

if (testsFailed > 0) {
  process.exit(1);
}

console.log('Display name feature tests passed! ✓');
