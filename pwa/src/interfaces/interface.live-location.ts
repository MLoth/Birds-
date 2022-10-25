import { Point } from 'geojson'

export default interface LiveLocation {
  idUser: string
  geolocation: Point
}
