/**
 * @module kseval
 */

const path = require('path');
const NativeEval = require('./src/native');
const ParserEval = require('./src/parser');
const Evaluator = require('./src/evaluator');

/**
 * @typedef {import('./src/types').TKsEval} TKsEval 
 */

/**
 * @description Factory method to get a certain processor by name.
 * @template T
 * @param {String} [name] - The class name.
 * @param {any[]} [params] - An array of arguments to be passed to the class constructor.
 * @returns {T} - An instance of the class.
 */
function get(name, params = []) {
    try {
        const Cls = require(path.join(__dirname, 'src/', name));
        const obj = new Cls(...params);
        obj.Cls = Cls;
        return obj;
    }
    catch (error) {
        return null;
    }
}

/**
 * @type {TKsEval}
 */
const KsEval = new Proxy(
    {
        get,
        driver: {
            NativeEval,
            ParserEval,
            Evaluator
        }
    },
    {
        get(target, prop, receiver) {
            return target.hasOwnProperty(prop) || typeof prop !== 'string'
                ? Reflect.get(target, prop, receiver)
                : get(prop);
        }
    }
);

/**
 * @type {TKsEval}
 */
module.exports = KsEval;

