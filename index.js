const SimpleEval = require('./src/simple');
const simple = new SimpleEval();
simple.Cls = SimpleEval;

const ParserEval = require('./src/parser');
const parser = new ParserEval();
parser.Cls = ParserEval;

module.exports = {
    parser,
    simple
}