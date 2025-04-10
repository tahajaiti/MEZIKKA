interface PadProps {
  isActive: boolean
  isCurrent: boolean
  onClick: () => void
}

const Pad: React.FC<PadProps> = ({ isActive, isCurrent, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        aspect-square rounded-[3px] sm:rounded-[5px] cursor-pointer transition-all duration-100 relative
        ${isActive ? "bg-red-500 shadow-sm sm:shadow-lg shadow-red-500/30 scale-100" : "bg-zinc-800 hover:bg-zinc-700"}
        ${isCurrent && !isActive ? "ring-1 ring-zinc-600" : ""}
        ${isCurrent && isActive ? "ring-1 sm:ring-2 ring-white -translate-y-1 sm:-translate-y-3" : ""}
        ${isActive && !isCurrent ? "hover:bg-red-600/50" : ""}
      `}
      aria-pressed={isActive}
    />
  )
}

export default Pad;
