export = ParserEval;
/**
 * @typedef {import('./types').TOptParser} TOptParser
 */
declare class ParserEval extends Evaluator {
    index: number;
    /**
     * @description Function to evaluate logical expressions in text form without using eval
     * @param {String} expression
     * @param {Object} data
     * @param {TOptParser} [opt]
     * @returns {*} result
     */
    run(expression: string, data: any, opt?: TOptParser): any;
    /**
     * @description Tokenize the logical expression into an array of tokens
     * @param {String} expression
     * @returns {Array<String>} result
     */
    tokenize(expression: string): Array<string>;
    /**
     * @description Evaluate simple expresions
     * @param {Array} tokens
     * @param {Object} data
     * @returns {*} result
     */
    parsePrimary(tokens: any[], data: any): any;
    /**
     * @description Evaluate comparative expresions
     * @param {Array} tokens
     * @param {Object} data
     * @returns {*} result
     */
    parseComparison(tokens: any[], data: any): any;
    /**
     * @description Evaluate complex expresions
     * @param {Array} tokens
     * @param {Object} data
     * @returns {*} result
     */
    parseExpression(tokens: any[], data: any): any;
    /**
     * @description Evaluate tokens using a simple recursive descent parser
     * @param {Array} tokens
     * @param {Object} data
     * @returns {Boolean} result
     */
    evaluateTokens(tokens: any[], data: any): boolean;
}
declare namespace ParserEval {
    export { TOptParser };
}
import Evaluator = require("./evaluator");
type TOptParser = import('./types').TOptParser;
