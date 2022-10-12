<template>
  <route-holder title="Home">
    <div class="mb-6">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
        Random birds
      </h2>
    </div>

    <div class="mb-6">
      <h2 class="font-theme mb-3 text-2xl font-medium tracking-wide">
        Top locations
      </h2>
      <div v-if="result">
        <map-view
          :mapCoordinates="{ lng: 50.236, lat: 5.321523 }"
          :polygons="areas"
          class="ml-[calc(calc(100vw-72rem)/-2)] min-h-[30vh] w-[calc(100vw)]"
        />
      </div>
    </div>
  </route-holder>
</template>

<script lang="ts">
import { ref, Ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { Polygon } from 'geojson'

import RouteHolder from '../components/holders/RouteHolder.vue'
import MapView from '../components/generic/MapView.vue'
import Location from '../interfaces/interface.location'
import { LOCATIONS } from '../graphql/query.location'

export default {
  components: {
    RouteHolder,
    MapView,
  },

  setup() {
    const areas: Ref<Polygon[]> = ref([])
    const { result, loading, error } = useQuery(LOCATIONS)

    watch(result, () => {
      areas.value = result.value.locations.map(
        (location: Location) => location.area,
      )
    })

    return {
      result,
      loading,
      error,
      areas,
    }
  },
}
</script>
