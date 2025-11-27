import React from 'react';
import { ChemicalElement, ReactionEffect } from '../types';
import { Trash2 } from 'lucide-react';

interface BeakerProps {
  contents: ChemicalElement[];
  onDrop: (element: ChemicalElement) => void;
  onClear: () => void;
  visualEffect: ReactionEffect;
  isReacting: boolean;
  resultColor?: string;
}

const Beaker: React.FC<BeakerProps> = ({ contents, onDrop, onClear, visualEffect, isReacting, resultColor }) => {
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData('application/json');
      if (data) {
        const element = JSON.parse(data) as ChemicalElement;
        onDrop(element);
      }
    } catch (err) {
      console.error("Failed to parse dropped item", err);
    }
  };

  // Determine container animation based on effect
  let containerAnimation = "";
  if (isReacting) {
    if (visualEffect === ReactionEffect.EXPLOSION) containerAnimation = "animate-shake";
    if (visualEffect === ReactionEffect.BUBBLES) containerAnimation = "animate-bounce";
  }

  // Determine liquid color
  const liquidColor = resultColor || (contents.length > 0 ? contents[contents.length - 1].color.replace('bg-', 'text-').replace('text-', '#') : '#3b82f6'); 
  // Note: Tailwind colors map poorly to hex dynamically without a map, simplifying to a default blue or using style override if resultColor provided.
  const liquidStyle = resultColor ? { backgroundColor: resultColor } : {};

  return (
    <div className="relative flex flex-col items-center justify-end h-full w-full max-w-md mx-auto">
      
      {/* Beaker Container */}
      <div 
        className={`relative w-48 h-64 sm:w-64 sm:h-80 border-b-4 border-x-4 border-white/40 rounded-b-[3rem] backdrop-blur-sm bg-white/5 overflow-hidden transition-all duration-500 ${containerAnimation}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Empty State / Hints */}
        {contents.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-white/30 text-center p-4 pointer-events-none">
            <p className="text-lg font-semibold border-2 border-dashed border-white/20 p-4 rounded-xl">
              Drag Elements Here
            </p>
          </div>
        )}

        {/* Liquid / Particles */}
        <div 
          className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out"
          style={{ 
            height: contents.length > 0 ? `${Math.min(contents.length * 20 + 20, 80)}%` : '0%',
            backgroundColor: resultColor || '#3b82f6',
            opacity: 0.8
          }}
        >
           {/* Bubbles Overlay */}
           {(visualEffect === ReactionEffect.BUBBLES) && isReacting && (
             <>
                <div className="absolute bottom-0 left-1/4 w-4 h-4 bg-white/40 rounded-full animate-fizz" style={{ animationDelay: '0s' }}></div>
                <div className="absolute bottom-0 left-2/4 w-6 h-6 bg-white/40 rounded-full animate-fizz" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-0 left-3/4 w-3 h-3 bg-white/40 rounded-full animate-fizz" style={{ animationDelay: '0.2s' }}></div>
             </>
           )}
           
           {/* Fire Overlay */}
           {visualEffect === ReactionEffect.FIRE && isReacting && (
             <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 opacity-80 animate-pulse"></div>
           )}

            {/* Smoke/Gas Overlay */}
           {visualEffect === ReactionEffect.SMOKE && isReacting && (
             <div className="absolute inset-0 bg-gray-400/50 mix-blend-overlay animate-pulse"></div>
           )}
        </div>

        {/* Floating Element Icons inside Beaker */}
        <div className="absolute inset-0 p-4 flex flex-wrap content-end justify-center gap-2 pointer-events-none pb-8">
           {contents.map((el, idx) => (
             <div key={`${el.symbol}-${idx}`} className="animate-pop shadow-sm bg-white/90 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold border border-gray-200">
               {el.symbol}
             </div>
           ))}
        </div>
      </div>

      {/* Beaker Stand / Base */}
      <div className="w-56 sm:w-72 h-4 bg-gray-700 rounded-full mt-2 opacity-50 blur-sm"></div>

      {/* Controls */}
      <div className="mt-8 flex gap-4">
        {contents.length > 0 && (
          <button 
            onClick={onClear}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Trash2 size={20} /> Empty Beaker
          </button>
        )}
      </div>
    </div>
  );
};

export default Beaker;