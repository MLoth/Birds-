<template>
  <route-holder :title="title">
    <template #header-actions>
      <button
        class="@dark:bg-neutral-50 @dark:text-neutral-800 rounded-md bg-neutral-800 px-4 py-2 text-white"
        @click="handleLogOut"
      >
        {{ $t('account.log.out') }}
      </button>
    </template>

    <div class="mb-12 grid grid-cols-3">
      <div class="">
        <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
          {{ $t('account.stats') }}
        </h2>
        <p>Birds spotted: {{ customUser?.observationsCount }}</p>
      </div>

      <div class="span-2">
        <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
          {{ $t('account.realtime') }}
        </h2>
        <div class="flex items-center gap-3">
          <input id="server" type="checkbox" v-model="connectedToServer" />
          <label for="server"> Connect to server </label>
        </div>
      </div>

      <div class="span-2">
        <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
          {{ $t('account.settings') }}
        </h2>
        <div class="flex items-center gap-3">
          <label for="language" class="block">Language</label>
          <select
            class="block"
            name="language"
            id="language"
            @change="setLanguage($event)"
          >
            <option v-for="l of AVAILABLE_LANGUAGES" :value="l.code">
              {{ l.label }}
            </option>
          </select>
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

import RouteHolder from '../components/holders/RouteHolder.vue'
import ObservationsTable from '../components/observation/ObservationsTable.vue'

import useAuthentication from '../composables/useAuthentication'
import useCustomUser from '../composables/useCustomUser'
import useSocket from '../composables/useSocket'
import useI18n from '../composables/useI18n'

import { ref, watch } from 'vue'
import { computed } from '@vue/reactivity'

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
    const { AVAILABLE_LANGUAGES, loadLanguage, t } = useI18n()

    const connectedToServer = ref<boolean>(connected.value)

    const handleLogOut = () => {
      logout().then(() => {
        return replace('/auth/login')
      })
    }

    const setLanguage = ($event: Event) => {
      const selectedLanguage = ($event.target as HTMLSelectElement).value
      loadLanguage(selectedLanguage)
    }

    const getToken = async () => {
      // console.log(await user.value?.getIdToken())
    }

    getToken()

    const title = computed(() =>
      t('account.welcome', { user: user ? user.value?.displayName : '' }),
    )

    watch(connectedToServer, () => {
      if (connectedToServer.value === true) {
        connectToServer()
      } else {
        disconnectFromServer()
      }
    })

    connectToServer()

    return {
      user,
      customUser,
      connectedToServer,
      AVAILABLE_LANGUAGES,
      title,

      handleLogOut,
      setLanguage,
    }
  },
}
</script>
