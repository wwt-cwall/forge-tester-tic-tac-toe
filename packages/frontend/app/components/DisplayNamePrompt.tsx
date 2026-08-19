// Changed by Forge v0.1.0
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useUser } from '../contexts/UserContext';

export default function DisplayNamePrompt() {
  const { displayName, setDisplayName } = useUser();
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal if no display name is set
    if (!displayName) {
      setIsOpen(true);
    }
  }, [displayName]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedName = inputName.trim();
    
    if (!trimmedName) {
      setError('Please enter a display name');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('Display name must be at least 2 characters');
      return;
    }
    
    if (trimmedName.length > 20) {
      setError('Display name must be 20 characters or less');
      return;
    }
    
    setDisplayName(trimmedName);
    setIsOpen(false);
    setError('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          Welcome to Tic-Tac-Toe!
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Please enter a display name to get started.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              htmlFor="displayName" 
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
              placeholder="Enter your name"
              autoFocus
              maxLength={20}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
