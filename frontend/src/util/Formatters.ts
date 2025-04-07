const opt: Intl.DateTimeFormatOptions = {
    dateStyle: "medium", //"full" | "long" | "medium" | "short" |
    timeStyle: "medium", //"full" | "long" | "medium" | "short" |
    hourCycle: "h12", // | "h12" | "h23" | "h24" | "h11"
}

const apiUrl = import.meta.env.VITE_API_PUBLIC_URL;


export const formatDate = (dateStr: string) => {
    try {

        const date = new Date(dateStr);
        return date.toLocaleString('en-US', opt);
    } catch (error) {
        console.error(error);
    }
}

export const formatUrl = (url?: string) => {
    return url ? apiUrl + url : "https://placehold.co/600x400/webp";
}