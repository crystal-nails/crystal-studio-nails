'use client';

export default function NailLoader() {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-[#e7e1d1]">
      <div className="flex flex-col items-center animate-pulse">
        <img
          src="/loader.png" 
          alt="Loader"
          className="w-20 h-20 mb-4 animate-spin-slow"
        />
        <p className="text-pink-700 text-lg font-semibold">
            Die Suche nach dem besten Stil....
        </p>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
