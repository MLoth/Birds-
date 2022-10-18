import { ref } from 'vue'
import useRealtime from './useRealtime'

const watchId = ref<number | null>(null)
const location = ref<GeolocationPosition | null>(null)

export default () => {
  const _setupGeolocation = () => {
    if ('geolocation' in navigator) {
      return true
    } else {
      return false
    }
  }

  const startTracking = (cb: (g: GeolocationPosition) => void) => {
    if (!_setupGeolocation())
      throw new Error('Geolocation is not supported by your browser')

    watchId.value = navigator.geolocation.watchPosition(cb)
  }

  return {
    location,

    startTracking,
  }
}
