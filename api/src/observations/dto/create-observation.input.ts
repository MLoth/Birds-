import { InputType, Field } from '@nestjs/graphql'
import { Point } from 'geojson'
import { GeoPoint } from 'src/locations/entities/geopoint.entity'

@InputType()
export class CreateObservationInput {
  @Field()
  name: string

  @Field()
  userId: string

  @Field({ nullable: true })
  weather?: string

  @Field()
  birdId: string

  @Field()
  locationId: string

  @Field(() => GeoPoint, { nullable: true })
  geoPoint?: Point

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  active?: boolean
}
