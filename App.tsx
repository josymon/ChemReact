import React, { useState, useCallback, useEffect } from 'react';
import { AVAILABLE_ELEMENTS } from './constants';
import { ChemicalElement, ReactionResponse, ReactionEffect } from './types';
import ElementCard from './components/ElementCard';
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

  // Live Mode: Trigger simulation when contents change (debounced slightly or simply on change if not rapid)
  // To avoid spamming API while dragging multiple items quickly, we could wait for a button press, 
  // but "Live Mode" implies automatic. We'll add a small button "Mix It!" to be explicit or use a timeout.
  // Let's go with a "Mix" button approach for better UX clarity, or a "Auto-Mix" after 2s of inactivity.
  // Actually, let's make it instant but only if > 1 element for reactions. Single elements don't usually do much alone in a beaker.
  
  const handleMix = async () => {
    if (beakerContents.length === 0) return;
    
    setIsLoading(true);
    setVisualState(ReactionEffect.NONE);
    
    const reactants = beakerContents.map(e => e.symbol);
    const result = await simulateReaction(reactants);
    
    setReactionResult(result);
    setVisualState(result.visualEffect);
    setIsLoading(false);
  };

  // Effect to auto-mix if user waits? Or just manual. Let's do manual "MIX" button for clear "Cause -> Effect".
  // However, the prompt says "Live Mode". Let's add a "React" button that pulses when items are in.

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="flex-none p-4 sm:p-6 flex items-center justify-between bg-slate-900/50 border-b border-white/10 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Atom size={28} className="text-white animate-spin-slow" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Little Alchemist
            </h1>
            <p className="text-xs text-gray-400 hidden sm:block">Powered by Gemini AI</p>
          </div>
        </div>
        
        {/* API Key Status or generic help could go here */}
        <div className="text-xs font-mono text-gray-500 border border-gray-800 px-3 py-1 rounded-full">
          v1.0 Live Lab
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden relative">
        
        {/* Left Side: Periodic Table / Palette */}
        <section className="flex-none lg:flex-1 h-48 lg:h-auto overflow-y-auto p-4 lg:p-6 bg-slate-850 border-r border-white/5 order-2 lg:order-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 sticky top-0 bg-slate-900/90 py-2 z-10 backdrop-blur">
            Elements Palette
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-20">
            {AVAILABLE_ELEMENTS.map((el) => (
              <ElementCard key={el.symbol} element={el} onClick={handleDrop} />
            ))}
          </div>
        </section>

        {/* Center: Lab Bench */}
        <section className="flex-[2] relative flex flex-col items-center p-4 lg:p-8 order-1 lg:order-2 bg-gradient-to-b from-slate-900 to-slate-800">
          
          {/* Reaction Overlay Area */}
          <div className="w-full max-w-2xl min-h-[200px] mb-4">
             <ReactionResult result={reactionResult} isLoading={isLoading} />
          </div>

          {/* Beaker Area */}
          <div className="flex-1 flex flex-col justify-end w-full pb-8">
            <Beaker 
              contents={beakerContents} 
              onDrop={handleDrop} 
              onClear={handleClear} 
              visualEffect={visualState}
              isReacting={!!reactionResult}
              resultColor={reactionResult?.resultColor}
            />
          </div>

          {/* Action Button (Floating) */}
          <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-20">
            <button
              onClick={handleMix}
              disabled={isLoading || beakerContents.length === 0}
              className={`
                flex items-center justify-center w-20 h-20 rounded-full shadow-2xl 
                text-xl font-bold transition-all duration-300
                ${beakerContents.length > 0 && !isLoading
                  ? 'bg-gradient-to-tr from-green-500 to-emerald-400 hover:scale-110 animate-bounce' 
                  : 'bg-gray-700 opacity-50 cursor-not-allowed'}
              `}
            >
              {isLoading ? (
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "MIX!"
              )}
            </button>
          </div>

        </section>
      </main>

      {/* Mobile drag hint overlay (only shows once logically, but for now simple footer) */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur p-2 text-center text-xs text-gray-500 border-t border-white/5">
        Tap or Drag elements to the beaker!
      </footer>
    </div>
  );
};

export default App;
