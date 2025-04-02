interface PadProps {
  isActive: boolean;
  onClick: () => void;
}

export const Pad: React.FC<PadProps> = ({ isActive, onClick }) => {
  return (
    <button
      className={`p-10 py-10 flex items-center justify-center cursor-pointer transition-all 
        ${isActive ? "bg-green-500" : "bg-gray-700"} 
        hover:scale-110 active:scale-90`}
      onClick={onClick}
    />
  );
};
