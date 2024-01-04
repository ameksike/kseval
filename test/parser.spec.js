
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

    it("Natural", (done) => {
        const data = {
            age: 25,
            membershipStatus: 'Regular',
        }
        expect(lib.parser.run("age > 18 AND membershipStatus DISTINCT 'Premium'", data)).toBe(true);
        expect(lib.parser.run("age > 30 OR membershipStatus EQUAL 'Premium'", data)).toBe(false);
        expect(lib.parser.run("NOT(age <= 18 OR membershipStatus EQUAL 'Premium')", data)).toBe(true);
        done();
    });
});