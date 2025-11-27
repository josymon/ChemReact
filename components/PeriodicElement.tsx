import React from 'react';
import { ChemicalElement } from '../types';

interface PeriodicElementProps {
  element: ChemicalElement;
  onClick: (element: ChemicalElement) => void;
  className?: string;
}

const PeriodicElement: React.FC<PeriodicElementProps> = ({ element, onClick, className }) => {
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
        relative flex flex-col items-center justify-center 
        rounded-sm sm:rounded-md cursor-grab active:cursor-grabbing 
        transform transition-all duration-150 hover:scale-125 hover:z-50 hover:shadow-xl
        select-none border border-opacity-30
        w-full h-full min-w-[32px] min-h-[32px]
        ${element.color} ${className}
      `}
      title={element.name}
    >
      <span className="text-[0.5rem] sm:text-[0.6rem] absolute top-0.5 left-0.5 opacity-70 font-mono leading-none">{element.number}</span>
      <span className="text-xs sm:text-sm font-bold text-white shadow-black drop-shadow-sm">{element.symbol}</span>
    </div>
  );
};

export default PeriodicElement;