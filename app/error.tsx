'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFD700] p-4">
      <div className="bg-white p-8 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
        <p className="mb-6">The Crystal Portal encountered a disturbance in its energy field.</p>
        <div className="text-6xl mb-6">💎⚠️</div>
        
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6 text-left overflow-auto max-h-40">
          <p className="font-mono text-sm">{error.message}</p>
        </div>
        
        <button
          onClick={() => reset()}
          className="inline-block bg-[#9966CC] text-white px-6 py-3 rounded-lg border-2 border-black hover:bg-[#8A2BE2] transition-colors font-['Space_Mono'] mr-4"
        >
          Try Again
        </button>
        
        <a 
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg border-2 border-black hover:bg-gray-800 transition-colors font-['Space_Mono']"
        >
          Return Home
        </a>
      </div>
    </div>
  );
} 