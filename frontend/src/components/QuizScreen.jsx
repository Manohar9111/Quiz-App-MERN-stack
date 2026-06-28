import React, { useEffect, useRef } from 'react';

export default function QuizScreen({
  question,
  index,
  total,
  timeRemaining,
  currentAnswer,
  setCurrentAnswer,
  onSubmitAnswer
}) {
  const inputRef = useRef(null);
  const { id, topic, type, question: text, options, codeSnippet, timeLimit } = question;

  // Auto-focus fill-in input
  useEffect(() => {
    if (type === 'FILL_IN' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [id, type]);

  // Calculate SVG Timer properties
  const radius = 22;
  const stroke = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeRemaining / timeLimit) * circumference;

  // Timer colors based on remaining percentage
  const timerPercentage = timeRemaining / timeLimit;
  let strokeColor = 'stroke-indigo-500';
  if (timerPercentage <= 0.25) {
    strokeColor = 'stroke-rose-500 animate-pulse';
  } else if (timerPercentage <= 0.5) {
    strokeColor = 'stroke-amber-500';
  }

  // Get topic color badges
  const getTopicStyles = (top) => {
    switch (top.toLowerCase()) {
      case 'http':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'node.js':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentAnswer.trim()) {
      onSubmitAnswer();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 animate-slide-up">
      {/* Top Meta Details */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${getTopicStyles(topic)}`}>
            {topic}
          </span>
          <span className="text-gray-400 text-xs font-medium">
            Question {index + 1} of {total}
          </span>
        </div>

        {/* Circular SVG Timer Ring */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-slate-950 rounded-full border border-slate-900 shadow-inner">
          <svg className="w-12 h-12 transform -rotate-90">
            {/* Background Track */}
            <circle
              className="stroke-slate-800"
              fill="transparent"
              strokeWidth={stroke}
              r={radius}
              cx="24"
              cy="24"
            />
            {/* Dynamic Colored Ring */}
            <circle
              className={`transition-all duration-1000 ease-linear ${strokeColor}`}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              r={radius}
              cx="24"
              cy="24"
            />
          </svg>
          <span className={`absolute text-sm font-bold tracking-tighter ${timerPercentage <= 0.25 ? 'text-rose-400 font-extrabold' : 'text-white'}`}>
            {timeRemaining}
          </span>
        </div>
      </div>

      {/* Horizontal Progress Bar */}
      <div className="w-full h-1.5 bg-slate-950 rounded-full mb-8 overflow-hidden border border-slate-900/50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden">
        
        {/* Question Text */}
        <h2 className="text-xl md:text-2xl font-bold text-white leading-snug mb-6 text-left">
          {text}
        </h2>

        {/* Code Snippet Renderer */}
        {codeSnippet && (
          <div className="code-container rounded-xl overflow-hidden mb-6 text-left">
            <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-900 flex justify-between items-center">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">snippet.js</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm font-mono text-indigo-200 leading-relaxed">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Input Controls */}
        {type === 'MCQ' ? (
          <div className="grid grid-cols-1 gap-3.5 mt-4">
            {options.map((opt, i) => {
              const isSelected = currentAnswer === opt;
              return (
                <button
                  key={i}
                  onClick={() => setCurrentAnswer(opt)}
                  className={`w-full text-left p-4 rounded-xl border text-sm md:text-base font-medium transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/5'
                      : 'bg-slate-950/40 border-slate-800 text-gray-300 hover:bg-slate-900/60 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-900 border border-slate-800 text-gray-400'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </span>
                  {isSelected && (
                    <span className="text-indigo-400 animate-scale-up">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <input
              ref={inputRef}
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your answer here (e.g. utf8, req.params)"
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 text-white rounded-xl px-4 py-3.5 text-base font-mono outline-none transition-all duration-300"
            />
            <p className="text-[10px] text-gray-500 text-left font-medium">
              💡 Capitalization doesn't matter. Spaces are trimmed automatically.
            </p>
          </div>
        )}

      </div>

      {/* Submission Footer */}
      <div className="flex justify-end mt-4">
        <button
          onClick={onSubmitAnswer}
          disabled={!currentAnswer.trim()}
          className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 text-white rounded-xl font-bold text-base shadow-lg shadow-indigo-500/10 active:scale-98 transition-all duration-200"
        >
          {index + 1 === total ? 'Submit Quiz' : 'Submit & Review'}
        </button>
      </div>
    </div>
  );
}
