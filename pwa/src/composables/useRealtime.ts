import { Ref, ref } from 'vue'

import { io, Socket } from 'socket.io-client'

import useLocation from './useLocation'
import useCustomUser from './useCustomUser'

export default () => {
  const { location, startTracking } = useLocation()
  const { customUser } = useCustomUser()

  const connected: Ref<boolean> = ref(false)
  const socket = ref<Socket>()

  // Socket Callback functions
  const _connect = () => {
    connected.value = true
    startTracking((location: GeolocationPosition) => {
      console.log(location)

      const payload = {
        userId: customUser.value?.id,
        geolocation: {
          type: 'Point',
          coordinates: [location.coords.longitude, location.coords.latitude],
        },
      }

      socket.value!.emit('birdspotter:moving', payload)
    })
  }

  const _disconnect = () => {
    connected.value = false
  }

  const _error = (error: Error) => {
    console.error(error)
  }

  const connectToServer = () => {
    socket.value = io('ws://[::1]:3003', {
      transports: ['websocket'], // Prevent some weird polling error
      reconnectionDelayMax: 10000,
    })

    socket.value.on('connect', _connect)
    socket.value.on('disconnect', _disconnect)
    socket.value.on('error', (err: Error) => _error(err))
  }

  const disconnectFromServer = () => {
    console.log('Disconnecting from server')

    if (socket.value) socket.value.disconnect()
  }

  return {
    socket,
    connected,

    connectToServer,
    disconnectFromServer,
  }
}
