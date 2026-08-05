import { formatWinPercentage } from '@/lib/formatWinPercentage';

interface Player {
  name: string;
  wins: number;
  losses: number;
  draws: number;
}

interface RankingsProps {
  players: Player[];
}

export default function Rankings({ players }: RankingsProps) {
  // Sort players by win percentage (descending)
  const sortedPlayers = [...players].sort((a, b) => {
    const totalA = a.wins + a.losses + a.draws;
    const totalB = b.wins + b.losses + b.draws;
    const percentA = totalA > 0 ? (a.wins / totalA) * 100 : 0;
    const percentB = totalB > 0 ? (b.wins / totalB) * 100 : 0;
    return percentB - percentA;
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
        Player Rankings
      </h2>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Player
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Win %
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Record
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {sortedPlayers.map((player, index) => {
              const totalGames = player.wins + player.losses + player.draws;
              return (
                <tr key={player.name} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {player.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                    {formatWinPercentage(player.wins, totalGames)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                    {player.wins}W - {player.losses}L - {player.draws}D
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
