<template>
  <div class="my-3 min-h-[600px]" ref="mapElement"></div>
</template>

<script lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'

import { LngLatLike } from 'mapbox-gl'
import { onMounted, Ref, ref, watch } from 'vue'
import { Polygon } from 'geojson'

import useMapbox from '../../composables/useMapbox'

export default {
  props: {
    mapCoordinates: {
      type: Object as () => LngLatLike,
      required: true,
    },
    markers: {
      type: Array as () => LngLatLike[],
      required: false,
      default: () => [],
    },
    polygons: {
      type: Array as () => Polygon[],
      required: false,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const {
      createMap,
      renderMarkerIfAny,
      renderPolygonsIfAny,
      listenToInteraction,
      removeMapData,
    } = useMapbox(props)

    const mapElement: Ref<HTMLElement | null> = ref(null)

    // DOM Content Loaded
    onMounted(() => {
      const map = createMap(mapElement.value!)

      // This can help.
      map.on('load', () => {
        renderMarkerIfAny()
        renderPolygonsIfAny()
        listenToInteraction(emit, 'coordinateSelection')
      })

      // When props change, update the map data each time
      watch(props, async () => {
        await removeMapData()
        renderMarkerIfAny()
        renderPolygonsIfAny()
      })
    })

    return {
      mapElement,
    }
  },
}
</script>
