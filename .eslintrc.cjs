module.exports = {
  root: true,

  // https://typescript-eslint.io/linting/typed-linting/monorepos/
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },

  env: { es2020: true },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 0,
  },

  ignorePatterns: ['.eslintrc.cjs', 'dist', 'node_modules'],
}
