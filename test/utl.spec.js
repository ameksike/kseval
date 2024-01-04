
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

    it("ABS", (done) => {
        expect(lib.ABS(-5)).toBe(5);
        expect(lib.ABS(5)).toBe(5);
        done();
    });
});