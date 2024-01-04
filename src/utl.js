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
    const sum = SUM(numbers);
    return sum / numbers.length;
}

function SUM() {
    let numbers = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('SUM: Input should be a non-empty array of numbers');
    }
    return numbers.reduce((acc, num) => acc + num, 0);
}

function SUB() {
    let numbers = Array.isArray(arguments[0]) ? arguments[0] : Array.from(arguments);
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('SUB: Input should be a non-empty array of numbers');
    }
    return numbers.reduce((acc, num) => acc - num);
}

module.exports = {
    SUM,
    SUB,
    AVG,
    MIN,
    MAX,
    ABS: (numbers) => Math.abs(numbers),
};