import { defineConfig } from 'cypress';
import webpackConfig from './cypress/webpack.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    specPattern: 'src/**/*.cy.{ts,tsx,jsx}', // Adjust the spec pattern as needed
    supportFile: false, // Disable the support file
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080',
    specPattern: '/packages/components/src/**/*.cy.{js,jsx,ts,tsx,jsx}',
    supportFile: false,
  },
});
