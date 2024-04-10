export default function isValidEmail(email: string): boolean {
    // Regular expression for basic email validation
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export function hasSymbols(productId: string | undefined): boolean {
    // Define a regular expression to match symbols
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    // Test if the productId contains any symbols
    return productId ? symbolRegex.test(productId) : false;
}