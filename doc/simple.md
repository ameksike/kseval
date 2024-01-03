## Evaluate JavaScript native expressions 

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
    kseval.simple.run("age > 18 && membershipStatus === 'Regular'", data) === true,
    kseval.simple.run("age > 30 || membershipStatus === 'Premium'", data) === false,
    kseval.simple.run("!(age <= 18 || membershipStatus === 'Premium')", data) === true,
);
```

```js
console.log(
    kseval.simple.run("age > 18 AND membershipStatus DISTINCT 'Premium'", data) === true,
    kseval.simple.run("age > 30 OR membershipStatus EQUAL 'Premium'", data) === false,
    kseval.simple.run("NOT(age <= 18 OR membershipStatus EQUAL 'Premium')", data) === true,
);
```
