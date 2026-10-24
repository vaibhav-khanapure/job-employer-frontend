const verificationCodeValidator = (value: string): boolean => {
    return value === "" || /^[A-Z0-9]$/.test(value);
};

export default verificationCodeValidator;