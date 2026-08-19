// Changed by Forge v0.1.0
'use client';

import { useUser } from './contexts/UserContext';
import DisplayNamePrompt from './components/DisplayNamePrompt';

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
          
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Tic-Tac-Toe
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Play tic-tac-toe with your friends online. Game features coming soon!
            </p>
          </div>
          
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <button
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
              disabled
            >
              Start Game
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
