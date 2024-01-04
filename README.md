# Ksike Expression Evaluator

```
npm install kseval
```

```js
const kseval = require ("kseval");
```

## Evaluate JavaScript native expressions 

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

## Quick overview
- [Native Expression Evaluator.](doc/native.md)
- [Parser Expression Evaluator](doc/parser.md)






