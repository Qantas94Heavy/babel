# babel-plugin-transform-class-private-properties

> This plugin transforms private fields on class instances.

## Example

Below is a class with a private field that will be transformed.

```js
  class Foo {
    #x;

    constructor() {
      // The following two lines are equivalent.
      this.#x = 1;
      #x = 1;
    }


    getPrivateX() {
      // Likewise, these two lines are also equivalent.
      return this.#x;
      return #x;
    }
  }

  let myFoo = new Foo();

  console.log(myFoo.getPrivateX()); // > 1

  // Private fields cannot be accessed outside the class.
  console.log(myFoo.#x); // > TypeError
```


## Installation

```sh
npm install --save-dev babel-plugin-transform-class-private-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
// without options
{
  "plugins": ["transform-class-private-properties"]
}

// with options
{
  "plugins": [
    ["transform-class-private-properties", { "spec": true }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-class-private-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-class-private-properties"]
});
```

## Options

### `spec`

`boolean`, defaults to `false`.

When enabled, uses a WeakMap to store private fields instead of a
prefixed property on a class instance.

## References

* [Proposal: ES Class Fields](https://github.com/tc39/proposal-class-fields)
