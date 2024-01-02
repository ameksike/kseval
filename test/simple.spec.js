
const lib = require('../');

describe('Simple Expression Evaluator', () => {

    it("Common", (done) => {
        const data = {
            age: 25,
            membershipStatus: 'Regular',
        }
        expect(lib.simple.run("age > 18 && membershipStatus === 'Regular'", data)).toBe(true);
        expect(lib.simple.run("age > 30 || membershipStatus === 'Premium'", data)).toBe(false);
        expect(lib.simple.run("!(age <= 18 || membershipStatus === 'Premium')", data)).toBe(true);
        done();
    });

    it("Natural", (done) => {
        const data = {
            age: 25,
            membershipStatus: 'Regular',
        }
        expect(lib.simple.run("age > 18 AND membershipStatus DISTINCT 'Premium'", data)).toBe(true);
        expect(lib.simple.run("age > 30 OR membershipStatus EQUAL 'Premium'", data)).toBe(false);
        expect(lib.simple.run("NOT(age <= 18 OR membershipStatus EQUAL 'Premium')", data)).toBe(true);
        done();
    });

    it("Object attributes", (done) => {
        const data = {
            age: 25,
            contry: {
                code: "ES",
                name: "Spain"
            }
        }
        expect(lib.simple.run("age > 18 AND contry.code DISTINCT 'US'", data)).toBe(true);
        expect(lib.simple.run("age > 18 AND contry.demo EQUAL 'US'", data)).toBe(false);
        expect(lib.simple.run("age > 18 AND demo.code EQUAL 'US'", data)).toBe(null);
        done();
    });

    it("Errors", (done) => {
        const data = {
            age: 25,
            contry: {
                code: "ES",
                name: "Spain"
            }
        }
        const rule = "age > 18 AND demo.code EQUAL 'US'";
        const ops = {};
        const result = lib.simple.run(rule, data, ops);
        expect(result).toBe(null);
        expect(ops.data.age).toBe(data.age);
        expect(ops.data.contry.code).toBe(data.contry.code);
        expect(ops.error.message).toBe("demo is not defined");
        expect(ops.expression).toBe(rule);
        done();
    });
});