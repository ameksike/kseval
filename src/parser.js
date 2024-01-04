class ParserEval {

    constructor() {
        this.index = 0;
    }

    /**
     * @description Function to evaluate logical expressions in text form without using eval
     * @param {String} expression 
     * @param {Object} data 
     * @returns {Boolean} result
     */
    run(expression, data, opt = {}) {
        opt = opt || {};
        opt.data = data;
        opt.expression = expression;
        try {
            expression = this.sanitize(expression);
            const tokens = this.tokenize(expression);
            const result = this.evaluateTokens(tokens, data);
            return result;
        }
        catch (error) {
            opt.error = error;
            return null;
        }
    }

    /**
     * @description Tokenize the logical expression into an array of tokens
     * @param {String} expression 
     * @returns {String} result
     */
    tokenize(expression) {
        return expression
            .replace(/\s+/g, '') // Remove spaces
            .match(/(?:\|\||&&|\(|\)|!|[a-zA-Z_]\w*|>=?|<=?|!==?|===?|'[^']*'|[0-9]+|.)/g) || [];
    }

    /**
     * @description Escaped and sanitized to prevent injection of malicious code through string manipulation.
     * @param {String} expression 
     * @returns {String} expression
     */
    sanitize(expression) {
        return expression
            // Replace logical operators for easier parsing
            .replace(/&&/g, '&&')
            .replace(/\|\|/g, '||')
            .replace(/!/g, '!')
            // add suport for new operatos 
            .replace(/NOT/ig, '!')
            .replace(/AND/ig, '&&')
            .replace(/OR/ig, '||')
            .replace(/distinct/ig, '!==')
            .replace(/equal/ig, '===')
            ;
    }

    /**
     * @description Evaluate simple expresions 
     * @param {Array} tokens 
     * @param {Object} data 
     * @returns {*} result
     */
    parsePrimary(tokens, data) {
        const token = tokens[this.index];

        if (token === '(') {
            this.index++;
            const result = this.parseExpression(tokens, data);
            /* 
                if (tokens[index++] !== ')') {
                    throw new Error("Mismatched parentheses.");
                } 
            */
            return result;
        } else if (token === '!') {
            this.index++;
            return !this.parsePrimary(tokens, data);
        } else if (token.startsWith("'")) {
            // String literal
            return token.slice(1, -1);
        } else if (!isNaN(token)) {
            // Numeric literal
            return parseFloat(token);
        } else {
            // Variable value
            this.index++;
            return data[token];
        }
    }

    /**
     * @description Evaluate comparative expresions 
     * @param {Array} tokens 
     * @param {Object} data 
     * @returns {*} result
     */
    parseComparison(tokens, data) {
        let left = this.parsePrimary(tokens, data);
        let token = tokens[this.index];

        while (token === '>=' || token === '<=' || token === '>' || token === '<' || token === '===' || token === '!==') {
            this.index++;
            const right = this.parsePrimary(tokens, data);

            switch (token) {
                case '>=': left = left >= right; break;
                case '<=': left = left <= right; break;
                case '>': left = left > right; break;
                case '<': left = left < right; break;
                case '===': left = left === right; break;
                case '!==': left = left !== right; break;
            }

            token = tokens[this.index];
        }

        return left;
    }

    /**
     * @description Evaluate complex expresions 
     * @param {Array} tokens 
     * @param {Object} data 
     * @returns {*} result
     */
    parseExpression(tokens, data) {
        let left = this.parseComparison(tokens, data);
        let token = tokens[this.index];

        while (token === '&&' || token === '||') {
            this.index++;
            const right = this.parseComparison(tokens, data);

            if (token === '&&') {
                left = left && right;
            } else {
                left = left || right;
            }

            token = tokens[this.index];
        }

        return left;
    }

    /**
     * @description Evaluate tokens using a simple recursive descent parser
     * @param {Array} tokens 
     * @param {Object} data 
     * @returns {Boolean} result
     */
    evaluateTokens(tokens, data) {
        this.index = 0;
        return this.parseExpression(tokens, data);
    }
}

module.exports = ParserEval;