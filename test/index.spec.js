
const lib = require('../');

describe('Load KsDp Lib', () => {

    beforeAll(async () => { });

    afterAll(async () => { });

    it("valid instance", (done) => {
        expect(lib).toBeInstanceOf(Object);
        expect(lib.get).toBeInstanceOf(Function);
        expect(lib.get('native')).toBeInstanceOf(Object);
        expect(lib.get('native').run).toBeInstanceOf(Function);
        expect(lib.native.Cls).toBeInstanceOf(Function);
        expect(lib.native.run).toBeInstanceOf(Function);
        expect(lib.parser.tokenize).toBeInstanceOf(Function);
        done();
    });
});