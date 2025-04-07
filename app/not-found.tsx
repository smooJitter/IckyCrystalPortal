export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFD700] p-4">
      <div className="bg-white p-8 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-6">Oops! The page you're looking for seems to have wandered off to another dimension.</p>
        <div className="text-6xl mb-6">💎❓</div>
        <p className="mb-6">
          The Crystal Portal can't locate the energy of this URL. Let's redirect your vibrations back to a page that exists.
        </p>
        <a 
          href="/" 
          className="inline-block bg-[#9966CC] text-white px-6 py-3 rounded-lg border-2 border-black hover:bg-[#8A2BE2] transition-colors font-['Space_Mono']"
        >
          Return Home
        </a>
      </div>
    </div>
  );
} 