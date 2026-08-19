// Changed by Forge v0.1.0
import TicTacToe from './components/TicTacToe';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black font-sans p-8">
      <main className="flex flex-col items-center justify-center">
        <TicTacToe />
      </main>
    </div>
  );
}
