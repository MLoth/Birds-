<template>
  <route-holder title="Observations">
    <template #header-actions>
      <RouterLink
        to="/observations/add"
        class="@dark:bg-neutral-50 @dark:text-neutral-800 rounded-md bg-neutral-800 px-4 py-2 text-white"
      >
        Create observation
      </RouterLink>
    </template>

    <ObservationsTable v-if="result" :observations="result.observations" />
  </route-holder>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'

import RouteHolder from '../../components/holders/RouteHolder.vue'
import ObservationsTable from '../../components/observation/ObservationsTable.vue'
import { OBSERVATIONS } from '../../graphql/query.observation'

export default {
  components: {
    RouteHolder,
    ObservationsTable,
  },

  setup() {
    const { result, loading, error } = useQuery(OBSERVATIONS)

    return {
      result,
      loading,
      error,
    }
  },
}
</script>
