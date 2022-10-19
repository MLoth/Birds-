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
      <div>
        <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
          Stats
        </h2>
        <p>Birds spotted: {{ customUser?.observationsCount }}</p>
      </div>

      <div class="col-span-2">
        <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
          Live activity
        </h2>

        <div class="mb-3 flex items-center gap-2">
          <input
            id="startLive"
            type="checkbox"
            class="peer sr-only"
            v-model="live"
          />
          <label
            for="startLive"
            class="flex h-8 w-14 items-center rounded-full bg-neutral-200"
          >
            <span
              class="ml-1 block h-6 w-6 rounded-full bg-neutral-400 duration-100"
              :class="live ? 'translate-x-full bg-neutral-900' : ''"
            ></span>
          </label>
          <label for="startLive">Enable live activity</label>
        </div>

        <div
          class="flex items-center gap-2 text-sm font-semibold"
          v-if="connected"
        >
          <span
            class="block h-2 w-2 animate-ping rounded-full bg-green-600"
          ></span>
          Connected
        </div>
        <div class="flex items-center gap-2 text-sm font-semibold" v-else>
          <span class="block h-2 w-2 rounded-full bg-red-600"></span>
          Offline
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
import { useRouter } from 'vue-router'

import useAuthentication from '../composables/useAuthentication'
import useCustomUser from '../composables/useCustomUser'
import useRealtime from '../composables/useRealtime'

import RouteHolder from '../components/holders/RouteHolder.vue'
import ObservationsTable from '../components/observation/ObservationsTable.vue'
import { ref, watch } from 'vue'

export default {
  components: {
    RouteHolder,
    ObservationsTable,
  },

  setup() {
    const { user, logout } = useAuthentication()
    const { customUser } = useCustomUser()
    const { replace } = useRouter()
    const { connected, connectToServer, disconnectFromServer } = useRealtime()

    const live = ref<boolean>(connected.value)

    const handleLogOut = () => {
      logout().then(() => {
        return replace('/auth/login')
      })
    }

    watch(live, (value) => {
      if (value) {
        connectToServer()
      } else {
        disconnectFromServer()
      }
    })

    const getToken = async () => {
      // console.log(await user.value?.getIdToken())
    }

    getToken()

    return {
      user,
      customUser,
      live,
      connected,

      handleLogOut,
    }
  },
}
</script>
