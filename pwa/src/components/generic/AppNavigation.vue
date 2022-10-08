<template>
  <ul
    class="
      grid
      w-full
      grid-cols-4
      items-center
      text-center text-xs
      font-medium
      sm:w-auto sm:space-x-3 sm:text-left sm:text-sm
    "
  >
    <li>
      <router-link
        exact-active-class="opacity-40"
        class="
          inline-block
          rounded-md
          px-3
          py-6
          outline-none
          focus-visible:ring-2
        "
        to="/"
      >
        <Home class="mx-auto mb-2 h-5 sm:hidden" />
        Home
      </router-link>
    </li>

    <li>
      <router-link
        active-class="opacity-40"
        class="
          inline-block
          rounded-md
          px-3
          py-6
          outline-none
          focus-visible:ring-2
        "
        to="/birds"
      >
        <Feather class="mx-auto mb-2 h-5 sm:hidden" />
        Birds
      </router-link>
    </li>

    <li>
      <router-link
        active-class="opacity-40"
        class="
          inline-block
          rounded-md
          px-3
          py-6
          outline-none
          focus-visible:ring-2
        "
        to="/locations"
      >
        <Feather class="mx-auto mb-2 h-5 sm:hidden" />
        Location
      </router-link>
    </li>

    <li>
      <router-link
        active-class="opacity-40"
        class="
          inline-block
          rounded-md
          px-3
          py-6
          outline-none
          focus-visible:ring-2
        "
        to="/observations"
      >
        <Clipboard class="mx-auto mb-2 h-5 sm:hidden" />
        Observations
      </router-link>
    </li>

    <li>
      <router-link
        active-class="opacity-40"
        class="
          inline-block
          rounded-md
          px-3
          py-6
          outline-none
          focus-visible:ring-2
          sm:hidden
        "
        to="/account"
      >
        <User class="mx-auto mb-2 h-5 sm:hidden" />
        User
      </router-link>
    </li>

    <li class="hidden pl-6 sm:block">
      <router-link
        class="
          inline-block
          rounded-md
          px-3
          py-6
          outline-none
          focus-visible:ring-2
        "
        rounded-md
        ring-2
        to="/account"
        v-if="user"
      >
        {{ user.displayName }}
      </router-link>
      <router-link
        class="
          inline-block
          rounded-md
          px-3
          py-6
          outline-none
          focus-visible:ring-2
        "
        rounded-md
        ring-2
        to="/auth/login"
        v-else
      >
        Login
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Home, Feather, User, Clipboard } from 'lucide-vue-next'

import useAuthentication from '../../composables/useAuthentication'

export default {
  components: { Home, Feather, User, Clipboard },

  setup() {
    const { user } = useAuthentication()

    return {
      user,
    }
  },
}
</script>
