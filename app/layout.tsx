import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TravelAI - Your AI-powered Travel Assistant',
  description: 'Plan your perfect trip with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-[#FFD700]">
          <header className="bg-[#FFD700] shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="bg-black px-3 py-2 rounded">
                <span className="text-white font-['Space_Mono'] font-bold">✈️ TravelAI</span>
              </div>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#00FF00] border-2 border-black w-8 h-8 flex items-center justify-center text-black font-bold rounded-sm"
              >
                ?
              </a>
            </div>
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
} 