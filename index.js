const SimpleEval = require('./src/native');
const native = new SimpleEval();
native.Cls = SimpleEval;

const ParserEval = require('./src/parser');
const parser = new ParserEval();
parser.Cls = ParserEval;

module.exports = {
    parser,
    native
}