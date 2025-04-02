import React from 'react';

interface PadProps {
  isActive: boolean;
  onClick: () => void;
}

export const Pad: React.FC<PadProps> = ({ isActive, onClick }) => {
  return (
    <button
      className={`w-12 h-12 rounded-md transition-all ${
        isActive 
          ? 'bg-blue-500 hover:bg-blue-600' 
          : 'bg-gray-700 hover:bg-gray-600'
      }`}
      onClick={onClick}
    />
  );
};