import useModalStore from "../../stores/useModalStore"

const SongContextMenu = () => {
    const { isOpen, song } = useModalStore();

    if (!isOpen || !song) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>

            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-zinc-900 
            border border-zinc-700 rounded-sm p-6 space-y-4">

                <div className="flex items-center justify-between">
                    <h2 className="text-white text-lg">
                        Add <span className="text-zinc-300 italic">{song.name}</span> to playlist
                    </h2>
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-zinc-700 hover:bg-zinc-600 text-white"
                        onClick={() => useModalStore.setState({ isOpen: false, song: null })}
                    >
                        Cancel
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto pr-1">
                </div>
            </div>

        </div>
    )
}

export default SongContextMenu

