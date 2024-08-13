function generateRandomCode(): string {
    const length = 6;
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        code += randomDigit.toString();
    }

    return code;
}

export { generateRandomCode };
