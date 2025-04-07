
const storeResets = new Set<() => void>();


export const registerStoreReset = (fn: () => void) => {
    storeResets.add(fn);
    return () => storeResets.delete(fn);
}

export const resetAll = () => {
    try {
        storeResets.forEach((reset) => reset());
        console.log(`Reset ${storeResets.size} stores`);
    } catch (error) {
        console.error("Error resetting stores:", error);
    }
};

export default resetAll;