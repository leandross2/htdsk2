module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['standard'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    use: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'class-methods-use-this': 'off',
    strict: 'off',
    camelcase: 'off',
    eqeqeq: 'off',
    'arrow-parens': 'off',
    'space-before-function-paren': ['error', 'always']
  }
}
