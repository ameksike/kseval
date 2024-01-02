/**
 * @description Evaluate JavaScript native expressions 
 * @param {String} expression 
 * @param {Object} data 
 * @returns {Boolean} result
 */
function run(expression, data, out = {}) {
    out = out || {};
    out.data = data;
    out.expression = expression;
    try {
        for (let i in data) {
            let val = data[i];
            let ops = isNaN(val) && val !== "true" && val !== "false" ? "'" : "";
            data[i] && (expression = expression.replace(new RegExp(i, 'g'), ops + val + ops));
        }
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
        return eval(expression);
    }
    catch (error) {
        out.error = error;
        return null;
    }
}

module.exports = {
    run
};