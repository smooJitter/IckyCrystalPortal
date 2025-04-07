import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crystal Portal - Soul Staff Blueprint System',
  description: 'Create and manage employee soul blueprints for personalized team interactions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Debug script to log 404 errors */}
        <Script id="debug-404" strategy="afterInteractive">
          {`
            // Log URL to help debug page loads
            console.log("Page loaded: " + window.location.pathname);
            
            // Monitor for 404 errors in fetch requests
            const originalFetch = window.fetch;
            window.fetch = function() {
              return originalFetch.apply(this, arguments)
                .then(response => {
                  if (response.status === 404) {
                    console.error('404 Error for URL:', response.url);
                  }
                  return response;
                })
                .catch(error => {
                  console.error('Fetch error:', error);
                  throw error;
                });
            };
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-[#FFD700]">
          <header className="bg-[#FFD700] py-2">
            <div className="container mx-auto px-4 flex justify-end items-center">
              <a 
                href="https://github.com/smooJitter/IckyCrystalPortal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black font-['Space_Mono'] text-sm underline"
              >
                GitHub Repo
              </a>
            </div>
          </header>
          <main>
            {children}
          </main>
          <footer className="py-6 bg-black text-white">
            <div className="container mx-auto px-4 text-center">
              <p className="font-['Space_Mono'] text-sm">Crystal Portal Soul Staff Blueprint System</p>
              <p className="text-xs mt-1 opacity-70">Powered by Mastra AI</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 