# Ksike Expression Evaluator
KsEval is a versatile and powerful library for Node.js that empowers developers to dynamically evaluate arithmetic, algebraic, and logical expressions expressed in text format. This library excels in flexibility, allowing you to seamlessly interpolate data from objects and variables specified through parameters. MathEvalJS goes beyond simple expression evaluation by providing extensive customization options, enabling developers to define and overload functions for formatting, sanitizing, destructuring, and interpolating.

This library belong to the **Ksike** ecosystem:
- [KsMf](https://www.npmjs.com/package/ksmf) - Microframework (WEB, REST API, CLI, Proxy, etc)
- [Ksdp](https://www.npmjs.com/package/ksdp) - Design Patterns Library (GoF, GRASP, IoC, DI, etc)
- [KsCryp](https://www.npmjs.com/package/kscryp) - Cryptographic Library (RSA, JWT, x509, HEX, Base64, Hash, etc) 
- [KsHook](https://www.npmjs.com/package/kshook) - Event Driven Library
- [KsEval](https://www.npmjs.com/package/kseval) - Expression Evaluator Library 
- [KsWC](https://www.npmjs.com/package/kswc) - Web API deployment Library


### Expression Evaluation:

- Evaluate arithmetic, algebraic, and logical expressions expressed in text.
- Support for a wide range of mathematical and logical operators.
- Dynamic Interpolation:

### Interpolate data from objects and variables specified through parameters.
- Facilitates dynamic data integration into expressions.
- Customization Options:

### Overload functions for custom formatting of input and output.
- Define custom sanitization routines to enhance security.
- Implement destructuring functions for handling complex data structures.
- Enable dynamic definition of functions and keywords for enhanced expressiveness.

### Flexibility and Extensibility:
- Highly flexible to accommodate diverse use cases.
- Easily extendable with dynamic function and keyword definitions.


Explore the possibilities of dynamic expression evaluation with KsEval, where flexibility meets efficiency for all your mathematical and logical computation needs.

- [Native Expression Evaluator.](doc/native.md) 
- [Parser Expression Evaluator](doc/parser.md)


## Quick overview

```
npm install kseval
```

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
