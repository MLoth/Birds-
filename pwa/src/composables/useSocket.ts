import { ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import useGeolocation from './useGeolocation'
import LiveLocation from '../interfaces/interface.live-location'
import useCustomUser from './useCustomUser'

// SHARED
const socketServer = ref<Socket>()
const connected = ref<boolean>(false)

export default () => {
  const { startTracking } = useGeolocation()
  const { customUser } = useCustomUser()

  const _connect = () => {
    console.log('Connected')
    connected.value = true

    startTracking((p: GeolocationPosition) => {
      const payload: LiveLocation = {
        idUser: customUser.value!.id!,
        geolocation: {
          type: 'Point',
          coordinates: [p.coords.longitude, p.coords.latitude],
        },
      }

      socketServer.value!.emit('birdspotter:moving', payload)
    })
  }

  const _disconnect = () => {
    console.log('Disconnected')
    connected.value = false
  }

  const _error = (error: any) => {
    console.error(error)
  }

  const disconnectFromServer = () => {
    if (socketServer.value) {
      socketServer.value.disconnect()
      socketServer.value = undefined
    }
  }

  const connectToServer = () => {
    if (socketServer.value) {
      return
    }

    socketServer.value = io('ws://[::1]:3003', {
      transports: ['websocket'], // polling is default, can give cors errors
    })

    socketServer.value.on('connect', _connect)
    socketServer.value.on('disconnect', _disconnect)
    socketServer.value.on('error', _error)
  }

  return {
    connected,

    connectToServer,
    disconnectFromServer,
  }
}
