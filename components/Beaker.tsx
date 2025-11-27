import React from 'react';
import { ChemicalElement, ReactionEffect, ReactionProduct } from '../types';
import { Trash2 } from 'lucide-react';

interface BeakerProps {
  contents: ChemicalElement[];
  products?: ReactionProduct[];
  onDrop: (element: ChemicalElement) => void;
  onClear: () => void;
  visualEffect: ReactionEffect;
  isReacting: boolean;
  resultColor?: string;
}

const Beaker: React.FC<BeakerProps> = ({ contents, products, onDrop, onClear, visualEffect, isReacting, resultColor }) => {
  
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
  const liquidBaseColorClass = '#3b82f6';
  const effectiveLiquidColor = isReacting && resultColor ? resultColor : (contents.length > 0 ? contents[contents.length - 1].color.match(/bg-[a-z]+-[0-9]+/)?.[0]?.replace('bg-', 'var(--tw-colors-').replace('-', ')') || '#3b82f6' : '#3b82f6');
  
  // Clean color handling using hex if provided, otherwise standard blue
  const liquidStyleColor = resultColor && isReacting ? resultColor : undefined;

  // Determine what to display: Products (if reaction done) or Raw Contents
  const showProducts = products && products.length > 0 && isReacting;

  return (
    <div className="relative flex flex-col items-center justify-end h-full w-full max-w-md mx-auto pointer-events-none">
      
      {/* Beaker Container */}
      <div 
        className={`pointer-events-auto relative w-56 h-72 sm:w-72 sm:h-96 border-b-4 border-x-4 border-white/40 rounded-b-[4rem] backdrop-blur-sm bg-white/5 overflow-hidden transition-all duration-500 ${containerAnimation} shadow-2xl shadow-blue-900/20`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Empty State / Hints */}
        {contents.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-white/30 text-center p-4 pointer-events-none">
            <p className="text-lg font-semibold border-2 border-dashed border-white/20 p-6 rounded-2xl">
              Drop Elements Here
            </p>
          </div>
        )}

        {/* Liquid / Particles */}
        <div 
          className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-in-out"
          style={{ 
            height: contents.length > 0 ? `${Math.min(contents.length * 15 + 20, 85)}%` : '0%',
            backgroundColor: liquidStyleColor,
            opacity: 0.8
          }}
        >
          {/* Default liquid class if no specific color */}
          {!liquidStyleColor && <div className={`absolute inset-0 bg-blue-500 opacity-60`}></div>}

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

            {/* Precipitate Overlay */}
            {visualEffect === ReactionEffect.PRECIPITATE && isReacting && (
             <div className="absolute inset-0 bg-white/20 animate-pulse bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNSkiLz48L3N2Zz4=')]"></div>
           )}
        </div>

        {/* Floating Items inside Beaker */}
        <div className="absolute inset-0 p-4 flex flex-wrap content-end justify-center gap-3 pointer-events-none pb-12">
           
           {/* Case 1: Show Original Reactants (Before Mix) */}
           {!showProducts && contents.map((el, idx) => (
             <div key={`${el.symbol}-${idx}`} className="animate-pop shadow-lg bg-white/90 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold border-2 border-white/50">
               {el.symbol}
             </div>
           ))}

           {/* Case 2: Show Resulting Products (After Mix) */}
           {showProducts && products!.map((prod, idx) => (
              <div 
                key={`${prod.symbol}-${idx}`} 
                className="animate-pop shadow-2xl rounded-2xl px-4 py-2 flex flex-col items-center justify-center min-w-[4rem] min-h-[4rem] border-4 border-white/30 backdrop-blur-md bg-white/20 transform hover:scale-110 transition-transform"
              >
               <span className="font-extrabold text-2xl text-white drop-shadow-md">{prod.symbol}</span>
               <span className="text-[10px] uppercase tracking-wider font-bold text-white/90 bg-black/20 px-2 py-0.5 rounded-full mt-1">{prod.name}</span>
             </div>
           ))}

        </div>
      </div>

      {/* Beaker Stand / Base */}
      <div className="w-64 sm:w-80 h-6 bg-gray-800 rounded-full mt-[-8px] opacity-60 blur-md z-[-1]"></div>

      {/* Controls */}
      <div className="mt-6 flex gap-4 pointer-events-auto">
        {contents.length > 0 && (
          <button 
            onClick={onClear}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            <Trash2 size={20} /> Empty Beaker
          </button>
        )}
      </div>
    </div>
  );
};

export default Beaker;