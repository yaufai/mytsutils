export function atob(ascii: string): string {
    return Buffer.from(ascii).toString('base64')
}

export function btoa(base64: string): string {
    return Buffer.from(base64, 'base64').toString()
}

