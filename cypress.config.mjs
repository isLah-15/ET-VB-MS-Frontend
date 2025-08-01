import { defineConfig } from "cypress";

export default defineConfig({
  // Configuration for your End-to-End tests
  e2e: {
    // This function is where you can add Node.js-specific events,
    // like tasks, plugins, and custom logic for E2E tests.
    // For example, this is where you would configure plugins for
    // database seeding or generating mock data.
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // The base URL for your application. This allows you to use
    // relative paths like `cy.visit('/login')` instead of
    // the full URL `cy.visit('http://localhost:3000/login')`.
    // Make sure to update this to match your local development server's URL.
    baseUrl: 'http://localhost:5173',

    // This specifies the pattern for your test files.
    // `**/*.cy.{js,jsx,ts,tsx}` is the recommended standard.
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },

  // Configuration for your Component tests (if you are using them)
  // If you are not using component tests, you can remove this section.
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
