import React, { useState } from 'react';

export default function LandingScreen({ studentName, setStudentName, onStart, isLoading }) {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setError('Please enter your name to begin the challenge.');
      return;
    }
    if (studentName.trim().length < 2) {
      setError('Name must be at least 2 characters long.');
      return;
    }
    setError('');
    onStart();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 animate-slide-up relative z-10">
      <div className="w-full max-w-lg flex flex-col items-center justify-center">
        
        <div className="text-center mb-8 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-4">
            🚀 Interactive Quiz Session
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Full Stack <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Mastery</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto">
            Test your knowledge on Databases, SQL, and MongoDB schemas. Real-time updates as peers finish!
          </p>
        </div>

        {/* Topics grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-8 w-full">
          <div className="flex flex-col items-center p-3 rounded-xl bg-blue-500/5 backdrop-blur-md border border-blue-500/10 text-center shadow-lg">
            <span className="text-lg mb-1">🌐</span>
            <span className="text-xs font-bold text-blue-300">Databases</span>
            <span className="text-[10px] text-gray-500">Core Concepts</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-indigo-500/5 backdrop-blur-md border border-indigo-500/10 text-center shadow-lg">
            <span className="text-lg mb-1">🗄️</span>
            <span className="text-xs font-bold text-indigo-300">SQL</span>
            <span className="text-[10px] text-gray-500">Relational</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-emerald-500/5 backdrop-blur-md border border-emerald-500/10 text-center shadow-lg">
            <span className="text-lg mb-1">🍃</span>
            <span className="text-xs font-bold text-emerald-300">MongoDB</span>
            <span className="text-[10px] text-gray-500">NoSQL</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <div className="w-full">
            <label htmlFor="student-name" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 text-left">
              Student Name
            </label>
            <input
              id="student-name"
              type="text"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                if (e.target.value.trim()) setError('');
              }}
              placeholder="Enter your name to join..."
              className="w-full bg-slate-950/40 backdrop-blur-md border border-slate-800/80 hover:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white rounded-xl px-4 py-3.5 text-base outline-none transition-all duration-300 shadow-inner"
              disabled={isLoading}
              maxLength={25}
            />
            {error && (
              <p className="text-rose-400 text-xs font-medium mt-2 text-left animate-fade-in flex items-center gap-1">
                ⚠️ {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-base py-4 px-6 rounded-xl transition-all duration-300 transform active:scale-98 hover:shadow-lg hover:shadow-indigo-500/20 disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Initializing Session...
                </>
              ) : (
                <>
                  Start Quiz Challenge
                  <span className="transition-transform group-hover:translate-x-1 duration-300">→</span>
                </>
              )}
            </span>
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500 border-t border-slate-900 pt-6">
          🔒 No installation or login required. Sharing link registers other students.
        </div>

      </div>
    </div>
  );
}
