import React from 'react';

export default function LeaderboardScreen({ leaderboardData, studentName, onRetry }) {
  
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 animate-slide-up">
      <div className="glass-panel-glow rounded-3xl p-6 md:p-8 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8 relative z-10">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-3 text-xs font-semibold text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live Updates Active
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Top Performers
          </h2>
          <p className="text-gray-400 text-sm">
            Scores are ranked by correct answers, then completion time.
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-slate-950/50 rounded-2xl border border-slate-800/60 overflow-hidden mb-6">
          {leaderboardData.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No scores recorded yet. Be the first!
            </div>
          ) : (
            <div className="divide-y divide-slate-800/50">
              {leaderboardData.map((entry, idx) => {
                const isMe = entry.name === studentName;
                
                // Styling for top 3
                let rankStyle = "text-gray-500";
                if (idx === 0) rankStyle = "text-yellow-400 font-bold text-xl drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]";
                if (idx === 1) rankStyle = "text-slate-300 font-bold text-lg";
                if (idx === 2) rankStyle = "text-amber-600 font-bold text-lg";

                return (
                  <div 
                    key={entry._id || idx} 
                    className={`flex items-center justify-between p-4 transition-colors ${
                      isMe ? 'bg-indigo-500/10 border-l-2 border-indigo-500' : 'hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-8 text-center ${rankStyle}`}>
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                      </span>
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          {entry.name}
                          {isMe && <span className="text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider">You</span>}
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                          {new Date(entry.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-lg text-white">
                        {entry.score}<span className="text-sm text-gray-500 font-normal">/15</span>
                      </div>
                      <div className="text-xs text-indigo-300 font-mono mt-0.5">
                        ⏱ {entry.timeTaken}s
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={onRetry}
          className="w-full py-4 rounded-xl text-white font-bold text-sm bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-200"
        >
          Back to Start
        </button>

      </div>
    </div>
  );
}
