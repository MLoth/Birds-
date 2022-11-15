import Observation from './interface.observation'

export interface User {
  id?: string
  uid: string
  observations?: Observation[]
  observationsCount: number
  createdAt?: Date
  updatedAt?: Date
}
