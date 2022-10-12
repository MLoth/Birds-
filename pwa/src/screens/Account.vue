<template>
  <route-holder :title="`Hi, ${user?.displayName}`">
    {{ customUser }}
    <button @click="handleLogOut">Log out</button>
  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../components/holders/RouteHolder.vue'
import useAuthentication from '../composables/useAuthentication'
import { useRouter } from 'vue-router'
import useCustomUser from '../composables/useCustomUser'

export default {
  components: {
    RouteHolder,
  },

  setup() {
    const { user, logout } = useAuthentication()
    const { customUser } = useCustomUser()
    const { replace } = useRouter()

    const handleLogOut = () => {
      logout().then(() => {
        return replace('/auth/login')
      })
    }

    const getToken = async () => {
      console.log(await user.value?.getIdToken())
    }

    getToken()

    return {
      user,
      customUser,

      handleLogOut,
    }
  },
}
</script>
