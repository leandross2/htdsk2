module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  // plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    use: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     endOfLine: 'auto',
    //   },
    // ],
    semi: 'off',
    strict: 'off',
    camelcase: 'off',
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'linebreak-style': 'off',
  },
}
