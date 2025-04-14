let navigate: (path: string) => void;

export const setNavigator = (navFn: (path: string) => void) => {
    navigate = navFn;
}

export const goTo = (path: string) => {
    if (!navigate) {
        console.warn("Navigator not ready yet. Retrying in 100ms...");
        setTimeout(() => goTo(path), 100);
        return;
    }   
}