import mapboxgl, { Map, MapMouseEvent, Marker } from 'mapbox-gl'
import { ref, Ref } from 'vue'
import MapProps from '../interfaces/interface.map-props'

export default (props: MapProps) => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

  const map: Ref<Map> = ref({} as Map)
  const selectedMarker: Ref<Marker | undefined> = ref()

  const style: Ref<string> = ref('mapbox://styles/mapbox/streets-v11')
  const defaultZoom: Ref<number> = ref(1)

  const addedSources: Ref<string[]> = ref([])

  const _setupDefaultSettings = () => {
    map.value.on('style.load', () => {
      map.value.setFog({})
    })
  }

  const _centerMapOnPolygons = () => {
    if (props.polygons && props.polygons.length < 1) return

    let { lng, lat } = { lng: 0, lat: 0 }
    let amount: number = 0

    props.polygons!.map(({ coordinates }) => {
      coordinates.map((coordinate) => {
        coordinate.map(([x, y]) => {
          amount++
          lng += x
          lat += y
        })
      })
    })

    map.value.flyTo({
      center: [lng / amount, lat / amount],
      zoom: 10, // TODO: calculate zoom based on polygon sizes, this is just eyeballing it...
      speed: 1,
    })
  }

  const removeMapData = () => {
    return new Promise<void>((resolve) => {
      addedSources.value.map((source) => {
        if (map.value.getLayer(source)) map.value.removeLayer(source)
        if (map.value.getSource(source)) map.value.removeSource(source)
      })

      addedSources.value = []
      resolve()
    })
  }

  const listenToInteraction = (emit: Function, eventName: string) => {
    map.value.on('click', (e: MapMouseEvent) => {
      if (selectedMarker.value) selectedMarker.value.remove()
      selectedMarker.value = new Marker({
        color: '#000',
      })
        .setLngLat(e.lngLat)
        .addTo(map.value)

      emit(eventName, e.lngLat)
    })
  }

  const renderPolygonsIfAny = () => {
    if (props.polygons && props.polygons.length < 1) return

    for (const polygon in props.polygons!) {
      map.value.addSource(`area-${polygon}`, {
        type: 'geojson',
        data: props.polygons[polygon],
      })

      map.value.addLayer({
        id: `area-${polygon}`,
        type: 'fill',
        source: `area-${polygon}`,
        layout: {},
        paint: {
          'fill-color': '#000',
          'fill-opacity': 0.3,
        },
      })

      addedSources.value.push(`area-${polygon}`)
    }

    _centerMapOnPolygons()
  }

  const renderMarkerIfAny = () => {
    if (props.markers && props.markers.length < 1) return

    for (const marker of props.markers!) {
      new mapboxgl.Marker().setLngLat(marker).addTo(map.value)
    }
  }

  const createMap = (htmlRef: HTMLElement): Map => {
    map.value = new Map({
      container: htmlRef,
      style: style.value,
      center: props.mapCoordinates,
      zoom: defaultZoom.value,
      projection: { name: 'globe' },
    })

    _setupDefaultSettings()

    return map.value
  }

  return {
    createMap,
    renderPolygonsIfAny,
    renderMarkerIfAny,
    listenToInteraction,
    removeMapData,
  }
}
