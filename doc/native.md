## Evaluate JavaScript native expressions 
When using eval for evaluating expressions, it's crucial to limit the set of operations to mitigate security risks. In this example, we'll define a specific set of allowed operations for logical, algebraic, and arithmetic expressions. This approach helps to restrict the set of operations and characters allowed in the expressions, reducing the risk of unintended or malicious code execution through eval. Always consider using dedicated expression parsing or evaluation libraries for more complex scenarios, as they are designed to handle expressions safely.

```js
const kseval = require ("kseval");
```

```js
const data = {
    age: 25,
    membershipStatus: 'Regular',
}
```

```js
console.log(
    kseval.native.run("age > 18 && membershipStatus === 'Regular'", data) === true,
    kseval.native.run("age > 30 || membershipStatus === 'Premium'", data) === false,
    kseval.native.run("!(age <= 18 || membershipStatus === 'Premium')", data) === true,
);
```

```js
console.log(
    kseval.native.run("age > 18 AND membershipStatus DISTINCT 'Premium'", data) === true,
    kseval.native.run("age > 30 OR membershipStatus EQUAL 'Premium'", data) === false,
    kseval.native.run("NOT(age <= 18 OR membershipStatus EQUAL 'Premium')", data) === true,
);
```

Keep in mind that using eval can be unsafe, especially with untrusted input. Ensure that your expressions are generated or controlled in a safe environment to avoid potential security risks. For more complex scenarios, a proper parser and evaluator would be recommended, but this example provides a basic illustration of evaluating logical expressions without third-party libraries.