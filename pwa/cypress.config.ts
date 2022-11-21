import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    APP_URL: 'http://localhost:5173',
    FIREBASE_EMULATION_URL: 'http://localhost:9099',

    USER: 'Edward Hopper',
    EMAIL: 'edward@howest.be',
    PASSWORD: 'ILoveBirds123!',
  },
})
