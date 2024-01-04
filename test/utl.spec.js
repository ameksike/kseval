
const lib = require('../src/utl');
const lst = [5, 6, 7, 1];

describe('UTL', () => {

    it("AVG", (done) => {
        expect(lib.AVG(...lst)).toBe(4.75);
        expect(lib.AVG(lst)).toBe(4.75);
        done();
    });

    it("MIN", (done) => {
        expect(lib.MIN(5, 6, 7)).toBe(5);
        expect(lib.MIN(...lst)).toBe(1);
        expect(lib.MIN(lst)).toBe(1);
        done();
    });

    it("MAX", (done) => {
        expect(lib.MAX(...lst)).toBe(7);
        expect(lib.MAX(lst)).toBe(7);
        done();
    });

    it("SUM", (done) => {
        expect(lib.SUM(...lst)).toBe(19);
        expect(lib.SUM(lst)).toBe(19);
        done();
    });

    it("SUB", (done) => {
        expect(lib.SUB(...lst)).toBe(-9);
        expect(lib.SUB(lst)).toBe(-9);
        done();
    });

    it("ABS", (done) => {
        expect(lib.ABS(-5)).toBe(5);
        expect(lib.ABS(5)).toBe(5);
        done();
    });
});