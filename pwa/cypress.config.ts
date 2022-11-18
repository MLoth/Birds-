import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    NODE_ENV: 'e2e',
    APP_URL: 'http://localhost:5173',
    EMAIL: 'edward.hopper@birds.io',
    FIREBASE_AUTH_EMULATOR_URL: 'http://localhost:9099',
    NAME: 'Edward Hopper',
    PASSWORD: 'H@ppyBirds01!',
  },
})
