<template>
  <route-holder :title="`Hi, ${user?.displayName}`">
    <div class="mb-12">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">Stats</h2>
      <p>Birds spotted: {{ customUser?.observationsCount }}</p>
      <button
        class="@dark:bg-neutral-50 @dark:text-neutral-800 mt-6 rounded-md bg-neutral-800 px-4 py-2 text-white"
        @click="handleLogOut"
      >
        Log out
      </button>
    </div>

    <div v-if="customUser">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
        Recent observations
      </h2>
      <observations-table :observations="customUser.observations!" />
    </div>
  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../components/holders/RouteHolder.vue'
import useAuthentication from '../composables/useAuthentication'
import { useRouter } from 'vue-router'
import useCustomUser from '../composables/useCustomUser'
import ObservationsTable from '../components/observation/ObservationsTable.vue'

export default {
  components: {
    RouteHolder,
    ObservationsTable,
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
