// Changed by Forge v0.1.0
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type Player = 'X' | 'O' | null;
type Board = Player[];
type GameStatus = 'playing' | 'won' | 'draw';

interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player;
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export default function TicTacToeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'playing',
    winner: null
  });
  const [canvasSize, setCanvasSize] = useState(450);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/click-sound.wav');
    audioRef.current.volume = 0.3;
  }, []);

  // Handle responsive canvas sizing
  useEffect(() => {
    const updateSize = () => {
      const maxSize = Math.min(window.innerWidth - 40, 450);
      setCanvasSize(maxSize);
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Check for winner
  const checkWinner = useCallback((board: Board): Player => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }, []);

  // Check if board is full
  const isBoardFull = useCallback((board: Board): boolean => {
    return board.every(cell => cell !== null);
  }, []);

  // Bot AI - simple minimax algorithm
  const getBotMove = useCallback((board: Board): number => {
    // Check if bot can win
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = 'O';
        if (checkWinner(testBoard) === 'O') {
          return i;
        }
      }
    }

    // Check if need to block player
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = 'X';
        if (checkWinner(testBoard) === 'X') {
          return i;
        }
      }
    }

    // Take center if available
    if (board[4] === null) {
      return 4;
    }

    // Take a corner
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available space
    const available = board.map((cell, i) => cell === null ? i : -1).filter(i => i !== -1);
    return available[Math.floor(Math.random() * available.length)];
  }, [checkWinner]);

  // Play sound effect
  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  }, []);

  // Make a move
  const makeMove = useCallback((index: number, player: Player) => {
    setGameState(prev => {
      if (prev.board[index] !== null || prev.status !== 'playing') {
        return prev;
      }

      const newBoard = [...prev.board];
      newBoard[index] = player;

      const winner = checkWinner(newBoard);
      const status: GameStatus = winner ? 'won' : isBoardFull(newBoard) ? 'draw' : 'playing';

      playSound();

      return {
        board: newBoard,
        currentPlayer: player === 'X' ? 'O' : 'X',
        status,
        winner
      };
    });
  }, [checkWinner, isBoardFull, playSound]);

  // Bot's turn
  useEffect(() => {
    if (gameState.currentPlayer === 'O' && gameState.status === 'playing') {
      const timer = setTimeout(() => {
        const move = getBotMove(gameState.board);
        if (move !== undefined && move !== -1) {
          makeMove(move, 'O');
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.status, gameState.board, getBotMove, makeMove]);

  // Draw the game board
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvasSize / 3;

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;

    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(cellSize, 0);
    ctx.lineTo(cellSize, canvasSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cellSize * 2, 0);
    ctx.lineTo(cellSize * 2, canvasSize);
    ctx.stroke();

    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, cellSize);
    ctx.lineTo(canvasSize, cellSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, cellSize * 2);
    ctx.lineTo(canvasSize, cellSize * 2);
    ctx.stroke();

    // Draw X's and O's
    gameState.board.forEach((cell, index) => {
      if (cell === null) return;

      const row = Math.floor(index / 3);
      const col = index % 3;
      const x = col * cellSize + cellSize / 2;
      const y = row * cellSize + cellSize / 2;
      const padding = cellSize * 0.2;

      if (cell === 'X') {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(x - cellSize / 2 + padding, y - cellSize / 2 + padding);
        ctx.lineTo(x + cellSize / 2 - padding, y + cellSize / 2 - padding);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + cellSize / 2 - padding, y - cellSize / 2 + padding);
        ctx.lineTo(x - cellSize / 2 + padding, y + cellSize / 2 - padding);
        ctx.stroke();
      } else if (cell === 'O') {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.arc(x, y, cellSize / 2 - padding, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  }, [gameState.board, canvasSize]);

  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState.status !== 'playing' || gameState.currentPlayer !== 'X') {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cellSize = canvasSize / 3;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    const index = row * 3 + col;

    if (index >= 0 && index < 9 && gameState.board[index] === null) {
      makeMove(index, 'X');
    }
  };

  // Reset game
  const resetGame = () => {
    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      status: 'playing',
      winner: null
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          Tic-Tac-Toe
        </h2>
        {gameState.status === 'playing' && (
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {gameState.currentPlayer === 'X' ? "Your turn (X)" : "Bot's turn (O)..."}
          </p>
        )}
        {gameState.status === 'won' && (
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {gameState.winner === 'X' ? "You won! 🎉" : "Bot won! 🤖"}
          </p>
        )}
        {gameState.status === 'draw' && (
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            It's a draw! 🤝
          </p>
        )}
      </div>

      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        onClick={handleCanvasClick}
        className="border-2 border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer shadow-lg"
        style={{ width: canvasSize, height: canvasSize }}
      />

      <button
        onClick={resetGame}
        className="px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
      >
        New Game
      </button>

      <div className="text-sm text-zinc-600 dark:text-zinc-400 text-center max-w-md">
        <p>Click on any empty square to place your X. The bot will automatically play as O.</p>
      </div>
    </div>
  );
}
