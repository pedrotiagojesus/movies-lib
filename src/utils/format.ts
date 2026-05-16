export function currency(num: number): string {
    return num.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function date(value: string): string {
    return value ? new Date(value).toLocaleDateString("en-US") : "N/A";
}

export function minutesToHoursMinutes(totalMinutes: number | undefined) {
    if (!totalMinutes) {
        return { hours: 0, minutes: 0 };
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
}
