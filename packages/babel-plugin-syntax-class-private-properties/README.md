# babel-plugin-syntax-class-private-properties

Allow parsing of class private properties.

## Installation

```sh
npm install --save-dev babel-plugin-syntax-class-private-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-class-private-properties"]
}
```

### Via CLI

```sh
babel --plugins syntax-class-private-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-class-private-properties"]
});
```
