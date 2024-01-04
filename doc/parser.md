## Evaluate parser expressions 
This library manually tokenize the logical expression and use a recursive descent parser to evaluate the expression. This approach is safer than using eval and can handle basic logical expressions. However, for more complex scenarios, a more sophisticated parser might be required.

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
    kseval.parser.run("age > 18 && membershipStatus === 'Regular'", data) === true,
    kseval.parser.run("age > 30 || membershipStatus === 'Premium'", data) === false,
    kseval.parser.run("!(age <= 18 || membershipStatus === 'Premium')", data) === true,
);
```

```js
console.log(
    kseval.parser.run("age > 18 AND membershipStatus DISTINCT 'Premium'", data) === true,
    kseval.parser.run("age > 30 OR membershipStatus EQUAL 'Premium'", data) === false,
    kseval.parser.run("NOT(age <= 18 OR membershipStatus EQUAL 'Premium')", data) === true,
);
```