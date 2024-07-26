/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  env: {
    'cypress/globals': true, // Add this line to prevent lint errors in Cypress tests
  },
  plugins: [
    'cypress', // Make sure to include the cypress plugin
  ],
};
