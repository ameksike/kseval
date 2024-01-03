// Function to evaluate logical expressions in text form without using eval
function run(expression, data) {
    const tokens = tokenize(expression);
    const result = evaluateTokens(tokens, data);
    return result;
}

// Tokenize the logical expression into an array of tokens
function tokenize(expression) {
    return expression
        .replace(/\s+/g, '') // Remove spaces
        .match(/(?:\|\||&&|\(|\)|!|[a-zA-Z_]\w*|>=?|<=?|!==?|===?|'[^']*'|[0-9]+|.)/g) || [];
}

// Evaluate tokens using a simple recursive descent parser
function evaluateTokens(tokens, data) {
    let index = 0;

    function parsePrimary() {
        const token = tokens[index];

        if (token === '(') {
            index++;
            const result = parseExpression();
            /*if (tokens[index++] !== ')') {
                throw new Error("Mismatched parentheses.");
            }*/
            return result;
        } else if (token === '!') {
            index++;
            return !parsePrimary();
        } else if (token.startsWith("'")) {
            return token.slice(1, -1); // String literal
        } else if (!isNaN(token)) {
            return parseFloat(token); // Numeric literal
        } else {
            index++;
            return data[token]; // Variable value
        }
    }

    function parseComparison() {
        let left = parsePrimary();
        let token = tokens[index];

        while (token === '>=' || token === '<=' || token === '>' || token === '<' || token === '===' || token === '!==') {
            index++;
            const right = parsePrimary();

            switch (token) {
                case '>=': left = left >= right; break;
                case '<=': left = left <= right; break;
                case '>': left = left > right; break;
                case '<': left = left < right; break;
                case '===': left = left === right; break;
                case '!==': left = left !== right; break;
            }

            token = tokens[index];
        }

        return left;
    }

    function parseExpression() {
        let left = parseComparison();
        let token = tokens[index];

        while (token === '&&' || token === '||') {
            index++;
            const right = parseComparison();

            if (token === '&&') {
                left = left && right;
            } else {
                left = left || right;
            }

            token = tokens[index];
        }

        return left;
    }

    return parseExpression();
}

module.exports = {
    tokenize,
    run
};