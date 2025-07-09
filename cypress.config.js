const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://dummyjson.com',
    supportFile: 'cypress/support/e2e.js',
    env: {
      username: "emilys",
      password: "emilyspass"
    }
  }
});
