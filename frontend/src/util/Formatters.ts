const opt: Intl.DateTimeFormatOptions = {
    dateStyle: "medium", //"full" | "long" | "medium" | "short" |
    timeStyle: "medium", //"full" | "long" | "medium" | "short" |
    hourCycle: "h12", // | "h12" | "h23" | "h24" | "h11"
}


export const FormatDate = (dateStr: string) => {
    try {

        const date = new Date(dateStr);
        return date.toLocaleString('en-US', opt);
    } catch (error) {
        console.error(error);
    }
}