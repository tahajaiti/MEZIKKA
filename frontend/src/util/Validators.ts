export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Please enter a valid email address';
};

export const validatePassword = (password: string) => {
    return password.length >= 8 ? null : 'Password must be at least 8 characters';
};