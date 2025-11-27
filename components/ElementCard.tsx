import React from 'react';
import { ChemicalElement } from '../types';

interface ElementCardProps {
  element: ChemicalElement;
  onClick: (element: ChemicalElement) => void;
}

const ElementCard: React.FC<ElementCardProps> = ({ element, onClick }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(element));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick(element)}
      className={`
        relative flex flex-col items-center justify-center p-3 rounded-xl 
        ${element.color} shadow-lg cursor-grab active:cursor-grabbing 
        transform transition-all duration-200 hover:scale-105 hover:shadow-xl hover:rotate-1
        text-white select-none w-20 h-24 sm:w-24 sm:h-28
      `}
    >
      <span className="text-xs absolute top-2 left-2 opacity-80 font-mono">{element.number}</span>
      <h3 className="text-2xl sm:text-3xl font-bold">{element.symbol}</h3>
      <p className="text-[10px] sm:text-xs font-medium truncate w-full text-center mt-1">{element.name}</p>
    </div>
  );
};

export default ElementCard;
