/**
 * Formats a win percentage for display.
 * 
 * @param wins - Number of wins
 * @param total - Total number of games
 * @returns Formatted percentage string (e.g., "66.7%")
 * 
 * @example
 * formatWinPercentage(2, 3) // "66.7%"
 * formatWinPercentage(1, 2) // "50.0%"
 * formatWinPercentage(0, 0) // "0.0%"
 */
export function formatWinPercentage(wins: number, total: number): string {
  if (total === 0) {
    return "0.0%";
  }
  
  const percentage = (wins / total) * 100;
  return `${percentage.toFixed(1)}%`;
}
