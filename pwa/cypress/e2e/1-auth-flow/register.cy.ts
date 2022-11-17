import {
  Auth,
  connectAuthEmulator,
  initializeAuth,
  signInWithEmailAndPassword,
  UserCredential,
  indexedDBLocalPersistence,
} from 'firebase/auth'

function getAuthEmulatorHost() {
  const host = Cypress.env('NEXT_PUBLIC_FIREBASE_EMULATOR_HOST') as string
  const port = Cypress.env('NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT') as string

  return ['http://', host, ':', port].join('')
}

let auth: Auth

function getAuth() {
  const app = createFirebaseApp()

  auth =
    auth ||
    initializeAuth(app, {
      persistence: indexedDBLocalPersistence,
    })

  connectAuthEmulator(auth, getAuthEmulatorHost())

  return auth
}

describe('go to register', () => {
  it('should find register', () => {
    cy.visit('http://localhost:5173/auth/register')
    cy.get('h2').contains('Register')
    // i18n?

    // firebase?
    // graphql -> custom user...
    // apollo
  })
})
