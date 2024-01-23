/**
 * @template [T=object]
 * @typedef {{[name:String]:T}} TList 
 **/

/**
 * @description This callback redefine all arguments.
 * @callback TFnFormat
 * @param {String} expression
 * @param {Object} data
 * @param {Object} opt
 * @returns {{expression: String, data: Object, opt: Object}}
 */

/**
 * @typedef {'function' | 'eval'} TEnumTarget
 */

/**
 * @typedef {Object} TOptNative
 * @property {Error} [error]
 * @property {Boolean} [interpolate=false]
 * @property {Boolean} [destructuring=true]
 * @property {String} [expression]
 * @property {Object} [data]
 * @property {TEnumTarget} [target='function']
 * @property {TFnFormat} [format]
 */

/**
 * @typedef {Object} TOptParser
 * @property {Error} [error]
 * @property {String} [expression]
 * @property {Object} [data]
 */

/**
 * @typedef {import('./evaluator')} TEvaluator
 * @typedef {import('./native')} TNativeEval
 * @typedef {import('./parser')} TParserEval
 */

/**
 * @typedef {Object} TDriver
 * @property {typeof import('./native')} NativeEval - The type of NativeEval.
 * @property {typeof import('./parser')} ParserEval - The type of ParserEval.
 * @property {typeof import('./evaluator')} Evaluator - The type of Evaluator.
 */

/**
 * @typedef {{
*   native?: TNativeEval;
*   parser?: TParserEval;
*   driver?: TDriver;
*   [name: string]: TEvaluator | Function | TDriver;
*   get: <T>(name?: string, params?: any[]) => T;
* }} TKsEval
*/

module.exports = {};