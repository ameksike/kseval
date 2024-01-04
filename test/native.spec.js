
const lib = require('..');

const data = {
    age: 25,
    status: 'Regular',
    contry: {
        code: "ES",
        name: "Spain"
    },
    lst: [5, 6, 7, 1]
};

describe('Native Expression Evaluator', () => {

    it("Common", () => {
        expect(lib.native.run("age > 18 && status === 'Regular'", data)).toBe(true);
        expect(lib.native.run("age > 30 || status === 'Premium'", data)).toBe(false);
        expect(lib.native.run("!(age <= 18 || status === 'Premium')", data)).toBe(true);
    });

    it("Natural", () => {
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

    it("Object attributes", () => {
        expect(lib.native.run("age EQUAL 25", data)).toBe(true);
        expect(lib.native.run("contry.code EQUAL 'ES'", data)).toBe(true);
        expect(lib.native.run("lst.includes(5)", data)).toBe(true);

        expect(lib.native.run("age > 18 AND contry.code DISTINCT 'US'", data)).toBe(true);
        expect(lib.native.run("age > 18 AND contry.demo EQUAL 'US'", data)).toBe(false);
        expect(lib.native.run("age > 18 AND demo.code EQUAL 'US'", data)).toBe(null);
    });

    it("Math and Arithmetic expressions", () => {
        expect(lib.native.run("age + 25", data)).toBe(50);
        expect(lib.native.run("25 + 1 / 1 + 2", data)).toBe(28);
        expect(lib.native.run("(25 + 1) / (1 + 2)", data)).toBe(8.666666666666666);

        expect(lib.native.run("++age", data)).toBe(26);
        expect(lib.native.run("--age", data)).toBe(24);

        expect(lib.native.run("Math.abs(-age)", data)).toBe(25);
        expect(lib.native.run("Math.min(...lst)", data)).toBe(1);

        expect(lib.native.run("ABS(age * -1)", data)).toBe(25);

        expect(lib.native.run("MIN(lst)", data)).toBe(1);
        expect(lib.native.run("MIN(5, 6, 7, 1)")).toBe(1);

        expect(lib.native.run("MAX(lst)", data)).toBe(7);
        expect(lib.native.run("MAX(5, 6, 7, 1)")).toBe(7);

        expect(lib.native.run("AVG(lst)", data)).toBe(4.75);
        expect(lib.native.run("AVG(5, 6, 7, 1)")).toBe(4.75);

        expect(lib.native.run("SUM(lst)", data)).toBe(19);
        expect(lib.native.run("SUM(5, 6, 7, 1)")).toBe(19);

        expect(lib.native.run("SUB(lst)", data)).toBe(-9);
        expect(lib.native.run("SUB(5, 6, 7, 1)")).toBe(-9);
    });

    it("Format actions by param", () => {
        const opt = {
            format(expression, data, opt) {
                // Add support for new keywords and constants
                expression = expression.replace(/VL/ig, data.age);
                expression = expression.replace(/MYEQUAL/ig, "==");
                // Adding support for new methods
                data.MUL = (...numbers) => numbers.reduce((acc, num) => acc * num, 1);
                return { expression, data, opt };
            }
        };

        expect(lib.native.run("age > 18 AND age MYEQUAL VL", data, opt)).toBe(true);
        expect(lib.native.run("MUL(...lst)", data, opt)).toBe(210);
        expect(lib.native.run("MUL(5,6,7,1)", null, opt)).toBe(210);
        expect(lib.native.run("MUL(5,6,7,1)")).toBe(null);
        expect(lib.native.run("SUM(5, 6, 7, 1)", null, opt)).toBe(null);
    });

    it("Format actions by inheritance", () => {
        class MyPrs extends lib.native.Cls {

            format(expression, data, opt) {
                // Add support for new keywords and constants
                expression = expression.replace(/VL/ig, data.age);
                expression = expression.replace(/MYEQUAL/ig, "==");
                // Adding support for new methods
                data.MUL = (...numbers) => numbers.reduce((acc, num) => acc * num, 1);
                return { expression, data, opt };
            }
        }
        const myPrs = new MyPrs();

        expect(myPrs.run("age > 18 AND age MYEQUAL VL", data)).toBe(true);
        expect(myPrs.run("MUL(...lst)", data)).toBe(210);
        expect(myPrs.run("MUL(5,6,7,1)", data)).toBe(210);
        expect(myPrs.run("SUM(5, 6, 7, 1)")).toBe(null);
    });

    it("Sanitize", () => {
        expect(lib.native.run("new Object")).toBe(null);
        expect(lib.native.run("eval('eval')")).toBe("");
        expect(lib.native.run("Proxy")).toBe(null);
        expect(lib.native.run("Reflect")).toBe(null);
        expect(lib.native.run("Promise")).toBe(null);
        expect(lib.native.run(" new Function ")).toBe(null);
        expect(lib.native.run(",new Function ")).toBe(null);
        expect(lib.native.run("()=>{}")).toBe(null);
        expect(lib.native.run("a=>{}")).toBe(null);
        expect(lib.native.run(" (function a(){ return 1 }) ", data)).toBe(null);
    });

    it("Errors", () => {
        const rule = "age > 18 AND demo.code EQUAL 'US'";
        const ops = {};
        const result = lib.native.run(rule, data, ops);
        expect(result).toBe(null);
        expect(ops.data.age).toBe(data.age);
        expect(ops.data.contry.code).toBe(data.contry.code);
        expect(ops.error.message).toBe("demo is not defined");
        expect(ops.expression).toBe(rule);
    });
});