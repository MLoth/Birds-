import { ref, Ref, watch } from 'vue'
import { provideApolloClient, useLazyQuery } from '@vue/apollo-composable'

import { User } from '../interfaces/interface.user'
import useGraphQL from './useGraphQL'
import { GET_USER_BY_UID } from '../graphql/query.user'

const user: Ref<User | null> = ref(null)

export default () => {
  const setCustomUser = (u: User) => (user.value = u)
  const { apolloClient } = useGraphQL()

  provideApolloClient(apolloClient)
  const { result, load, document } = useLazyQuery(GET_USER_BY_UID)

  const loadCustomUser = (uid: string) => {
    // Query the database for the user with the given uid
    // and set the user value to the result
    load(document.value, {
      uid,
    })
  }

  // TODO: check docs for better async implementation
  watch(result, ({ findByUid }) => {
    if (findByUid) setCustomUser(findByUid)
  })

  return {
    customUser: user,

    loadCustomUser,
  }
}
