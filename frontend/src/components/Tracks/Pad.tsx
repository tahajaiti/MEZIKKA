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
        aspect-square rounded-[5px] transition-all duration-150 relative
        ${isActive ? "bg-red-500 shadow-lg shadow-red-500/30 scale-100" : "bg-zinc-800 hover:bg-zinc-700"}
        ${isCurrent && !isActive ? "ring-1 ring-zinc-600" : ""}
        ${isCurrent && isActive ? "ring-2 ring-white" : ""}
        ${isActive && !isCurrent ? "hover:bg-red-600" : ""}
      `}
      aria-pressed={isActive}
    >
      {isCurrent && (
        <span
          className={`absolute inset-0 flex items-center justify-center ${isActive ? "text-white" : "text-red-500"}`}
        >
          <span className="w-5 h-5 rounded-full bg-current"></span>
        </span>
      )}
    </button>
  )
}

export default Pad;
