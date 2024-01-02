
const lib = require('../');

describe('Load KsDp Lib', () => {

    beforeAll(async () => { });

    afterAll(async () => { });

    it("valid instance", (done) => {
        expect(lib).toBeInstanceOf(Object);
        expect(lib.simple).toBeInstanceOf(Object);
        expect(lib.simple.run).toBeInstanceOf(Function);
        expect(lib.parser.tokenize).toBeInstanceOf(Function);
        done();
    });
});