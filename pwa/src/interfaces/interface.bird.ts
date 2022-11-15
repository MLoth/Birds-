export default interface Bird {
  id?: string
  name: string
  fullname: string
  category: string
  url: string
  observations: number
  description?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
}
