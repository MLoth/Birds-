import { ref } from 'vue'

export default () => {
  const watchId = ref<number>()

  const _setupGeolocation = (): boolean => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser')
      return false
    }

    return true
  }

  const startTracking = (cb: (g: GeolocationPosition) => void) => {
    _setupGeolocation()

    watchId.value = navigator.geolocation.watchPosition(cb)
  }

  return {
    startTracking,
  }
}
