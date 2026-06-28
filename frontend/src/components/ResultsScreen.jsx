import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ResultsScreen({ scoreDetails, onShowLeaderboard }) {
  const { score, total, timeTaken, breakdown } = scoreDetails;
  
  // Confetti effect on load
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#aa3bff', '#6366f1', '#ec4899']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#aa3bff', '#6366f1', '#ec4899']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleShare = async () => {
    const url = window.location.origin;
    const text = `I just scored ${score}/${total} in ${timeTaken}s on the Full Stack Mastery Quiz! Can you beat me? ${url}`;
    
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard! Share it in your WhatsApp group.');
    } catch (err) {
      alert('Failed to copy to clipboard. URL: ' + url);
    }
  };

  // Helper for topic progress bars
  const TopicBar = ({ name, correct, max, colorClass, bgClass }) => (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-semibold text-gray-300">{name}</span>
        <span className="text-xs font-mono text-gray-500">{correct}/{max}</span>
      </div>
      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${colorClass} ${bgClass}`} 
          style={{ width: `${(correct / max) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 animate-slide-up">
      <div className="glass-panel-glow rounded-3xl p-8 relative overflow-hidden">
        
        {/* Header section */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-3xl mb-4 shadow-[0_0_30px_rgba(139,92,246,0.5)]">
            🏆
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Quiz Complete!
          </h2>
          <p className="text-gray-400">
            Great job! Here is how you performed across the tech stack.
          </p>
        </div>

        {/* Primary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-center">
            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
              Final Score
            </span>
            <div className="text-4xl font-extrabold text-white">
              {score}<span className="text-xl text-gray-600">/{total}</span>
            </div>
          </div>
          
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-center">
            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
              Time Taken
            </span>
            <div className="text-4xl font-extrabold text-white">
              {timeTaken}<span className="text-xl text-gray-600">s</span>
            </div>
          </div>
        </div>

        {/* Topic Breakdown */}
        <div className="bg-slate-950/40 border border-slate-800/50 rounded-2xl p-6 mb-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
            Topic Breakdown
          </h3>
          <TopicBar name="HTTP" correct={breakdown.http || 0} max={5} colorClass="bg-blue-500" bgClass="shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
          <TopicBar name="Node.js" correct={breakdown.node || 0} max={5} colorClass="bg-emerald-500" bgClass="shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
          <TopicBar name="Express" correct={breakdown.express || 0} max={5} colorClass="bg-purple-500" bgClass="shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleShare}
            className="w-full py-4 px-6 rounded-xl text-white font-bold text-sm transition-all duration-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2"
          >
            <span>📱</span> Share on WhatsApp
          </button>
          
          <button
            onClick={onShowLeaderboard}
            className="w-full py-4 px-6 rounded-xl text-white font-bold text-sm transition-all duration-200 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 active:scale-98"
          >
            View Live Leaderboard →
          </button>
        </div>

      </div>
    </div>
  );
}
