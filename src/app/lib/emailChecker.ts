export default function isValidEmail(email: string): boolean {
    // Regular expression for basic email validation
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};