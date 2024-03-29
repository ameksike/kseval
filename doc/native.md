## Evaluate JavaScript native expressions 
When using eval for evaluating expressions, it's crucial to limit the set of operations to mitigate security risks. In this example, we'll define a specific set of allowed operations for logical, algebraic, and arithmetic expressions. This approach helps to restrict the set of operations and characters allowed in the expressions, reducing the risk of unintended or malicious code execution through eval. Always consider using dedicated expression parsing or evaluation libraries for more complex scenarios, as they are designed to handle expressions safely.

```js
const kseval = require ("kseval");
```

### Demo Payload 
```js
const data = {
    age: 25,
    status: 'Regular',
    contry: {
        code: "ES",
        name: "Spain"
    },
    lst: [5,6,7]
}
```

## Evaluation of variables and objects attributes
```js
console.log(
    kseval.native.run("age === 25", data) === true,
    kseval.native.run("contry.code === 'ES'", data) === true,
    kseval.native.run("lst.includes(5)", data) === true,
)
```

## Common logic expressions
```js
console.log(
    kseval.native.run("age < 39 && status === 'Regular'", data) === true,
    kseval.native.run("age > 20 || status === 'Premium'", data) === false,
    kseval.native.run("!(age <= 18 || status === 'Premium')", data) === true,
)
```

## Human-readable logic expressions
```js
console.log(
    kseval.native.run("25 LESS THAN 30", data) === true,
    kseval.native.run("25 LESS THAN 25", data) === false,
    kseval.native.run("25 LESS THAN EQUAL 25", data) === true,

    kseval.native.run("25 GREATER THAN 20", data) === true,
    kseval.native.run("25 GREATER THAN 25", data) === false,
    kseval.native.run("25 GREATER THAN EQUAL 25", data) === true,

    kseval.native.run("25 DISTINCT 25", data) === false,
    kseval.native.run("25 DISTINCT 27", data) === true,
    kseval.native.run("25 DIFFERENT 27", data) === true,
    kseval.native.run("25 EQUAL 25", data) === true,

    kseval.native.run("age LESS THAN 39 AND status DISTINCT 'Premium'", data) === true,
    kseval.native.run("age GREATER THAN 39 OR status EQUAL 'Premium'", data) === false,
    kseval.native.run("NOT(age LESS THAN EQUAL 18 OR status EQUAL 'Premium')", data) === true,
    kseval.native.run("NOT(age GREATER THAN EQUAL 39 OR status EQUAL 'Premium')", data) === true,
)
```

## Format customization by parameters
```js
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
console.log(
    kseval.native.run("age > 18 AND age MYEQUAL VL", data, opt) === true,
    kseval.native.run("MUL(...lst)", data, opt) === 210,
    kseval.native.run("MUL(5,6,7,1)", null, opt) === 210,
    kseval.native.run("MUL(5,6,7,1)") === null,
    kseval.native.run("SUM(5,6,7,1)", null, opt) === null,
)
```

## Format customization by inheritance
```js
class MyPrs extends kseval.native.Cls {
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

console.log(
    myPrs.run("age > 18 AND age MYEQUAL VL", data) === true,
    myPrs.run("MUL(...lst)", data) === 210,
    myPrs.run("MUL(5,6,7,1)") === 210,
    myPrs.run("SUM(5, 6, 7, 1)") === null,
)
```

## Format customization by inheritance in addition to the parent behavior
```js
class MyPrs extends kseval.native.Cls {
    format(expression, data, opt) {
        // Add support for new keywords and constants
        expression = expression.replace(/VL/ig, data.age);
        expression = expression.replace(/MYEQUAL/ig, "==");
        // Adding support for new methods
        data.MUL = (...numbers) => numbers.reduce((acc, num) => acc * num, 1);
        return super.format(expression, data, opt);
    }
}

const myPrs = new MyPrs();

console.log(
    myPrs.run("age > 18 AND age MYEQUAL VL", data) === true,
    myPrs.run("MUL(...lst)", data) === 210,
    myPrs.run("MUL(5,6,7,1)") === 210,
    myPrs.run("SUM(5, 6, 7, 1)") === 19,
)
```


## Error control
```js
const out = {};

console.log(
    kseval.native.run("age > 18 AND demo.code EQUAL 'US'", data, out) === null,

    out.error.message === "demo is not defined",
    out.expression === "age > 18 AND demo.code EQUAL 'US'",
    out.data.contry.code === 'ES'
)
```

## Math and Arithmetic expressions
```js
console.log(
    kseval.native.run("age + 25", data) === 50,
    kseval.native.run("25 + 1 / 1 + 2", data) === 28,
    kseval.native.run("(25 + 1) / (1 + 2)", data) === 8.666666666666666,
    
    kseval.native.run("++age", data) === 26,
    kseval.native.run("--age", data) === 24,

    kseval.native.run("Math.abs(-age)", data) === 25,
    kseval.native.run("Math.min(...lst)", data) === 1,

    kseval.native.run("ABS(age * -1)", data) === 25,

    kseval.native.run("MIN(lst)", data) === 1,
    kseval.native.run("MIN(5, 6, 7, 1)") === 1,

    kseval.native.run("MAX(lst)", data) === 7,
    kseval.native.run("MAX(5, 6, 7, 1)") === 7,

    kseval.native.run("AVG(lst)", data) === 4.75,
    kseval.native.run("AVG(5, 6, 7, 1)") === 4.75,

    kseval.native.run("SUM(lst)", data) === 19,
    kseval.native.run("SUM(5, 6, 7, 1)") === 19,

    kseval.native.run("SUB(lst)", data) === -9,
    kseval.native.run("SUB(5, 6, 7, 1)") === -9,
)
```


Keep in mind that using this native processor could be unsafe, especially with untrusted input. Ensure that your expressions are generated or controlled in a safe environment to avoid potential security risks. For more complex scenarios, a proper sanitizer action would be recommended, but this example provides a basic illustration of evaluating logical expressions.
