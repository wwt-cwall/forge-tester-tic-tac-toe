import Rankings from "./components/Rankings";

export default function Home() {
  // Sample data for demonstration
  const samplePlayers = [
    { name: "Alice", wins: 8, losses: 2, draws: 0 },
    { name: "Bob", wins: 5, losses: 3, draws: 2 },
    { name: "Charlie", wins: 2, losses: 3, draws: 0 },
    { name: "Diana", wins: 6, losses: 3, draws: 0 },
  ];

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen py-8">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center px-4">
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          Tic Tac Toe
        </h1>
        <Rankings players={samplePlayers} />
      </main>
    </div>
  );
}
