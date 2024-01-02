function tokenize(expression) {
    return expression
        .replace(/\s+/g, '') // Remove spaces
        .match(/(?:\|\||&&|\(|\)|!|[a-zA-Z_]\w*|>=?|<=?|!==?|===?|'[^']*'|[0-9]+|.)/g) || [];
}

module.exports = {
    tokenize
};