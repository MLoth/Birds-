<template>
  <route-holder title="Birds">
    <div
      class="grid animate-pulse gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
      v-if="loading"
    >
      <div v-for="i of skeletons" :key="i">
        <div class="aspect-square rounded-md bg-neutral-300"></div>
        <p class="my-1 h-6 w-24 rounded bg-neutral-200"></p>
        <p class="my-2 h-6 w-12 rounded bg-neutral-100"></p>
      </div>
    </div>
    <div v-else-if="error">
      <p>Error happened.</p>
    </div>
    <div
      class="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
      v-else-if="result"
    >
      <RouterLink :to="`birds/${b.id}`" v-for="b of result.birds" :key="b.id">
        <img
          class="aspect-square w-full"
          :src="`./birds/${b.name}.webp`"
          :alt="`Drawing of a ${b.name}`"
        />
        <h2 class="font-theme text-2xl font-light">{{ b.name }}</h2>
        <p class="text-sm font-semibold tracking-wide text-neutral-500">
          {{ b.category }}
        </p>
      </RouterLink>
    </div>
  </route-holder>
</template>

<script lang="ts">
import { ref, Ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'

import RouteHolder from '../../components/holders/RouteHolder.vue'
import { BIRDS } from '../../graphql/query.bird'

export default {
  components: {
    RouteHolder,
  },

  setup() {
    const { result, loading, error } = useQuery(BIRDS)
    const skeletons: Ref<number> = ref(18)

    return {
      result,
      loading,
      error,
      skeletons,
    }
  },
}
</script>
