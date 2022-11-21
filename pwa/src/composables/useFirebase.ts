import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import {
  getAuth,
  Auth,
  setPersistence,
  browserLocalPersistence,
  connectAuthEmulator,
} from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
}

const app: FirebaseApp = initializeApp(firebaseConfig)
const auth: Auth = getAuth()
setPersistence(auth, browserLocalPersistence)
;(async () => {
  // @ts-ignore
  if (window.Cypress)
    // @ts-ignore
    connectAuthEmulator(auth, Cypress.env('FIREBASE_EMULATION_URL'))
})()

export default () => {
  return {
    app,
    auth,
  }
}
