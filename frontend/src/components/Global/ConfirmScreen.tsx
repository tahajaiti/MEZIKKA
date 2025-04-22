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
            <div className="bg-white p-5 rounded-md shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirmation</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleConfirm}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => useConfirmStore.setState({ isVisible: false })}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmScreen