<template>
  <div id="mapContainer" class=""></div>
</template>

<script lang="ts">
import mapboxgl from 'mapbox-gl'

export default {
  setup() {
    return {}
  },
  mounted() {
    //@ts-ignore
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

    const coordinates = [-69.25657, 45.52524]

    const map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates,
      zoom: 7,
      projection: 'globe',
    })

    map.on('style.load', () => {
      map.setFog({})
    })

    //return coordinates on tap
    map.on('click', (e) => {
      console.log(`A click event has occurred at ${e.lngLat}`)
    })

    //Added polygon
    map.on('load', () => {
      // Add a data source containing GeoJSON data.
      map.addSource('maine', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-67.13734, 45.13745],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573, 43.09008],
                [-70.75102, 43.08003],
                [-70.79761, 43.21973],
                [-70.98176, 43.36789],
                [-70.94416, 43.46633],
                [-71.08482, 45.30524],
                [-70.66002, 45.46022],
                [-70.30495, 45.91479],
                [-70.00014, 46.69317],
                [-69.23708, 47.44777],
                [-68.90478, 47.18479],
                [-68.2343, 47.35462],
                [-67.79035, 47.06624],
                [-67.79141, 45.70258],
                [-67.13734, 45.13745],
              ],
            ],
          },
        },
      })
      // Add a new layer to visualize the polygon.
      map.addLayer({
        id: 'maine',
        type: 'fill',
        source: 'maine', // reference the data source
        layout: {},
        paint: {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.5,
        },
      })
      new mapboxgl.Marker({
        color: '#FFFFFF',
        draggable: true,
      })
        .setLngLat([-69.25657, 45.52524])
        .addTo(map)
    })
  },
}
</script>