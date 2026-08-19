// Changed by Forge v0.1.0
'use client';

import { useEffect, useRef, useState } from 'react';

type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[];

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  winningLine: number[] | null;
}

export default function TicTacToe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    winningLine: null,
  });

  const CANVAS_SIZE = 450;
  const CELL_SIZE = CANVAS_SIZE / 3;
  const LINE_WIDTH = 4;
  const MARK_PADDING = 40;

  // Check for winner
  const checkWinner = (board: Board): { winner: Player | 'draw' | null; winningLine: number[] | null } => {
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal top-left to bottom-right
      [2, 4, 6], // diagonal top-right to bottom-left
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], winningLine: line };
      }
    }

    // Check for draw
    if (board.every(cell => cell !== null)) {
      return { winner: 'draw', winningLine: null };
    }

    return { winner: null, winningLine: null };
  };

  // Draw the game board
  const drawBoard = (ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid lines
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = LINE_WIDTH;

    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(CELL_SIZE, 0);
    ctx.lineTo(CELL_SIZE, CANVAS_SIZE);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(CELL_SIZE * 2, 0);
    ctx.lineTo(CELL_SIZE * 2, CANVAS_SIZE);
    ctx.stroke();

    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, CELL_SIZE);
    ctx.lineTo(CANVAS_SIZE, CELL_SIZE);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, CELL_SIZE * 2);
    ctx.lineTo(CANVAS_SIZE, CELL_SIZE * 2);
    ctx.stroke();
  };

  // Draw X mark
  const drawX = (ctx: CanvasRenderingContext2D, row: number, col: number) => {
    const x = col * CELL_SIZE;
    const y = row * CELL_SIZE;

    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(x + MARK_PADDING, y + MARK_PADDING);
    ctx.lineTo(x + CELL_SIZE - MARK_PADDING, y + CELL_SIZE - MARK_PADDING);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + CELL_SIZE - MARK_PADDING, y + MARK_PADDING);
    ctx.lineTo(x + MARK_PADDING, y + CELL_SIZE - MARK_PADDING);
    ctx.stroke();
  };

  // Draw O mark
  const drawO = (ctx: CanvasRenderingContext2D, row: number, col: number) => {
    const x = col * CELL_SIZE + CELL_SIZE / 2;
    const y = row * CELL_SIZE + CELL_SIZE / 2;
    const radius = CELL_SIZE / 2 - MARK_PADDING;

    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  };

  // Draw winning line
  const drawWinningLine = (ctx: CanvasRenderingContext2D, line: number[]) => {
    const [a, b, c] = line;
    const startRow = Math.floor(a / 3);
    const startCol = a % 3;
    const endRow = Math.floor(c / 3);
    const endCol = c % 3;

    const startX = startCol * CELL_SIZE + CELL_SIZE / 2;
    const startY = startRow * CELL_SIZE + CELL_SIZE / 2;
    const endX = endCol * CELL_SIZE + CELL_SIZE / 2;
    const endY = endRow * CELL_SIZE + CELL_SIZE / 2;

    ctx.strokeStyle = '#2ecc71';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  // Render the entire game state
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawBoard(ctx);

    // Draw all marks
    gameState.board.forEach((cell, index) => {
      if (cell) {
        const row = Math.floor(index / 3);
        const col = index % 3;
        if (cell === 'X') {
          drawX(ctx, row, col);
        } else {
          drawO(ctx, row, col);
        }
      }
    });

    // Draw winning line if game is won
    if (gameState.winningLine) {
      drawWinningLine(ctx, gameState.winningLine);
    }
  };

  // Handle canvas click
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    // Don't allow clicks if game is over
    if (gameState.winner) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    const index = row * 3 + col;

    // Don't allow clicking on occupied cells
    if (gameState.board[index]) return;

    // Place the mark
    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    // Check for winner
    const { winner, winningLine } = checkWinner(newBoard);

    // Update game state
    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      winningLine,
    });
  };

  // Reset game
  const resetGame = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      winningLine: null,
    });
  };

  // Render whenever game state changes
  useEffect(() => {
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        Tic-Tac-Toe
      </h1>
      
      <div className="flex flex-col items-center gap-4">
        {!gameState.winner && (
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Current Turn: <span className={`font-bold ${gameState.currentPlayer === 'X' ? 'text-red-500' : 'text-blue-500'}`}>
              {gameState.currentPlayer}
            </span>
          </p>
        )}
        
        {gameState.winner && (
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {gameState.winner === 'draw' ? "It's a Draw!" : `Player ${gameState.winner} Wins!`}
          </p>
        )}
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onClick={handleClick}
        className="border-4 border-gray-300 dark:border-gray-700 rounded-lg shadow-lg cursor-pointer"
      />

      <button
        onClick={resetGame}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
      >
        New Game
      </button>

      <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          <span className="text-red-500 font-bold">X</span> goes first. Click a cell to place your mark.
        </p>
      </div>
    </div>
  );
}
