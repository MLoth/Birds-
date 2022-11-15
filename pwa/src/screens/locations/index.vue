<template>
  <route-holder title="Locations">
    <template #header-actions>
      <router-link
        to="/locations/add"
        class="@dark:bg-neutral-50 @dark:text-neutral-800 bg-theme rounded-md bg-neutral-800 px-4 py-2 text-white"
      >
        Add location
      </router-link>
    </template>

    <map-view
      :map-coordinates="{ lng: 3.3232699, lat: 50.8425729 }"
      @coordinateSelection="handleCoordinateSelection"
    />
  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import MapView from '../../components/generic/MapView.vue'

import { LngLatLike } from 'mapbox-gl'

export default {
  components: {
    RouteHolder,
    MapView,
  },

  setup() {
    const handleCoordinateSelection = (e: LngLatLike) => {
      console.log(e)
    }

    return {
      handleCoordinateSelection,
    }
  },
}
</script>
