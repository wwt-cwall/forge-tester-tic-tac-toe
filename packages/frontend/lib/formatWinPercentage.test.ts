import { describe, it } from 'node:test';
import assert from 'node:assert';
import { formatWinPercentage } from './formatWinPercentage';

describe('formatWinPercentage', () => {
  it('should format a simple win percentage', () => {
    const result = formatWinPercentage(1, 2);
    assert.strictEqual(result, '50.0%');
  });

  it('should format 66.7% correctly', () => {
    const result = formatWinPercentage(2, 3);
    assert.strictEqual(result, '66.7%');
  });

  it('should format 100% win rate', () => {
    const result = formatWinPercentage(10, 10);
    assert.strictEqual(result, '100.0%');
  });

  it('should format 0% win rate', () => {
    const result = formatWinPercentage(0, 10);
    assert.strictEqual(result, '0.0%');
  });

  it('should handle zero total games', () => {
    const result = formatWinPercentage(0, 0);
    assert.strictEqual(result, '0.0%');
  });

  it('should round to one decimal place', () => {
    const result = formatWinPercentage(1, 3);
    assert.strictEqual(result, '33.3%');
  });

  it('should handle fractional percentages', () => {
    const result = formatWinPercentage(5, 7);
    assert.strictEqual(result, '71.4%');
  });

  it('should handle large numbers', () => {
    const result = formatWinPercentage(999, 1000);
    assert.strictEqual(result, '99.9%');
  });

  it('should handle very small percentages', () => {
    const result = formatWinPercentage(1, 1000);
    assert.strictEqual(result, '0.1%');
  });
});
