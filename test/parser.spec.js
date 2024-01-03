
const lib = require('..');

describe('Parser Expression Evaluator', () => {

    it("Common", (done) => {
        const data = {
            age: 25,
            membershipStatus: 'Regular',
        }
        expect(lib.parser.run("age > 18 && membershipStatus === 'Regular'", data)).toBe(true);
        expect(lib.parser.run("age > 30 || membershipStatus === 'Premium'", data)).toBe(false);
        expect(lib.parser.run("!(age <= 18 || membershipStatus === 'Premium')", data)).toBe(true);
        done();
    });

});