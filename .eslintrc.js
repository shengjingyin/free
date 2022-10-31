// @ts-check
const { defineConfig } = require('eslint-define-config');
module.exports = defineConfig({
  root: true, // 定义根路径，拒绝递归父目录
  // 需要开启的语法环境
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  // 解析器
  parserOptions: {
    parser: '@typescript-eslint/parser', //  to parse <script> tags
    ecmaVersion: 2020, //  ECMAScript 版本
    sourceType: 'module', // 模块
    jsxPragma: 'React',
    // 额外的语言特性
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 继承
  extends: [
    'plugin:vue/vue3-recommended', // 关于vue3的配置
    'plugin:@typescript-eslint/recommended', // 关于ts的配置
    'prettier', // prettier
    'plugin:prettier/recommended', // prettier
  ],
  rules: {
    // eslint 规则重写
    'no-unused-vars': 'error', // 禁止出现未使用的变量
    'space-before-function-paren': 'off', // 函数左括号之前是否需要空格
    // ts 规则 https://typescript-eslint.io/rules/
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off', // 函数是否需要明确返回值类型
    '@typescript-eslint/no-explicit-any': 'error', // 禁用any
    '@typescript-eslint/no-var-requires': 'off', // 模块化风格 require | import
    '@typescript-eslint/no-empty-function': 'off',
    // 'no-use-before-define': 'error', // 禁止在变量定义之前使用()
    // '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'error',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/ban-types': 'off', // 是否禁用大写字符
    '@typescript-eslint/no-non-null-assertion': 'off', // 是否禁用非空断言
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    '@typescript-eslint/no-unused-vars': 'off', // 作用和 no-unused-vars 相同, 没必要重复提示

    // plugin:vue/vue3-recommended 规则重写
    // vue规则 https://eslint.vuejs.org/rules/one-component-per-file.html
    'vue/script-setup-uses-vars': 'error', // script 中的方法，在template中使用，是否算被使用
    'vue/attributes-order': 'off', // 强制标签属性排序
    'vue/one-component-per-file': 'off', // 检查是否只有一个组件
    'vue/html-closing-bracket-newline': 'off', // 标签末尾是否使用新的一行
    'vue/max-attributes-per-line': 'off', // 一行一个属性
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off', // !失效，强制单行元素换行
    'vue/attribute-hyphenation': 'off', // 属性是否必须使用短横线连接方式
    'vue/require-default-prop': 'off', // props是否需要默认值
    'vue/custom-event-name-casing': 'off', // 应用小驼峰、短横线
    'vue/html-self-closing': 'off', // 闭合标签关闭
    'no-mutating-props': 'off', // 能否修改props
  },
  overrides: [
    {
      files: ['./**/*.d.ts'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
});
