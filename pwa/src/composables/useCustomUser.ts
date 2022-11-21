import { ref, Ref, watch } from 'vue'
import {
  provideApolloClient,
  useLazyQuery,
  useMutation,
} from '@vue/apollo-composable'

import { User } from '../interfaces/interface.user'
import useGraphQL from './useGraphQL'
import { GET_USER_BY_UID } from '../graphql/query.user'
import { CREATE_USER } from '../graphql/mutation.user'
import useAuthentication from './useAuthentication'

const user: Ref<User | null> = ref(null)

export default () => {
  const setCustomUser = (u: User) => (user.value = u)
  const { user: fbUser } = useAuthentication()

  const { apolloClient } = useGraphQL()
  provideApolloClient(apolloClient)

  const { result, load, document } = useLazyQuery(GET_USER_BY_UID)
  const { mutate: addUser } = useMutation(CREATE_USER, () => ({
    // Callback function for reactive data & variable name without $...
    variables: {
      uid: fbUser.value?.uid,
    },
  }))

  const loadCustomUser = (uid: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Query the database for the user with the given uid
      load(document.value, {
        uid,
      })
      // and set the user value to the result

      watch(result, ({ findByUid }) => {
        if (findByUid) {
          setCustomUser(findByUid)
          resolve()
        } else {
          reject() // Temporary
        }
      })
    })
  }

  const createCustomUser = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      addUser()
        .then(() => {
          loadCustomUser(fbUser.value?.uid as string)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return {
    customUser: user,

    loadCustomUser,
    createCustomUser,
  }
}
