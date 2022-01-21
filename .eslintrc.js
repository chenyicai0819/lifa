module.exports = {
  root: false,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
// 关闭eslint
// module.exports ={
//   "extends": "standard",
//     "parser": "vue-eslint-parser",
//     "plugins": [
//   "html"
// ]
// }