// Changed by Forge v0.1.0
'use client';

import { useUser } from './contexts/UserContext';
import DisplayNamePrompt from './components/DisplayNamePrompt';
import TicTacToeCanvas from './components/TicTacToeCanvas';

export default function Home() {
  const { displayName, clearDisplayName } = useUser();

  return (
    <>
      <DisplayNamePrompt />
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div className="w-full">
            {displayName && (
              <div className="mb-8 flex items-center justify-between">
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
          </div>
          
          <div className="w-full flex justify-center">
            <TicTacToeCanvas />
          </div>
        </main>
      </div>
    </>
  );
}
