export function currency (num: number): string {
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function date (value:string): string {
    return value ? new Date(value).toLocaleDateString('en-US') : 'N/A';
}