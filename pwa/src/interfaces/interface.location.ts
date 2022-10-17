import { Polygon } from 'geojson'

import Observation from './interface.observation'

export default interface Location {
  id?: string
  name: string
  observations: Observation[]
  // location: string
  area: Polygon

  createdAt?: Date
  updatedAt?: Date
}
