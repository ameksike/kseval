const utl = require('./utl');
const Evaluator = require('./evaluator');

/**
 * @typedef {import('./types').TOptNative} TOptNative 
 */

class NativeEval extends Evaluator {

    /**
     * @description Evaluate JavaScript native expressions 
     * @param {String} expression 
     * @param {Object} [data] 
     * @param {TOptNative} [opt] 
     * @returns {*} result
     */
    run(expression, data, opt = {}) {
        if (!expression) {
            return null;
        }
        data = data || {};
        opt = opt || {};
        opt.data = data;
        opt.expression = expression;
        try {
            const format = opt?.format || this.format;
            if (format instanceof Function) {
                const res = format.apply(this, [expression, data, opt]);
                res?.expression && (expression = res.expression);
                res?.data && (data = res.data);
            }
            opt?.interpolate && (expression = this.interpolate(expression, data));
            expression = this.sanitize(expression);
            return this.evaluate(expression, data);
        }
        catch (error) {
            opt.error = error;
            return null;
        }
    }

    /**
     * @description redefine all arguments 
     * @param {String} expression 
     * @param {Object} data 
     * @param {Object} opt 
     * @returns {Object} {expression: String, data: Object, opt: Object} 
     */
    format(expression, data, opt) {
        return { expression, data: { ...data, ...utl }, opt };
    }

    /**
     * @description Escaped and sanitized to prevent injection of malicious code through string manipulation.
     * @param {String} expression 
     * @returns {String} expression
     */
    sanitize(expression) {
        return expression
            // Replace logical operators for easier parsing
            .replace(/\bnew\b|\bfunction\b|\bObject\b|\bPromise\b|\beval\b|\bReflect\b|\bProxy\b/ig, '')
            .replace(/=>/g, '>=')
            .replace(/=</g, '<=')

            // add suport for new operatos 
            .replace(/\bNOT\b/ig, '!')
            .replace(/\bAND\b/ig, '&&')
            .replace(/\bOR\b/ig, '||')
            .replace(/\bless than equal\b/ig, '<=')
            .replace(/\bless than\b/ig, '<')
            .replace(/\bgreater than equal\b/ig, '>=')
            .replace(/\bgreater than\b/ig, '>')
            .replace(/\bdistinct\b/ig, '!==')
            .replace(/\bdifferent\b/ig, '!==')
            .replace(/\bequal\b/ig, '===')
            ;
    }

    /**
     * @description Evaluate JavaScript native expressions based on opt.target
     * @param {String} script 
     * @param {Object} scope 
     * @param {Object} opt 
     * @returns {*} result
     */
    evaluate(script, scope = {}, opt = null) {
        if (!script) {
            return null;
        }
        scope = scope || {};
        const fnHeader = opt?.destructuring ? this.destructuring(scope) : "";
        const fnBody = '"use strict"; ' + fnHeader + ' return (' + script + ')';
        const fnParamName = Object.keys(scope).join(',');
        const fnParamValue = Object.values(scope);
        return opt?.target === "eval" ? eval(fnBody) : (new Function(fnParamName, fnBody).bind(scope)(...fnParamValue));
    }

    /**
     * @description Create a destructuring script in string format
     * @param {Object} scope 
     * @returns {String} destructuring script
     */
    destructuring(scope) {
        if (!scope || typeof (scope) !== "object") {
            return "";
        }
        let code = "";
        for (let key in scope) {
            code += ` let ${key} = this.${key}; `;
        }
        return code;
    }

    /**
     * @description Interpolate all attributes values from the data object
     * @param {String} expression 
     * @param {Object} data 
     * @returns {String} expression
     */
    interpolate(expression, data) {
        for (let i in data) {
            let val = data[i];
            let ops = isNaN(val) && val !== "true" && val !== "false" ? "'" : "";
            data[i] && (expression = expression.replace(new RegExp(i, 'g'), ops + val + ops));
        }
        return expression;
    }
}

module.exports = NativeEval;