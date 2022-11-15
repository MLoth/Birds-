import Bird from './interface.bird'
import Location from './interface.location'

export default interface Observation {
  id?: string
  name: string
  userId: string
  weather?: string
  bird: Bird
  location: Location
  description?: string

  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
