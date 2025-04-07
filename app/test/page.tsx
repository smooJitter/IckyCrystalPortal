'use client';

import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const testApi = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/blueprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          birthday: '2023-01-01',
          birthTime: '12:00',
          birthLocation: 'Test City',
          humanDesignType: 'Manifestor',
          humanDesignProfile: '1/3',
          humanDesignAuthority: 'Emotional',
          favoriteCrystals: ['Amethyst', 'Rose Quartz', 'Citrine'],
          salesStyle: 'Empath',
          communicationStyle: 'Grounded',
          favoriteProducts: ['Test Product 1', 'Test Product 2', 'Test Product 3'],
          personalGoals: {
            career: 'Test career goal',
            spiritual: 'Test spiritual goal',
            financial: 'Test financial goal'
          },
          loveLanguage: 'Quality Time',
          moonSign: 'Aries'
        }),
      });
      
      const data = await response.json();
      
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFD700] p-4">
      <div className="bg-white p-8 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
        <p className="mb-4">Click the button below to test the API endpoint</p>
        
        <button 
          onClick={testApi}
          disabled={loading}
          className="bg-[#9966CC] text-white px-4 py-2 rounded border-2 border-black hover:bg-[#8A2BE2] transition-colors"
        >
          {loading ? 'Testing...' : 'Test Blueprint API'}
        </button>
        
        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">API Response:</h2>
            <pre className="bg-gray-100 p-4 rounded border overflow-auto max-h-60">
              {result}
            </pre>
          </div>
        )}
        
        <div className="mt-6">
          <a href="/" className="text-blue-500 underline">Return to home</a>
        </div>
      </div>
    </div>
  );
} 