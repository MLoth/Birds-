import { ref, Ref, watch } from 'vue'
import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'

import { User } from '../interfaces/interface.user'
import useGraphQL from './useGraphQL'
import { GET_USER_BY_UID } from '../graphql/query.user'
import { CREATE_USER } from '../graphql/mutation.user'

const user: Ref<User | null> = ref(null)

export default () => {
  const setCustomUser = (u: User) => (user.value = u)
  const { apolloClient } = useGraphQL()

  provideApolloClient(apolloClient)
  const { result, load, document } = useLazyQuery(GET_USER_BY_UID)
  const {
    result: newUser,
    load: createCustomUserInBackend,
    document: userDocument,
  } = useLazyQuery(CREATE_USER)

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

  const createCustomUser = (uid: string): Promise<void> => {
    return new Promise((resolve) => {
      createCustomUserInBackend(userDocument.value, () => ({ uid }))

      watch(newUser, ({ createUser }) => {
        console.log({ createUser })

        if (createUser) {
          setCustomUser(createUser)
          resolve()
        }
      })
    })
  }

  return {
    customUser: user,

    loadCustomUser,
    createCustomUser,
  }
}
