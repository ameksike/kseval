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
    address: {
        code: 111
    }
}
```

## Common logic expressions
```js
console.log(
    kseval.native.run("age < 39 && status === 'Regular'", data) === true,
    kseval.native.run("age > 20 || status === 'Premium'", data) === false,
    kseval.native.run("!(age <= 18 || status === 'Premium')", data) === true,
);
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
);
```

## Format customization by param
```js
const opt = {
    format(expression, data, opt) {
        expression = expression.replace(/VL/ig, data.age);
        expression = expression.replace(/MYEQUAL/ig, "==");
        return { expression, data, opt };
    }
};
console.log(
    lib.native.run("age > 18 AND age MYEQUAL VL", data, opt) === true
);
```

## Format customization by inheritance
```js
class MyPrs extends kseval.native.Cls {
    format(expression, data, opt) {
        expression = expression.replace(/VL/ig, data.age);
        expression = expression.replace(/MYEQUAL/ig, "==");
        return { expression, data, opt };
    }
}

const myPrs = new MyPrs();

console.log(
    myPrs.run("age > 18 AND age MYEQUAL VL", data) === true
);
```

Keep in mind that using eval can be unsafe, especially with untrusted input. Ensure that your expressions are generated or controlled in a safe environment to avoid potential security risks. For more complex scenarios, a proper parser and evaluator would be recommended, but this example provides a basic illustration of evaluating logical expressions without third-party libraries.
