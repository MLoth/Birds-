<template>
  <route-holder :title="`${birdName}`">
    <div v-if="loading">
      <p>Loading</p>
    </div>
    <div v-else-if="error">
      <p>Error happened.</p>
    </div>
    <div v-else-if="result">
      <p class="mb-12 text-sm font-medium tracking-wider">
        {{ result.bird.category }}
      </p>
      <div class="grid grid-cols-[1fr_2fr] items-center gap-12">
        <img
          class="aspect-square w-full"
          :src="`/birds/${result.bird.name}.webp`"
          :alt="`Drawing of a ${result.bird.name}`"
        />

        <div class="max-w-lg">
          <p class="text-lg leading-relaxed">{{ result.bird.description }}</p>
        </div>
      </div>

      <div
        class="my-6 -ml-6 min-h-[30vh] w-[calc(100vw)] bg-neutral-100 p-6 lg:ml-[calc(calc(100vw-72rem)/-2)]"
      >
        <div class="mx-auto max-w-6xl">
          <h2 class="font-theme text-2xl font-normal tracking-wide">
            Observations
          </h2>
          <p>
            {{ $tc('birds.description.spotted', result.bird.observations) }}
          </p>
        </div>
      </div>
    </div>
  </route-holder>
</template>

<script lang="ts">
import { ref, Ref, watch } from 'vue-demi'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'

import RouteHolder from '../../components/holders/RouteHolder.vue'
import Bird from '../../interfaces/interface.bird'
import { BIRD_BY_ID } from '../../graphql/query.bird'

export default {
  components: {
    RouteHolder,
  },

  setup() {
    const { params } = useRoute()

    const { result, loading, error } = useQuery<{ bird: Bird }>(BIRD_BY_ID, {
      id: params.id,
    })

    const birdName: Ref<string> = ref(
      // TODO: weird thing here...
      // @ts-ignore
      result && result.bird ? result.bird.name : '...',
    )

    watch(result, (result) => {
      if (result) birdName.value = result.bird.name
    })

    return {
      result,
      loading,
      error,
      birdName,
    }
  },
}
</script>
