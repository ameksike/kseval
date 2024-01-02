class SimpleEval {
    /**
     * @description Evaluate JavaScript native expressions 
     * @param {String} expression 
     * @param {Object} data 
     * @param {Object} opt 
     * @param {Object} opt.error 
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
            // Evaluate the expression using eval (Note: Using eval can be unsafe with untrusted input)
            return this.evaluate(data, expression);
        }
        catch (error) {
            opt.error = error;
            console.log(error);
            return null;
        }
    }

    evaluate(scope, script, opt) {
        const cont = this.destructuring(scope);
        const body = '"use strict"; ' + cont + ' return (' + script + ')';
        return opt?.mode === "eval" ? eval(body) : new Function(body).bind(scope)();
    }

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