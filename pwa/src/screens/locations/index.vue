<template>
  <route-holder title="Locations">
    <template #header-actions>
      <RouterLink
        to="/observations/add"
        class="bg-theme rounded-md bg-neutral-800 px-4 py-2 text-white"
        @click="createObservation"
      >
        Add location
      </RouterLink>
    </template>

    <MapView class="h-screen" />
  </route-holder>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import MapView from '../../components/generic/MapView.vue'

export default {
  components: {
    RouteHolder,
    MapView,
  },

  setup() {
    return {}
  },
}
</script>
