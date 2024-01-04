## Evaluate parser expressions 
This library manually tokenize the logical expression and use a recursive descent parser to evaluate the expression. This approach is safer than using eval and can handle basic logical expressions. However, for more complex scenarios, a more sophisticated parser might be required.

```js
const kseval = require ("kseval");
```

```js
const data = {
    age: 25,
    status: 'Regular',
}
```

```js
console.log(
    kseval.parser.run("age > 18 && status === 'Regular'", data) === true,
    kseval.parser.run("age > 30 || status === 'Premium'", data) === false,
    kseval.parser.run("!(age <= 18 || status === 'Premium')", data) === true,
);
```

```js
console.log(
    kseval.parser.run("age > 18 AND status DISTINCT 'Premium'", data) === true,
    kseval.parser.run("age > 30 OR status EQUAL 'Premium'", data) === false,
    kseval.parser.run("NOT(age <= 18 OR status EQUAL 'Premium')", data) === true,
);
```