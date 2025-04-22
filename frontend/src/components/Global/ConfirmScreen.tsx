import useConfirmStore from '../../stores/useConfirmStore';

const ConfirmScreen = () => {
    const { isVisible, message, onConfirm } = useConfirmStore();

    if (!isVisible) return null;

    const handleConfirm = () => {
        onConfirm();
        useConfirmStore.setState({ isVisible: false, message: '', onConfirm: () => {} });
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-md shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirmation</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded-sm font-bold cursor-pointer shadow-md shadow-red-500/30 hover:bg-red-600"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => useConfirmStore.setState({ isVisible: false })}
                        className="bg-zinc-500 px-4 py-2 rounded-sm font-bold hover:bg-zinc-600 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmScreen