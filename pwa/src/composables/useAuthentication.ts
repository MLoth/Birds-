import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth'
import { ref, Ref } from 'vue'

import useFirebase from './useFirebase'

const user: Ref<User | null> = ref(null)

export default () => {
  const { auth } = useFirebase()

  const setUser = (u: User | null) => (user.value = u)

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((u: UserCredential) => {
          updateProfile(u.user, {
            displayName: name,
          })
            .then(() => {
              setUser(u.user)
              resolve(user)
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const login = (
    email: string,
    password: string,
  ): Promise<Ref<User | null>> => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((u: UserCredential) => {
          setUser(u.user)
          resolve(user)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const logout = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          setUser(null)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const forgotPassword = (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => resolve())
        .catch((error) => reject(error))
    })
  }

  const restoreUser = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((u: User | null) => {
        if (u) {
          setUser(u)
          resolve()
        } else {
          resolve()
        }
      })
    })
  }

  return {
    user,

    register,
    login,
    logout,
    setUser,
    forgotPassword,
    restoreUser,
  }
}
