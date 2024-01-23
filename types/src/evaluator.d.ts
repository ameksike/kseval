export = Evaluator;
declare class Evaluator {
    /**
     * @description Evaluate expressions
     * @param {string} expression
     * @param {*} data
     * @param {*} opt
     * @returns {*} result
     */
    run(expression: string, data?: any, opt?: any): any;
    /**
     * @description Escaped and sanitized to prevent injection of malicious code through string manipulation.
     * @param {String} expression
     * @returns {String} expression
     */
    sanitize(expression: string): string;
}
