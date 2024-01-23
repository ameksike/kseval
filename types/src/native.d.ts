export = NativeEval;
/**
 * @typedef {import('./types').TOptNative} TOptNative
 */
declare class NativeEval extends Evaluator {
    /**
     * @description Evaluate JavaScript native expressions
     * @param {String} expression
     * @param {Object} [data]
     * @param {TOptNative} [opt]
     * @returns {*} result
     */
    run(expression: string, data?: any, opt?: TOptNative): any;
    /**
     * @description redefine all arguments
     * @param {String} expression
     * @param {Object} data
     * @param {Object} opt
     * @returns {Object} {expression: String, data: Object, opt: Object}
     */
    format(expression: string, data: any, opt: any): any;
    /**
     * @description Evaluate JavaScript native expressions based on opt.target
     * @param {String} script
     * @param {Object} scope
     * @param {Object} opt
     * @returns {*} result
     */
    evaluate(script: string, scope?: any, opt?: any): any;
    /**
     * @description Create a destructuring script in string format
     * @param {Object} scope
     * @returns {String} destructuring script
     */
    destructuring(scope: any): string;
    /**
     * @description Interpolate all attributes values from the data object
     * @param {String} expression
     * @param {Object} data
     * @returns {String} expression
     */
    interpolate(expression: string, data: any): string;
}
declare namespace NativeEval {
    export { TOptNative };
}
import Evaluator = require("./evaluator");
type TOptNative = import('./types').TOptNative;
