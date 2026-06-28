import React from 'react';

export default function FeedbackScreen({
  feedback,
  question,
  onNext,
  isTimeout,
  index,
  total
}) {
  const { isCorrect, correctAnswer, explanation } = feedback;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 animate-scale-up">
      <div className={`glass-panel rounded-3xl p-8 border-t-4 relative overflow-hidden ${
        isCorrect 
          ? 'border-t-emerald-500 shadow-emerald-950/10' 
          : 'border-t-rose-500 shadow-rose-950/10'
      }`}>
        
        {/* Animated Badge Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${
            isCorrect 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}>
            {isCorrect ? '✨' : isTimeout ? '⏰' : '❌'}
          </div>
          <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
            isCorrect ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {isCorrect ? 'Spot On! Correct' : isTimeout ? "Time's Expired!" : 'Not Quite Right'}
          </h2>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-2">
            Review for Question {index + 1} of {total}
          </p>
        </div>

        {/* Answer Reveal block */}
        <div className="space-y-4 mb-8">
          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-900">
            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Correct Answer
            </span>
            <span className="text-white font-semibold font-mono text-base bg-slate-900 px-2 py-1 rounded border border-slate-800 inline-block">
              {correctAnswer}
            </span>
          </div>

          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-900">
            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Explanation
            </span>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {explanation}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onNext}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-base transition-all duration-300 active:scale-98 shadow-lg ${
            isCorrect 
              ? 'bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-500/10' 
              : 'bg-rose-600 hover:bg-rose-500 hover:shadow-rose-500/10'
          }`}
        >
          {index + 1 === total ? 'Proceed to Results' : 'Next Question'}
        </button>

      </div>
    </div>
  );
}
