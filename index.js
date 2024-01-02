const SimpleEval = require('./src/simple');
const simple = new SimpleEval();
simple.Cls = SimpleEval;

module.exports = {
    parser: require('./src/parser'),
    simple
}