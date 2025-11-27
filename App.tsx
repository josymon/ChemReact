import React, { useState, useCallback } from 'react';
import { ChemicalElement, ReactionResponse, ReactionEffect } from './types';
import PeriodicTable from './components/PeriodicTable';
import Beaker from './components/Beaker';
import ReactionResult from './components/ReactionResult';
import { simulateReaction } from './services/geminiService';
import { Atom } from 'lucide-react';

const App: React.FC = () => {
  const [beakerContents, setBeakerContents] = useState<ChemicalElement[]>([]);
  const [reactionResult, setReactionResult] = useState<ReactionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visualState, setVisualState] = useState<ReactionEffect>(ReactionEffect.NONE);

  const handleDrop = useCallback((element: ChemicalElement) => {
    setBeakerContents(prev => [...prev, element]);
    // Reset previous results when new ingredients are added
    setReactionResult(null);
    setVisualState(ReactionEffect.NONE);
  }, []);

  const handleClear = () => {
    setBeakerContents([]);
    setReactionResult(null);
    setVisualState(ReactionEffect.NONE);
  };

  const handleMix = async () => {
    if (beakerContents.length === 0) return;
    
    setIsLoading(true);
    setVisualState(ReactionEffect.NONE);
    setReactionResult(null);
    
    const reactants = beakerContents.map(e => e.symbol);
    const result = await simulateReaction(reactants);
    
    setReactionResult(result);
    setVisualState(result.visualEffect);
    setIsLoading(false);
  };

  return (
    <div className="h-screen bg-slate-950 text-white font-sans selection:bg-purple-500 selection:text-white flex flex-col overflow-hidden">
      
      {/* 1. Header & Periodic Table Section (Top) */}
      <section className="flex-none bg-slate-900 border-b border-white/10 flex flex-col z-20 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-900 z-30">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
              <Atom size={24} className="text-white animate-spin-slow" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Little Alchemist
              </h1>
            </div>
          </div>
          <div className="text-xs font-mono text-gray-500 hidden sm:block">
            Drag or Tap Elements to Add
          </div>
        </div>

        {/* Scrollable Periodic Table */}
        <div className="w-full overflow-y-hidden border-t border-white/5 shadow-inner bg-slate-900/50">
           <PeriodicTable onElementSelect={handleDrop} />
        </div>
      </section>

      {/* 2. Workspace / Lab Bench (Bottom, flex-grow) */}
      <section className="flex-1 relative flex flex-col items-center justify-between p-4 bg-gradient-to-b from-slate-900 to-slate-800 overflow-y-auto">
          
          {/* Reaction Status / Overlay */}
          <div className="w-full max-w-3xl flex-none mb-4 min-h-[140px] z-10">
             <ReactionResult result={reactionResult} isLoading={isLoading} />
          </div>

          {/* Beaker Area */}
          <div className="flex-1 flex flex-col justify-end w-full pb-8 z-0">
            <Beaker 
              contents={beakerContents} 
              products={reactionResult?.products}
              onDrop={handleDrop} 
              onClear={handleClear} 
              visualEffect={visualState}
              isReacting={!!reactionResult && reactionResult.isPossible}
              resultColor={reactionResult?.resultColor}
            />
          </div>

          {/* Action Button (Floating) */}
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={handleMix}
              disabled={isLoading || beakerContents.length === 0}
              className={`
                flex items-center justify-center w-20 h-20 rounded-full shadow-2xl 
                text-xl font-bold transition-all duration-300 border-4 border-white/10
                ${beakerContents.length > 0 && !isLoading
                  ? 'bg-gradient-to-tr from-green-500 to-emerald-400 hover:scale-110 animate-bounce cursor-pointer hover:shadow-green-500/50' 
                  : 'bg-gray-700 opacity-50 cursor-not-allowed'}
              `}
            >
              {isLoading ? (
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "MIX"
              )}
            </button>
          </div>
      </section>

    </div>
  );
};

export default App;