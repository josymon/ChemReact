import React from 'react';
import { AVAILABLE_ELEMENTS } from '../constants';
import { ChemicalElement } from '../types';
import PeriodicElement from './PeriodicElement';

interface PeriodicTableProps {
  onElementSelect: (element: ChemicalElement) => void;
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onElementSelect }) => {
  // Main block: Periods 1-7
  const mainElements = AVAILABLE_ELEMENTS.filter(e => e.period && e.period <= 7);
  // F-block: Lanthanides & Actinides (mapped to p=8 and p=9 in constants for convenience)
  const lanthanides = AVAILABLE_ELEMENTS.filter(e => e.period === 8);
  const actinides = AVAILABLE_ELEMENTS.filter(e => e.period === 9);

  return (
    <div className="w-full overflow-x-auto custom-scrollbar p-2 bg-slate-900">
      <div className="min-w-[800px] flex flex-col items-center gap-4">
        
        {/* Main Grid */}
        <div className="grid grid-cols-18 gap-1 p-2">
          {mainElements.map((element) => (
            <div 
              key={element.symbol}
              className="w-9 h-10 sm:w-11 sm:h-12"
              style={{
                gridColumnStart: element.group,
                gridRowStart: element.period
              }}
            >
              <PeriodicElement element={element} onClick={onElementSelect} />
            </div>
          ))}
          
          {/* Placeholders for Lanthanides/Actinides slots in main table */}
          <div className="col-start-3 row-start-6 flex items-center justify-center text-xs text-gray-500 font-mono border border-dashed border-gray-700 rounded w-full h-full">57-71</div>
          <div className="col-start-3 row-start-7 flex items-center justify-center text-xs text-gray-500 font-mono border border-dashed border-gray-700 rounded w-full h-full">89-103</div>
        </div>

        {/* F-Block (Lanthanides and Actinides) */}
        <div className="flex flex-col gap-1 ml-[10%]">
          <div className="flex gap-1">
             {lanthanides.map(element => (
               <div key={element.symbol} className="w-9 h-10 sm:w-11 sm:h-12">
                 <PeriodicElement element={element} onClick={onElementSelect} />
               </div>
             ))}
          </div>
          <div className="flex gap-1">
             {actinides.map(element => (
               <div key={element.symbol} className="w-9 h-10 sm:w-11 sm:h-12">
                 <PeriodicElement element={element} onClick={onElementSelect} />
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PeriodicTable;