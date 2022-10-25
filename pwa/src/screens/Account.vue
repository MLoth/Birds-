<template>
  <route-holder :title="`Hi, ${user?.displayName}`">
    <template #header-actions>
      <button
        class="@dark:bg-neutral-50 @dark:text-neutral-800 rounded-md bg-neutral-800 px-4 py-2 text-white"
        @click="handleLogOut"
      >
        Log out
      </button>
    </template>

    <div class="mb-12 grid grid-cols-3">
      <div class="">
        <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
          Stats
        </h2>
        <p>Birds spotted: {{ customUser?.observationsCount }}</p>
      </div>

      <div class="span-2">
        <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
          Realtime
        </h2>
        <div class="flex items-center gap-3">
          <input id="server" type="checkbox" v-model="connectedToServer" />
          <label for="server"> Connect to server </label>
        </div>
      </div>
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
import useSocket from '../composables/useSocket'

import { ref, watch } from 'vue'
import { disconnect } from 'process'
import { connect } from 'superagent'

export default {
  components: {
    RouteHolder,
    ObservationsTable,
  },

  setup() {
    const { user, logout } = useAuthentication()
    const { customUser } = useCustomUser()
    const { replace } = useRouter()
    const { connectToServer, disconnectFromServer, connected } = useSocket()

    const connectedToServer = ref<boolean>(connected.value)

    const handleLogOut = () => {
      logout().then(() => {
        return replace('/auth/login')
      })
    }

    const getToken = async () => {
      // console.log(await user.value?.getIdToken())
    }

    getToken()

    watch(connectedToServer, () => {
      if (connectedToServer.value === true) {
        connectToServer()
      } else {
        disconnectFromServer()
      }
    })

    console.log('Connecting')
    connectToServer()

    return {
      user,
      customUser,
      connectedToServer,

      handleLogOut,
    }
  },
}
</script>
