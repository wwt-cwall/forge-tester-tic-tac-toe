// Changed by Forge v0.1.0
'use client';

import { useUser } from './contexts/UserContext';
import DisplayNamePrompt from './components/DisplayNamePrompt';
import TicTacToe from './components/TicTacToe';

export default function Home() {
  const { displayName, clearDisplayName } = useUser();

  return (
    <>
      <DisplayNamePrompt />
      <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black font-sans p-8">
        <main className="flex flex-col items-center justify-center">
          {displayName && (
            <div className="mb-8 flex items-center justify-between w-full max-w-md">
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Welcome,</p>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {displayName}
                </h2>
              </div>
              <button
                onClick={clearDisplayName}
                className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                Change Name
              </button>
            </div>
          )}
          <TicTacToe />
        </main>
      </div>
    </>
  );
}
