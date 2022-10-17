import { LngLatLike } from 'mapbox-gl'
import { Polygon } from 'geojson'

export default interface MapProps {
  mapCoordinates: LngLatLike
  markers?: LngLatLike[]
  polygons?: Polygon[]
}
