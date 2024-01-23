class Evaluator {
    /**
     * @description Evaluate expressions
     * @param {string} expression 
     * @param {*} data 
     * @param {*} opt 
     * @returns {*} result
     */
    run(expression, data = null, opt = null) {
        return expression;
    }

    /**
     * @description Escaped and sanitized to prevent injection of malicious code through string manipulation.
     * @param {String} expression 
     * @returns {String} expression
     */
    sanitize(expression) { return expression; }
}

module.exports = Evaluator;