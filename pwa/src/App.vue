<template>
  <router-view
    class="@dark:bg-neutral-800 @dark:text-neutral-50 min-h-screen bg-neutral-50"
  ></router-view>
</template>

<script lang="ts">
import { provide } from '@vue/runtime-core'
import { DefaultApolloClient } from '@vue/apollo-composable'

import useGraphQL from './composables/useGraphQL'

export default {
  setup() {
    const { apolloClient } = useGraphQL()

    provide(DefaultApolloClient, apolloClient)

    return {}
  },
}
</script>
