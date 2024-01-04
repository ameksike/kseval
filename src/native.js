class NativeEval {

    /**
     * @description Evaluate JavaScript native expressions 
     * @param {String} expression 
     * @param {Object} data 
     * @param {Object} opt 
     * @param {Object} opt.error 
     * @param {Boolean} opt.interpolate DEFAULT [false]
     * @param {Boolean} opt.destructuring DEFAULT [true]
     * @param {String} opt.target DEFAULT [function], VALUES [function | eval]
     * @param {Function} opt.format (expression: String, data: Object, opt: Object) = {expression: String, data: Object}
     * @returns {Boolean} result
     */
    run(expression, data, opt = {}) {
        opt = opt || {};
        opt.data = data;
        opt.expression = expression;
        try {
            const format = opt?.format || this.format;
            if (format instanceof Function) {
                const res = format.apply(this, [expression, data, opt]);
                expression = res.expression;
                data = res.data;
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
     * 
     * @param {String} expression 
     * @param {Object} data 
     * @param {Object} opt 
     * @returns {Object} {expression: String, data: Object, opt: Object} 
     */
    format(expression, data, opt) {
        return { expression, data, opt };
    }

    /**
     * @description Escaped and sanitized to prevent injection of malicious code through string manipulation.
     * @param {String} expression 
     * @returns {String} expression
     */
    sanitize(expression) {
        return expression
            // Replace logical operators for easier parsing
            .replace(/funtion/ig, '')
            .replace(/=>/g, '>=')
            .replace(/=</g, '<=')
            // add suport for new operatos 
            .replace(/NOT/ig, '!')
            .replace(/AND/ig, '&&')
            .replace(/OR/ig, '||')
            .replace(/less than equal/ig, '<=')
            .replace(/less than/ig, '<')
            .replace(/greater than equal/ig, '>=')
            .replace(/greater than/ig, '>')
            .replace(/distinct/ig, '!==')
            .replace(/different/ig, '!==')
            .replace(/equal/ig, '===')
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