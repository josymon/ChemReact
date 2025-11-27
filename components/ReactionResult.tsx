import React from 'react';
import { ReactionResponse } from '../types';
import { Sparkles, FlaskConical, AlertTriangle } from 'lucide-react';

interface ReactionResultProps {
  result: ReactionResponse | null;
  isLoading: boolean;
}

const ReactionResult: React.FC<ReactionResultProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center animate-pulse">
        <div className="flex flex-col items-center justify-center gap-3">
          <FlaskConical className="w-10 h-10 text-blue-400 animate-spin" />
          <h2 className="text-xl font-bold text-blue-200">Analyzing Reaction...</h2>
          <p className="text-sm text-gray-300">Consulting the Grand Alchemist Gemini...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center">
        <h2 className="text-xl font-bold text-gray-300">Ready for Science!</h2>
        <p className="text-gray-400 mt-2">Drop elements into the beaker to start.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-6 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-blue-500/30 shadow-2xl transform transition-all animate-pop">
      
      {/* Header with Icon */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {result.isPossible ? (
          <Sparkles className="w-8 h-8 text-yellow-400" />
        ) : (
          <FlaskConical className="w-8 h-8 text-gray-400" />
        )}
        <h2 className="text-2xl font-bold text-white tracking-wide">
          {result.isPossible ? "Reaction Complete!" : "No Reaction"}
        </h2>
      </div>

      {/* Description */}
      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 mb-4">
        <p className="text-lg text-blue-100 leading-relaxed font-medium">
          {result.funDescription}
        </p>
      </div>

      {/* Equation */}
      {result.isPossible && (
        <div className="flex flex-col items-center gap-2">
           <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Equation</span>
           <code className="px-4 py-2 bg-black/30 rounded-lg text-green-400 font-mono text-lg shadow-inner">
             {result.balancedEquation}
           </code>
        </div>
      )}

      {/* Visual Effect Tag */}
      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-gray-300 border border-white/10 uppercase">
           Effect: {result.visualEffect.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
};

export default ReactionResult;
