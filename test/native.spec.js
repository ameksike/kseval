
const lib = require('..');

describe('Native Expression Evaluator', () => {

    it("Common", (done) => {
        const data = {
            age: 25,
            status: 'Regular',
        }
        expect(lib.native.run("age > 18 && status === 'Regular'", data)).toBe(true);
        expect(lib.native.run("age > 30 || status === 'Premium'", data)).toBe(false);
        expect(lib.native.run("!(age <= 18 || status === 'Premium')", data)).toBe(true);
        done();
    });

    it("Natural", (done) => {
        const data = {
            age: 25,
            status: 'Regular',
        }
        expect(lib.native.run("age LESS THAN 30", data)).toBe(true);
        expect(lib.native.run("age LESS THAN 25", data)).toBe(false);
        expect(lib.native.run("age LESS THAN EQUAL 25", data)).toBe(true);

        expect(lib.native.run("age GREATER THAN 20", data)).toBe(true);
        expect(lib.native.run("age GREATER THAN 25", data)).toBe(false);
        expect(lib.native.run("age GREATER THAN EQUAL 25", data)).toBe(true);

        expect(lib.native.run("age DISTINCT 25", data)).toBe(false);
        expect(lib.native.run("age DISTINCT 27", data)).toBe(true);
        expect(lib.native.run("age DIFFERENT 27", data)).toBe(true);
        expect(lib.native.run("age EQUAL 25", data)).toBe(true);

        expect(lib.native.run("age LESS THAN 39 AND status DISTINCT 'Premium'", data)).toBe(true);
        expect(lib.native.run("age GREATER THAN 39 OR status EQUAL 'Premium'", data)).toBe(false);
        expect(lib.native.run("NOT(age LESS THAN EQUAL 18 OR status EQUAL 'Premium')", data)).toBe(true);
        expect(lib.native.run("NOT(age GREATER THAN EQUAL 39 OR status EQUAL 'Premium')", data)).toBe(true);
        done();
    });

    it("Natural sanitize", () => {
        expect(lib.native.sanitize("1 DISTINCT 1")).toBe("1 !== 1");
        expect(lib.native.sanitize("1 DIFFERENT 1")).toBe("1 !== 1");
        expect(lib.native.sanitize("1 EQUAL 1")).toBe("1 === 1");
        expect(lib.native.sanitize("1 OR 1")).toBe("1 || 1");
        expect(lib.native.sanitize("1 AND 1")).toBe("1 && 1");
        expect(lib.native.sanitize("1 LESS THAN 1")).toBe("1 < 1");
        expect(lib.native.sanitize("1 LESS THAN EQUAL 1")).toBe("1 <= 1");
        expect(lib.native.sanitize("1 GREATER THAN 1")).toBe("1 > 1");
        expect(lib.native.sanitize("1 GREATER THAN EQUAL 1")).toBe("1 >= 1");
    });
    
    it("Object attributes", (done) => {
        const data = {
            age: 25,
            contry: {
                code: "ES",
                name: "Spain"
            }
        }
        expect(lib.native.run("age > 18 AND contry.code DISTINCT 'US'", data)).toBe(true);
        expect(lib.native.run("age > 18 AND contry.demo EQUAL 'US'", data)).toBe(false);
        expect(lib.native.run("age > 18 AND demo.code EQUAL 'US'", data)).toBe(null);
        done();
    });

    it("Format actions by param", (done) => {
        const data = { age: 25 }
        expect(lib.native.run("age > 18 AND age MYEQUAL VL", data, {
            format(expression, data, opt) {
                expression = expression.replace(/VL/ig, data.age);
                expression = expression.replace(/MYEQUAL/ig, "==");
                return { expression, data, opt };
            }
        })).toBe(true);
        done();
    });

    it("Format actions by inheritance", (done) => {
        const data = { age: 25 }
        class MyPrs extends lib.native.Cls {
            format(expression, data, opt) {
                expression = expression.replace(/VL/ig, data.age);
                expression = expression.replace(/MYEQUAL/ig, "==");
                return { expression, data, opt };
            }
        }
        const myPrs = new MyPrs();

        expect(myPrs.run("age > 18 AND age MYEQUAL VL", data)).toBe(true);
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
        const result = lib.native.run(rule, data, ops);
        expect(result).toBe(null);
        expect(ops.data.age).toBe(data.age);
        expect(ops.data.contry.code).toBe(data.contry.code);
        expect(ops.error.message).toBe("demo is not defined");
        expect(ops.expression).toBe(rule);
        done();
    });
});