
const lib = require('../');

describe('Simple Expression Evaluator', () => {

    it("common", (done) => {
        const data = {
            age: 25,
            membershipStatus: 'Regular',
        }
        expect(lib.simple).toBeInstanceOf(Object);
        expect(lib.simple.run("age > 18 && membershipStatus === 'Regular'", data)).toBe(true);
        expect(lib.simple.run("age > 30 || membershipStatus === 'Premium'", data)).toBe(false);
        expect(lib.simple.run("!(age <= 18 || membershipStatus === 'Premium')", data)).toBe(true);
        done();
    });

    it("natural", (done) => {
        const data = {
            age: 25,
            membershipStatus: 'Regular',
        }
        expect(lib.simple).toBeInstanceOf(Object);
        expect(lib.simple.run("age > 18 AND membershipStatus === 'Regular'", data)).toBe(true);
        expect(lib.simple.run("age > 30 OR membershipStatus === 'Premium'", data)).toBe(false);
        expect(lib.simple.run("NOT(age <= 18 OR membershipStatus === 'Premium')", data)).toBe(true);
        done();
    });
});