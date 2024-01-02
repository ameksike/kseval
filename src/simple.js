class SimpleEval {

    /**
     * @description Evaluate JavaScript native expressions 
     * @param {String} expression 
     * @param {Object} data 
     * @param {Object} opt 
     * @param {Object} opt.error 
     * @param {Boolean} opt.interpolate DEFAULT [false]
     * @param {Boolean} opt.destructuring DEFAULT [true]
     * @param {String} opt.target DEFAULT [function], VALUES [function | eval]
     * @returns {Boolean} result
     */
    run(expression, data, opt = {}) {
        opt = opt || {};
        opt.data = data;
        opt.expression = expression;
        try {
            opt?.interpolate && (expression = this.interpolate(expression, data));
            // Replace logical operators for easier parsing
            expression = expression
                .replace(/&&/g, '&&')
                .replace(/\|\|/g, '||')
                .replace(/NOT/ig, '!')
                .replace(/AND/ig, '&&')
                .replace(/OR/ig, '||')
                .replace(/distinct/ig, '!==')
                .replace(/equal/ig, '===')
                .replace(/!/g, '!');
            // Evaluate the expression using, this can be unsafe with untrusted input
            return this.evaluate(expression, data);
        }
        catch (error) {
            opt.error = error;
            console.log(error);
            return null;
        }
    }

    /**
     * @description Evaluate JavaScript native expressions based on opt.target
     * @param {String} script 
     * @param {Object} scope 
     * @param {Object} opt 
     * @returns {*} result
     */
    evaluate(script, scope = {}, opt = null) {
        const cont = opt?.destructuring || opt?.destructuring === undefined ? this.destructuring(scope) : "";
        const body = '"use strict"; ' + cont + ' return (' + script + ')';
        return opt?.target === "eval" ? eval(body) : (new Function(body).bind(scope)());
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

module.exports = SimpleEval;