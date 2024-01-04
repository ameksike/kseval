function MIN() {
    let numbers = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('MIN: Input should be a non-empty array of numbers');
    }
    return Math.min(...numbers);
}

function MAX() {
    let numbers = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('MAX: Input should be a non-empty array of numbers');
    }
    return Math.max(...numbers);
}

function AVG(...args) {
    let numbers = Array.isArray(arguments[0]) ? arguments[0] : args;
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('AVG: Input should be a non-empty array of numbers');
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

module.exports = {
    AVG,
    MIN,
    MAX,
    ABS: (numbers) => Math.abs(numbers),
};