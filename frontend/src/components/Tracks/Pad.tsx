import React from 'react';

interface PadProps {
  isActive: boolean;
  isCurrent?: boolean;
  onClick: () => void;
}

export const Pad: React.FC<PadProps> = ({ isActive, onClick, isCurrent = false }) => {
  return (
    <button
      className={`w-12 h-12 transition-all ${isActive
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-gray-700 hover:bg-gray-600'
        } ${isCurrent ? 'border-2 border-red-400' : ''
        }
      `}
      onClick={onClick}
    />
  );
};