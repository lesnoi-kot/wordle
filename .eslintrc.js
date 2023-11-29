module.exports = {
  root: true,

  // https://typescript-eslint.io/linting/typed-linting/monorepos/
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./packages/*/tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
  },

  env: { es2020: true },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    'no-unreachable': 2,
  },

  ignorePatterns: ['.eslintrc.*', 'dist', 'node_modules'],
};
